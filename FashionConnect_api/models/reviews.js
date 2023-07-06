import { DataTypes } from 'sequelize';
import { sequelize } from '../database.js';

export const Review = sequelize.define('Review', {
  ReviewID: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  Text: {
    type: DataTypes.STRING,
    allowNull: false
  },
  Score: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  ProductID: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});
