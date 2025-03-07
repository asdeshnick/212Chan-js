const redis = require('redis');
const client = redis.createClient(process.env.REDIS_URL);

class CacheService {
  async get(key) {
    return new Promise((resolve, reject) => {
      client.get(key, (err, data) => {
        if (err) reject(err);
        resolve(JSON.parse(data));
      });
    });
  }

  async set(key, value, ttl = 3600) {
    client.setex(key, ttl, JSON.stringify(value));
  }

  async invalidate(pattern) {
    const keys = await client.keys(pattern);
    keys.forEach(key => client.del(key));
  }
}

module.exports = new CacheService();