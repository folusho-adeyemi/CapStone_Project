import express from 'express';
import bcrypt from 'bcrypt';
import { Product } from '../models/products.js';
import { User } from '../models/user.js';
import { Op } from 'sequelize';
import { Collection } from '../models/collections.js';
import { ForgotPassword } from '../models/ForgotPassword.js';
import { v4 as uuidv4 } from 'uuid';
import sendEmail from '../email.js';

const router = express.Router();

// Route for user registration
router.post('/users', async (req, res) => {
  const { username, password, email, First_Name, Last_Name } = req.body;


  try {
    // Check if username or email already exists
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ username }, { email }]
      }
    });

    if (existingUser) {
      return res.status(400).json({ error: 'Username or email already exists' });
    }

    // Encrypt the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await User.create({ username, password: hashedPassword, email, First_Name, Last_Name });

    // Set the user in the session
    req.session.user = newUser;

    // Return the user data in the response
    res.json({ user: newUser });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Route for user login
router.post('/users/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user by username
    const user = await User.findOne({ where: { username: username } });


    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Compare the password
    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Set the user in the session
    req.session.user = user;

    // Return the user data in the response
    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

//routes for profile changes

router.post('/users/profile', async (req, res) => {
  const { First_Name, Last_Name, username } = req.body;

  try {
    // Find the user by username
    const activeUser = await User.findOne({ where: { username: username } });

    if (!activeUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    activeUser.First_Name = First_Name
    activeUser.Last_Name = Last_Name
    await activeUser.save()

    // Return the user data in the response
    res.json({ user: activeUser, message: "User profile updated succesfully" });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

//routes for collections changes
router.post('/update-collections', async (req, res) => {
  try {
    const updatedCollections = req.body;

    // Loop through the updatedCollections and update each collection in the database
    for (const updatedCollection of updatedCollections) {
      const { CollectionID, ProductID } = updatedCollection;

      // Find the existing collection in the database
      const collection = await Collection.findByPk(CollectionID);

      if (!collection) {
        return res.status(404).json({ error: 'Collection not found' });
      }

      //convert each productID to integers
      const parsedProductIDs = ProductID.map((id) => (parseInt(id, 10)));

      // Check if the ProductID already exists in the collection's ProductID array
      if (!collection.ProductID.includes(ProductID)) {
        // If not, add the new ProductID to the collection's ProductID array
        collection.ProductID = [...parsedProductIDs];

        // Save the updated collection to the database
        await collection.save();
      }
    }

    // Respond with a success message
    return res.status(200).json({ message: 'Collections updated successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to update collections in the database' });
  }
});


//routes for collections changes
router.delete('/collections/:collectionID/products/:productID', async (req, res) => {
  try {
    const collectionID = req.params.collectionID;
    const productID = req.params.productID;


    // Find the existing collection in the database
    const collection = await Collection.findByPk(collectionID);

    // To Remove the productID from the collection's ProductID array
    collection.ProductID = collection.ProductID.filter((id) => id !== productID);

    // To Save the updated collection to the database
    await collection.save();


    return res.status(200).json({ message: 'Product deletd from collection successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to delete product from collection' });
  }
});

//route to create a new collection
router.post('/collections', async (req, res) => {
  try {
    const { name, description, userId } = req.body;
    const collectionId = uuidv4();

    // Create a new collection in the database
    const newCollection = await Collection.create({
      CollectionID: collectionId,
      Name: name,
      Description: description,
      ProductID: [],
      UserID: userId
    });

    return res.status(201).json({ message: 'Collection created successfully', collection: newCollection });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to create collection' });
  }
});


//Route to delete collections
router.delete('/collections/:collectionID', async (req, res) => {
  try {
    const collectionID = req.params.collectionID;
    // Find the existing collection in the database
    const collection = await Collection.findByPk(collectionID);

    await collection.destroy();

    return res.status(201).json({ message: 'Collection deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to delete collection' });
  }
});

//Route to handle forgot password
router.post('/forgotpassword/', async (req, res) => {

  try {
    const { email} = req.body;
    const token = uuidv4();
    // Find the existing user in the database
    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userID = user.id

    // Create a new ForgotPassword in the database
    const passwordAUTH = await ForgotPassword.create({
      userID: userID,
      token: token
    });
    const receiverEmail = email;
    const subject = "FORGOT-PASSWORD TOKEN";
    const text = `Here is your token ${token}`;

    sendEmail(receiverEmail, subject, text);

    return res.status(201).json({ message: 'Mail sent successfully', passwordAUTH: passwordAUTH });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to Send Mail' });
  }
});

//Route to confirm token 
router.post('/reset-password/', async (req, res) => {

  try {
    const { token } = req.body;
    // Find the existing userid in the token database
    const record = await ForgotPassword.findOne({ where: { token: token } });

    if (!record) {
      return res.status(404).json({ error: 'Inavalid Token' });
    }

    const userID = record.userID

    const activeUser = await User.findOne({ where: { id: userID } })

    return res.status(201).json({ message: 'User confirmed', user: activeUser });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to confirm user' });
  }
});

//Route to change password and update the database
router.post('/password-change/', async (req, res) => {

  try {
    const { userID, password } = req.body;

    // Find the existing userid in the user database
    const user = await User.findOne({ where: { id: userID } });

    //encrypt the password
    const hashedPassword = await bcrypt.hash(password, 10);

    //Update the password
    await user.update({ password: hashedPassword });

    return res.status(201).json({ message: 'Password changed successfully', user: user });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to change password data' });
  }
});

router.post('/products', async (req, res) => {
  try {
    const newProducts = req.body;

    // Use Sequelize's bulkCreate method to insert new products into the database
    const createdProducts = await Product.bulkCreate(newProducts);

    res.status(201).json({ message: 'New products stored in the database successfully', products: createdProducts });

  } catch (error) {
    res.status(500).json({ error: 'Failed to store new products in the database' });
  }
});

export default router;
