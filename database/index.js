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
await Board.findOrCreate({
  where: { name: 'b' },
  defaults: {
    long_name: 'Random',
    description: 'Обсуждение всего на свете'
  }
});

module.exports = {
  sequelize,
  Board,
  Post
};