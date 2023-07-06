import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { User, Category, Product, Review, Collection } from './models/index.js';
import { sequelize } from './database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const userData = JSON.parse(fs.readFileSync(path.resolve(__dirname, './seeders/users.json'), 'utf8'));
const categoryData = JSON.parse(fs.readFileSync(path.resolve(__dirname, './seeders/categories.json'), 'utf8'));
const productData = JSON.parse(fs.readFileSync(path.resolve(__dirname, './seeders/products.json'), 'utf8'));
const reviewData = JSON.parse(fs.readFileSync(path.resolve(__dirname, './seeders/reviews.json'), 'utf8'));
const collectionData = JSON.parse(fs.readFileSync(path.resolve(__dirname, './seeders/collections.json'), 'utf8'));

const seedDatabase = async () => {
  try {
    // To Sync all models that aren't already in the database
    await sequelize.sync({ alter: true });

    // Then seed the User, Category, Product, Review, and Collection data
    await User.bulkCreate(userData);
    console.log('User data has been seeded!');

    await Category.bulkCreate(categoryData);
    console.log('Category data has been seeded!');

    await Product.bulkCreate(productData);
    console.log('Product data has been seeded!');

    await Review.bulkCreate(reviewData);
    console.log('Review data has been seeded!');

    await Collection.bulkCreate(collectionData);
    console.log('Collection data has been seeded!');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    await sequelize.close();
  }
};

seedDatabase();
