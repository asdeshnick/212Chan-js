const { Post } = require('../database');

class PostService {
  async getThreads(board, limit = 10) {
    return Post.findAll({
      where: { 
        board,
        op_id: 0,
        deleted: false
      },
      order: [['last_bump', 'DESC']],
      limit
    });
  }
}

module.exports = new PostService();