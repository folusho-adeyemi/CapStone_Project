import { DataTypes } from 'sequelize';
import { sequelize } from '../database.js';

export const ForgotPassword = sequelize.define('ForgotPassword', {
    userID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    token: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});
