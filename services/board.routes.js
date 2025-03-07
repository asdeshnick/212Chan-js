const express = require('express');
const router = express.Router();
const boardController = require('../controllers/board.controller');
const { boardExists } = require('../middlewares/board-check');
const upload = require('../config/multer');

router.get('/:board', boardExists, boardController.showBoard);
router.get('/:board/thread/:id', boardExists, boardController.showThread);

router.post('/:board/post', 
  boardExists,
  upload.single('file'),
  async (req, res) => {
    const postData = {
      ...req.body,
      board: req.params.board,
      fname: req.file?.filename,
      date: new Date()
    };
    
    const post = await postService.createPost(postData);
    await postService.bumpThread(post.op_id);
    
    res.redirect(`/${req.params.board}`);
  }
);

module.exports = router;