const { createClient } = require('redis');

const redisURL = process.env.REDIS_URL || 'redis://localhost:6379';
const redisClient = createClient({ url: redisURL });

redisClient.on('error', (err) => console.error('Redis Client Error:', err));
redisClient.on('connect', () => console.log('Connected smoothly to Redis'));

const connectRedis = async () => {
  if (!redisClient.isOpen) {
    await redisClient.connect();
  }
};

module.exports = { redisClient, connectRedis };

