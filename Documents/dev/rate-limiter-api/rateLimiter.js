const redis = require('redis');

// Create Redis client
const client = redis.createClient({
  url: 'redis://localhost:6379' // Change this if using Redis Cloud
});
client.connect();

module.exports = async (req, res, next) => {
  try {
    const ip = req.ip;
    const key = `rate-limit:${ip}`;
    const requests = await client.incr(key);

    if (requests === 1) {
      await client.expire(key, 60); // 60 seconds window
    }

    if (requests > 10) {
      return res.status(429).send('⛔ Rate limit exceeded. Try again later.');
    }

    next();
  } catch (err) {
    console.error('Redis error:', err);
    res.status(500).send('Server error');
  }
};