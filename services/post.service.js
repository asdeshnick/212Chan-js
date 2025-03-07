const Post = require('../models/post.model');

class PostService {
  async createPost(postData) {
    return Post.create(postData);
  }

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

  async bumpThread(threadId) {
    const thread = await Post.findByPk(threadId);
    if (thread) {
      thread.last_bump = new Date();
      await thread.save();
    }
  }
}

module.exports = new PostService();