const express = require('express');
const { sequelize } = require('./database'); // ❶ Исправленный импорт
const app = express();

// Database sync
sequelize.sync({ force: false }) // ❷ Добавьте опции синхронизации
  .then(() => console.log('Database connected'))
  .catch(console.error);

// Middleware
app.set('view engine', 'ejs'); // ❸ Изменен порядок
app.use(express.static('public'));
app.use(express.json()); // ❹ Добавлено
app.use(express.urlencoded({ extended: true }));

// Routes
const boardRoutes = require('./routes/board.routes');
const adminRoutes = require('./routes/admin.routes'); // ❺ Явный импорт
app.use('/', boardRoutes);
app.use('/admin', adminRoutes);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('error', { message: 'Internal Server Error' }); // ❻ Используйте шаблон
});

module.exports = app;