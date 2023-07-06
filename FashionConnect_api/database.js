import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('capstone', 'folusho', 'ilovejesus', {
  host: 'localhost',
  dialect: 'postgres'
});
