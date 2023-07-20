import { DataTypes } from 'sequelize';
import { sequelize } from '../database.js';

export const CollectionProduct = sequelize.define('CollectionProduct', {
  CollectionProductID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  CollectionID: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ProductID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

