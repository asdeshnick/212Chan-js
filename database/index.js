// database/index.js
const { Sequelize } = require('sequelize');
const config = require('../config');

const sequelize = new Sequelize(config.database.url, {
  dialect: config.database.url.startsWith('postgres') ? 'postgres' : 'sqlite',
  storage: config.database.url.startsWith('sqlite') 
    ? config.database.url.split('://')[1] 
    : undefined,
  logging: process.env.NODE_ENV === 'development'
});

module.exports = {
  sequelize,
  testConnection: async () => {
    try {
      await sequelize.authenticate();
      console.log('Database connection OK!');
    } catch (error) {
      console.error('Unable to connect to database:', error);
    }
  }
};