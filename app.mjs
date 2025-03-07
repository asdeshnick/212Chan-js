import express from 'express';
import { sequelize } from './database.js';

const app = express();


const { sequelize } = require('./database');
const boardRoutes = require('./routes/board.routes');
const indexRoutes = require('./routes/index.routes');


// Database sync
sequelize.sync()
  .then(() => console.log('Database connected'))
  .catch(console.error);

// Middleware
app.set('views', path.join(__dirname, 'views'));
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