const express = require('express');
const rateLimiter = require('./rateLimiter');

const app = express();
const PORT = 3000;

app.use(rateLimiter);

app.get('/', (req, res) => {
  res.send('✅ API Response: Hello, World!');
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});