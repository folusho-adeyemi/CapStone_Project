import { DataTypes } from 'sequelize';
import { sequelize } from '../database.js';

export const Collection = sequelize.define('Collection', {
  CollectionID: {
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
  UserID: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  ProductID: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    allowNull: false
  }
});
