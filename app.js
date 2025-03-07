const express = require('express');
const { sequelize } = require('./database'); // ❶ Исправленный импорт
const app = express();
const indexRoutes = require('./routes/index.routes');
app.use('/', indexRoutes);

// Database sync
sequelize.sync({ force: false }) // ❷ Добавьте опции синхронизации
  .then(() => console.log('Database connected'))
  .catch(console.error);

// Middleware
app.set('view engine', 'ejs'); // ❸ Изменен порядок
app.use(express.static('public')); // Статические файлы
app.use('/', indexRoutes); // Главная страница
app.use('/b', boardRoutes); // Доски

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

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
console.log(`Server will run on port: ${process.env.PORT || 3000}`);
module.exports = app;

const cacheService = require('./services/cache.service');

cacheService.client.on('ready', () => {
  console.log('Redis connected');
});