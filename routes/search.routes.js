const router = require('express').Router();
const searchService = require('../services/search.service');

router.get('/search', async (req, res) => {
  const results = await searchService.searchPosts(req.query.q);
  res.render('search', { results, query: req.query.q });
});

module.exports = router;