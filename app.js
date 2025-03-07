const express = require('express');
const sequelize = require('./database');
const app = express();

// Database sync
sequelize.sync()
  .then(() => console.log('Database connected'))
  .catch(console.error);

// Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Routes
app.use('/', require('./routes/board.routes'));
app.use('/admin', require('./routes/admin.routes'));

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

module.exports = app;