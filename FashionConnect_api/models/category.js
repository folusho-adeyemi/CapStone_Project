import { DataTypes } from 'sequelize';
import { sequelize } from '../database.js';

export const Category = sequelize.define('Category', {
  CategoryID: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  Name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Image_URL: {
    type: DataTypes.STRING,
    allowNull: false
  }
});
