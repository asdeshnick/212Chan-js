const express = require('express');
const { sequelize } = require('./database');
const boardRoutes = require('./routes/board.routes');
const indexRoutes = require('./routes/index.routes');

const app = express();

// Database sync
sequelize.sync()
  .then(() => console.log('Database connected'))
  .catch(console.error);

// Middleware
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/', indexRoutes);
app.use('/b', boardRoutes);

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;