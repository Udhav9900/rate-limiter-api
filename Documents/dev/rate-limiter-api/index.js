const express = require("express");
const redis = require("redis");

const app = express();
const port = 3000;

// Create Redis client
const client = redis.createClient();
client.connect().catch(console.error);

// Rate Limiting Middleware
const rateLimiter = async (req, res, next) => {
  const ip = req.ip;
  const key = `rate-limit:${ip}`;

  try {
    let requests = await client.get(key);
    requests = parseInt(requests) || 0;

    if (requests === 0) {
      await client.set(key, 1, { EX: 60 }); // 1st request, 60s window
    } else if (requests >= 10) {
      return res
        .status(429)
        .send("⛔ Rate limit exceeded. Try again later.");
    } else {
      await client.incr(key);
    }

    next();
  } catch (err) {
    console.error("Redis error:", err);
    res.status(500).send("Server error");
  }
};

// Use middleware
app.use(rateLimiter);

// Test route
app.get("/", (req, res) => {
  res.send("✅ Request allowed.");
});

// Start server
app.listen(port, () => {
  console.log(`🚀 API running at http://localhost:${port}`);
});