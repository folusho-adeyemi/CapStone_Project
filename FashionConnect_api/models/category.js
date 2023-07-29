import { DataTypes } from 'sequelize';
import { sequelize } from '../database.js';

export const Category = sequelize.define('Category', {
  Name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});