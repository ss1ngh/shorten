import { createClient } from "redis";
import { rateLimit } from "express-rate-limit";
import { RedisStore } from "rate-limit-redis";

const baseRedisUrl = process.env.REDIS_URL || "redis://redis:6379/";
const rateLimitUrl = baseRedisUrl.endsWith("/")
  ? `${baseRedisUrl}1`
  : `${baseRedisUrl}/1`;

const rateLimitClient = createClient({
  url: rateLimitUrl,
});

export const connectRateLimitRedis = async () => {
  if (!rateLimitClient.isOpen) {
    await rateLimitClient.connect();
    console.log("Connected to Rate Limit Redis (DB 1)");
  }
};

export const aggressiveLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  limit: 50,
  message: "Too many requests. Please try again after 60 seconds",
  store: new RedisStore({
    sendCommand: (...args: string[]) => rateLimitClient.sendCommand(args),
    prefix: "rl-aggressive",
  }),
  standardHeaders: "draft-8",
  legacyHeaders: false,
  ipv6Subnet: 56,
});

export const normalLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  limit: 200,
  message: "Too many requests. Please try again after 60 seconds",
  store: new RedisStore({
    sendCommand: (...args: string[]) => rateLimitClient.sendCommand(args),
    prefix: "rl-normal",
  }),
  ipv6Subnet: 60,
  standardHeaders: "draft-8",
  legacyHeaders: false,
});
