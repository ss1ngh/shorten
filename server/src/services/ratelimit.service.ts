import { rateLimit } from "express-rate-limit";

export const aggressiveLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  limit: 50,
  message: "Too many requests. Please try again after 60 seconds",
  standardHeaders: "draft-8",
  legacyHeaders: false,
});

export const normalLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  limit: 200,
  message: "Too many requests. Please try again after 60 seconds",
  standardHeaders: "draft-8",
  legacyHeaders: false,
});
