import { DataTypes } from 'sequelize';
import { sequelize } from '../database.js';

export const User = sequelize.define('User', {
UserID: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  First_Name:{
    type: DataTypes.STRING,
    allowNull: false
  },
  Last_Name:{
    type: DataTypes.STRING,
    allowNull: false
  }
});