import express from 'express';
import session from 'express-session';
import cors from 'cors';
import morgan from 'morgan';
import { sequelize } from './database.js';
import { User, Category, Product, Collection } from './models/index.js';
import UserRoutes from './routes/users.js';
import SequelizeStoreInit from 'connect-session-sequelize';
import fetchAndStoreProducts from './seed.js';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();

app.use(cors({
    origin: '*',
    credentials: true,
    optionsSuccessStatus: 200,
}));
app.use(express.json()); // Middleware for parsing JSON bodies from HTTP requests
app.use(morgan('dev'));

const SequelizeStore = SequelizeStoreInit(session.Store);
const sessionStore = new SequelizeStore({
    db: sequelize
});

// Session middleware
app.use(
    session({
        secret: 'your-secret-key',
        resave: false,
        saveUninitialized: false,
        store: sessionStore,
        cookie: {
            sameSite: false,
            secure: false,
            expires: new Date(Date.now() + (365 * 24 * 60 * 60 * 1000)) // 1 year in milliseconds
        }
    })
);
sessionStore.sync();

app.use(UserRoutes);

app.get('/__vite_ping', (req, res) => {
    res.status(200).json({ message: 'Vite server is running' });
});

app.use('*', createProxyMiddleware({
    target: 'https://fashionconnectapi.onrender.com',
    changeOrigin: true,
    secure: false,
  }));

// Route to get all users
app.get('/users', async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


// Route to get all categories
app.get('/categories', async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route to get all products, with associated category and reviews
app.get('/products', async (req, res) => {
    
const { page, pageSize } = req.query;

  try {
    // Parse page and pageSize values to integers
    const pageNumber = parseInt(page);
    const size = parseInt(pageSize);

    // Validate if page and pageSize are valid positive integers
    if (isNaN(pageNumber) || isNaN(size) || pageNumber <= 0 || size <= 0) {
      return res.status(400).json({ error: 'Invalid page or pageSize parameters.' });
    }

    // Calculate the offset based on the page and pageSize to implement pagination
    const offset = (pageNumber - 1) * size;

    // Fetch products from the database using Sequelize's findAll method with pagination
    let products = await Product.findAll({
      offset,
      limit: size,
      order: [['createdAt', 'DESC']],
    });

    // Check if there are enough products to fulfill the page size
    if (products.length < size) {
      // If the database is empty or doesn't have enough products, fetch and store initial products
      if (products.length === 0) {
        products = await fetchAndStoreProducts(pageNumber, size);
      } else {
        // Fetch more data from the external API and store it in the database
        const additionalData = await fetchAndStoreProducts(pageNumber, size - products.length);
        // The additionalData should be the already stored products in the database
        // You can directly append them to the products array
        products.push(...additionalData);
      }
    }

    // Respond with the products data from the database (including the additional data) as JSON
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products from the database.' });
  }
});

app.get('/products/:productId', async (req, res) => {
    const { productId } = req.params;

    try {
        // Fetch the product details from the database using the productId
        const product = await Product.findOne({ where: { ProductID: productId } });

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        const data = product.dataValues;
        // Return the product details in the response
        res.json(data);

    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Route to create a new collection
app.post('/collections', async (req, res) => {
    try {
        const collection = await Collection.create(req.body);

        const collectionWithDetails = await Collection.findOne({
            where: { id: collection.id },
            include: [{ model: User, as: 'user' }, { model: Product, as: 'products' }]
        });

        res.status(201).json(collectionWithDetails);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Route to get collections by user ID
app.get('/collections/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
        const collections = await Collection.findAll({
            where: { UserID: userId },
            include: [{ model: User, as: 'user' }, { model: Product, as: 'products' }],
            order: [['createdAt', 'DESC']]
        });

        res.json(collections);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

sequelize
    .sync({ alter: true })
    .then(() => {
        const port = 5432;
        app.listen(port, () => {
            console.log(`App is listening on port ${port}`);
        });
    })
    .catch((error) => {
        throw error;
    });
