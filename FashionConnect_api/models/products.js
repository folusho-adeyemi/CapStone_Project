import { DataTypes } from 'sequelize';
import { sequelize } from '../database.js';

export const Product = sequelize.define('Product', {
  ProductID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  Name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Price: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Image_URL: {
    type: DataTypes.STRING,
    allowNull: false
  },
  CategoryID: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  BrandID: {
    type: DataTypes.STRING,
    allowNull: false
  },
  ReviewID: {
    type: DataTypes.STRING,
    allowNull: false
  }
});
