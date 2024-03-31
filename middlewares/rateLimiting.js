const { rateLimit } = require("express-rate-limit");
const config = require("config");

const limiter = rateLimit({
  windowMs: config.get("rateLimiting.windowMs"),
  limit: config.get("rateLimiting.limit"),
});

module.exports = limiter;
