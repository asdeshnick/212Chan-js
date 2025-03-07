const { Board } = require('../database');
const postService = require('../services/post.service'); // Добавьте это
const cacheService = require('../services/cache.service');
const logger = require('../utils/logger');

export default class BoardController {
  async showBoard(req, res) {
    const { board } = req.params;
    const cacheKey = `board:${board}`;

    try {
      // Валидация имени доски
      if (!/^[a-z0-9]+$/.test(board)) {
        return res.status(400).render('error', { 
          message: 'Некорректное имя доски' 
        });
      }

      // Попытка получить данные из кэша
      const cachedData = await cacheService.get(cacheKey);
      if (cachedData) {
        return res.render('board', cachedData);
      }

      // Получение данных из базы
      const [boardData, threads] = await Promise.all([
        Board.findByPk(board),
        postService.getThreads(board)
      ]);

      // Проверка существования доски
      if (!boardData) {
        return res.status(404).render('error', {
          message: `Доска /${board}/ не найдена`
        });
      }

      // Подготовка данных для кэширования
      const responseData = {
        board: boardData.get({ plain: true }),
        threads: threads.map(t => t.get({ plain: true })),
        stats: {
          threadCount: threads.length
        }
      };

      // Сохранение в кэш на 5 минут
      await cacheService.set(cacheKey, responseData, 300);

      res.render('board', responseData);
    } catch (error) {
      logger.error(`Board Error: ${error.message}`, {
        board,
        error: error.stack
      });
      res.status(500).render('error', {
        message: 'Ошибка загрузки доски'
      });
    }
  }

  async showThread(req, res) {
    const { board, id } = req.params;
    const cacheKey = `thread:${board}:${id}`;

    try {
      // Валидация параметров
      if (isNaN(id)) {
        return res.status(400).render('error', {
          message: 'Некорректный ID треда'
        });
      }

      // Попытка получить данные из кэша
      const cachedData = await cacheService.get(cacheKey);
      if (cachedData) {
        return res.render('thread', cachedData);
      }

      // Получение данных из базы
      const [thread, replies] = await Promise.all([
        Post.findByPk(id),
        Post.findAll({
          where: { op_id: id },
          order: [['createdAt', 'ASC']],
          limit: 100
        })
      ]);

      // Проверка существования треда
      if (!thread || thread.board !== board) {
        return res.status(404).render('error', {
          message: 'Тред не найден'
        });
      }

      // Подготовка данных ответов
      const repliesData = replies.map(r => ({
        id: r.id,
        text: r.text,
        image: r.fname ? `/thumbs/${r.fname}` : null,
        createdAt: r.createdAt
      }));

      // Формирование данных для ответа
      const responseData = {
        board,
        thread: {
          ...thread.get({ plain: true }),
          image: thread.fname ? `/uploads/${thread.fname}` : null
        },
        replies: repliesData,
        stats: {
          replyCount: replies.length
        }
      };

      // Кэширование на 10 минут
      await cacheService.set(cacheKey, responseData, 600);

      res.render('thread', responseData);
    } catch (error) {
      logger.error(`Thread Error: ${error.message}`, {
        board,
        threadId: id,
        error: error.stack
      });
      res.status(500).render('error', {
        message: 'Ошибка загрузки треда'
      });
    }
  }
}

const boardController = new BoardController();
export { boardController };