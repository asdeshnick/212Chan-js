const express = require('express');
const router = express.Router();
const boardController = require('../controllers/board.controller');

router.get('/:board', boardController.showBoard);
router.get('/:board/thread/:id', boardController.showThread);

module.exports = router;