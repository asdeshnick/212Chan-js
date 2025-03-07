const express = require('express');
const router = express.Router();
const boardController = require('../controllers/board.controller');

// Правильное использование методов контроллера
router.get('/:board', boardController.showBoard);
router.get('/:board/thread/:id', boardController.showThread);

module.exports = router;