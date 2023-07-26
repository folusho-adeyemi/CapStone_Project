import { User } from './user.js';
import { Category } from './category.js';
import { Product } from './products.js';
import { Collection } from './collections.js';
import { CollectionProduct } from './collectionproduct.js';
import { ForgotPassword } from './ForgotPassword.js';

User.hasMany(Collection, { as: 'collections', foreignKey: 'UserID' });
Collection.belongsTo(User, { as: 'user', foreignKey: 'UserID' });

Collection.belongsToMany(Product, { through: 'CollectionProduct', as: 'products', foreignKey: 'CollectionID', });
Product.belongsToMany(Collection, { through: 'CollectionProduct', as: 'collections', foreignKey: 'ProductID', });

ForgotPassword.belongsTo(User, { foreignKey: 'userID' });
User.hasOne(ForgotPassword, { foreignKey: 'userID' });


User.sync();
Category.sync();
Product.sync();
Collection.sync();
CollectionProduct.sync();
ForgotPassword.sync();

export { User, Category, Product, Collection , ForgotPassword};