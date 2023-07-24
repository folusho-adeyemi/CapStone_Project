import { User } from './user.js';
import { Category } from './category.js';
import { Product } from './products.js';
import { Review } from './reviews.js';
import { Collection } from './collections.js';
import { CollectionProduct } from './collectionproduct.js';
import { ForgotPassword } from './ForgotPassword.js';

User.hasMany(Collection, { as: 'collections', foreignKey: 'UserID' });
Collection.belongsTo(User, { as: 'user', foreignKey: 'UserID' });

User.hasMany(Review, { as: 'reviews', foreignKey: 'UserID' });
Review.belongsTo(User, { as: 'user', foreignKey: 'UserID' });

Category.hasMany(Product, { as: 'products', foreignKey: 'CategoryID' });
Product.belongsTo(Category, { as: 'category', foreignKey: 'CategoryID' });

Product.hasMany(Review, { as: 'reviews', foreignKey: 'ProductID' });
Review.belongsTo(Product, { as: 'product', foreignKey: 'ProductID' });

Collection.belongsToMany(Product, { through: 'CollectionProduct', as: 'products', foreignKey: 'CollectionID', });
Product.belongsToMany(Collection, { through: 'CollectionProduct', as: 'collections', foreignKey: 'ProductID', });

ForgotPassword.belongsTo(User, { foreignKey: 'userID' });
User.hasOne(ForgotPassword, { foreignKey: 'userID' });


User.sync();
Category.sync();
Product.sync();
Review.sync();
Collection.sync();
CollectionProduct.sync();
ForgotPassword.sync();


export { User, Category, Product, Review, Collection , ForgotPassword};
