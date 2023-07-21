import { DataTypes } from 'sequelize';
import { sequelize } from '../database.js';

export const Collection = sequelize.define('Collection', {
  CollectionID: {
    type: DataTypes.STRING,
    primaryKey: true,
    autoIncrement: false
  },
  Name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  ProductID: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    allowNull: true
  }
});
