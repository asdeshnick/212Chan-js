// services/cache.service.js
const { createClient } = require('redis');

class CacheService {
  constructor() {
    this.client = null;
    this.isConnected = false;
    this.init();
  }

  async init() {
    try {
      this.client = createClient({
        url: process.env.REDIS_URL || 'redis://localhost:6379'
      });
      
      this.client.on('error', (err) => console.error('Redis error:', err));
      this.client.on('connect', () => console.log('Redis connecting...'));
      this.client.on('ready', () => {
        this.isConnected = true;
        console.log('Redis connected');
      });
      this.client.on('reconnecting', () => console.log('Redis reconnecting...'));
      this.client.on('end', () => {
        this.isConnected = false;
        console.log('Redis disconnected');
      });

      await this.client.connect();
    } catch (error) {
      console.error('Redis connection failed:', error);
    }
  }

  async get(key) {
    if (!this.isConnected) return null;
    return this.client.get(key);
  }

  async set(key, value, ttl = 3600) {
    if (!this.isConnected) return;
    await this.client.setEx(key, ttl, value);
  }
}

module.exports = new CacheService();