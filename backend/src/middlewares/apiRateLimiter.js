import rateLimit from "express-rate-limit";
import ServerError from "../common/errors/ServerError.js";

const apiRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (_req, res) => {
    throw new ServerError(429, "API request limit exceeded (5 per 15 minutes allowed)");
  },
});

export default apiRateLimiter;
