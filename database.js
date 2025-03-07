import { Sequelize } from 'sequelize';
import config from './config.js';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
  logging: false
});

export { sequelize };