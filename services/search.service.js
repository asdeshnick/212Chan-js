const Post = require('../models/post.model');

class SearchService {
  async searchPosts(query) {
    return Post.findAll({
      where: {
        text: { [Op.like]: `%${query}%` },
        deleted: false
      },
      limit: 50
    });
  }
}

module.exports = new SearchService();