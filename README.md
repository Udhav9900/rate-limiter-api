# ⚡ Rate Limiter API using Redis (Node.js + Express)

This is a lightweight **Rate Limiting API middleware** built with:
- **Node.js**
- **Express.js**
- **Redis (via Homebrew on macOS)**

### 🔧 Features:
- Limits each user to **10 requests per minute**
- Responds with HTTP `429` if the limit is exceeded
- Uses Redis as a fast in-memory store for request tracking

### 📁 Tech Stack:
- **Backend:** Node.js, Express.js
- **Cache Store:** Redis
- **Terminal Tooling:** Homebrew, npm
- **Source Control:** Git + GitHub

### 🧠 Key Logic:
- When a request is made, a key is generated per user/IP.
- Redis increments the key count.
- If requests exceed 10 per 60s, API returns a `429 Too Many Requests`.

### 🚀 Run It Locally:
```bash
# Start Redis
brew services start redis

# Install deps
npm install

# Run the API
node server.js
