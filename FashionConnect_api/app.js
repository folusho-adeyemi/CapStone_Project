import express from 'express';
import session from 'express-session';
import cors from 'cors';
import wkx from 'wkx';
import {Buffer} from 'buffer';
import morgan from 'morgan';
import { sequelize } from './database.js';
import { User, Category, Product, Review, Collection } from './models/index.js';
import UserRoutes from './routes/users.js';
import SequelizeStoreInit from 'connect-session-sequelize';

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    optionSuccessStatus:200,
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
try {
    const products = await Product.findAll({
    include: [{ model: Category, as: 'category' }, { model: Review, as: 'reviews' }],
    order: [['createdAt', 'DESC']]
    });
    res.json(products);
} catch (error) {
    res.status(500).json({ message: error.message });
}
});

// Route to get all collections, with associated user and products
app.get('/collections', async (req, res) => {
try {
    const collections = await Collection.findAll({
    include: [{ model: User, as: 'user' }, { model: Product, as: 'products' }],
    order: [['createdAt', 'DESC']]
    });
    res.json(collections);
} catch (error) {
    res.status(500).json({ message: error.message });
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

sequelize
.sync({ alter: true })
.then(() => {
    const port = 3000;
    app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
    });
})
.catch((error) => {
    console.error('Unable to connect to the database:', error);
});
