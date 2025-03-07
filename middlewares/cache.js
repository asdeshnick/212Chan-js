const cacheService = require('../services/cache.service');

const cacheMiddleware = (ttl) => {
  return async (req, res, next) => {
    const key = req.originalUrl;
    const cached = await cacheService.get(key);
    
    if (cached) {
      return res.send(cached);
    }
    
    const originalSend = res.send;
    res.send = (body) => {
      cacheService.set(key, body, ttl);
      originalSend.call(res, body);
    };
    
    next();
  };
};

module.exports = cacheMiddleware;