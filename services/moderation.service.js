const Post = require('../models/post.model');

class ModerationService {
  async deletePost(postId) {
    await Post.update({ deleted: true }, { where: { id: postId } });
    await this.invalidateCache(`post-${postId}`);
  }

  async getReportedPosts() {
    return Post.findAll({ where: { reported: true } });
  }
}

module.exports = new ModerationService();