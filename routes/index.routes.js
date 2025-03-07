import express from 'express';
const router = express.Router();
const { Board } = require('../database');

router.get('/', async (req, res) => {
  try {
    const boards = await Board.findAll();
    res.render('index', { 
      boards: boards.map(b => b.get({ plain: true })) 
    });
  } catch (error) {
    console.error('Index route error:', error);
    res.status(500).render('error', { message: 'Ошибка загрузки главной страницы' });
  }
});

module.exports = router;