import express from 'express';
import bcrypt from 'bcrypt';
import { User } from '../models/user.js';
import { Op } from 'sequelize';
import { Collection } from '../models/collections.js';

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
    console.error(error);
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
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

//routes for profile changes

router.post('/users/profile', async (req, res) => {
  const { user, First_Name, Last_Name, username } = req.body;

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
    console.error(error);
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
    console.error('Error updating collections:', error);
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
    console.error('Error deleting product from collections:', error);
    return res.status(500).json({ error: 'Failed to delete product from collection' });
  }
});

export default router;