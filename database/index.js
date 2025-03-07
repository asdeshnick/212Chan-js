const { Sequelize } = require('sequelize');
const config = require('../config');

const sequelize = new Sequelize(config.database.url, {
  dialect: config.database.url.startsWith('postgres') ? 'postgres' : 'sqlite',
  storage: config.database.url.startsWith('sqlite') 
    ? config.database.url.split('://')[1] 
    : undefined,
  logging: process.env.NODE_ENV === 'development'
});

// Импорт моделей
const Board = require('../models/board.model')(sequelize);
const Post = require('../models/post.model')(sequelize);

// Синхронизация
sequelize.sync({ force: false });

module.exports = {
  sequelize,
  Board,
  Post
};