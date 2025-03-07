import express from 'express';
import { sequelize } from './database.js';
import path from 'path';
import { fileURLToPath } from 'url';

// Инициализация __dirname для ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Создание экземпляра приложения
const app = express();

// Настройка путей (добавьте этот блок сразу после создания app)
app.set('views', path.join(__dirname, 'views')); // Путь к папке с шаблонами
app.set('view engine', 'ejs'); // Настройка движка шаблонов
app.use(express.static(path.join(__dirname, 'public'))); // Путь к статическим файлам

// Остальная конфигурация
sequelize.sync()
  .then(() => console.log('Database connected'))
  .catch(console.error);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database sync
sequelize.sync()
  .then(() => console.log('Database connected'))
  .catch(console.error);

// Middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Routes
import boardRoutes from './routes/board.routes.js';
app.use('/b', boardRoutes);

app.get('/', (req, res) => {
  res.redirect('/b');
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});