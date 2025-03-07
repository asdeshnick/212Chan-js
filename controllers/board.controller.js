const postService = require('../services/post.service');
const Board = require('../models/board.model');
const cacheService = require('../services/cache.service');
const Post = require('../models/post.model');

class BoardController {
  async showBoard(req, res) {
    const { board } = req.params;
    const cacheKey = `board-${board}`;
    
    try {
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

      // Сохранение в кэш
      const responseData = { board: boardData, threads };
      await cacheService.set(cacheKey, responseData);

      res.render('board', responseData);
    } catch (error) {
      console.error('Error in showBoard:', error);
      res.status(500).send('Internal Server Error');
    }
  }

  async showThread(req, res) {
    const { board, id } = req.params;
    
    try {
      const [thread, replies] = await Promise.all([
        Post.findByPk(id),
        Post.findAll({
          where: { op_id: id },
          order: [['id', 'ASC']]
        })
      ]);
      
      res.render('thread', { board, thread, replies });
    } catch (error) {
      console.error('Error in showThread:', error);
      res.status(500).send('Internal Server Error');
    }
  }
}

module.exports = new BoardController();