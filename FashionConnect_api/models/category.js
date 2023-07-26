import { DataTypes } from 'sequelize';
import { sequelize } from '../database.js';

export const Category = sequelize.define('Category', {
  Name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  // Remove the unique constraint from the Name column
  // The unique constraint is set to false
  indexes: [
    {
      unique: false,
      fields: ['Name'],
    },
  ],
});