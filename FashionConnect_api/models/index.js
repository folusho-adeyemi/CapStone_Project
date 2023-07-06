import { User } from './user.js';
import { Category } from './category.js';
import { Product } from './products.js';
import { Review } from './reviews.js';
import { Collection } from './collections.js';

User.hasMany(Collection, { as: 'collections', foreignKey: 'UserID' });
Collection.belongsTo(User, { as: 'user', foreignKey: 'UserID' });

User.hasMany(Review, { as: 'reviews', foreignKey: 'UserID' });
Review.belongsTo(User, { as: 'user', foreignKey: 'UserID' });

Category.hasMany(Product, { as: 'products', foreignKey: 'CategoryID' });
Product.belongsTo(Category, { as: 'category', foreignKey: 'CategoryID' });

Product.hasMany(Review, { as: 'reviews', foreignKey: 'ProductID' });
Review.belongsTo(Product, { as: 'product', foreignKey: 'ProductID' });

User.sync();
Category.sync();
Product.sync();
Review.sync();
Collection.sync();

export { User, Category, Product, Review, Collection };
