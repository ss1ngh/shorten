import { redisClient } from "../config/redis.config.js";

export const getCache = async <T>(key: string): Promise<T | null> => {
  try {
    const data = await redisClient.get(key);

    if (!data) {
      return null;
    }
    return JSON.parse(data) as T;
  } catch (error) {
    console.error(`Redis GET Error for key [${key}]:`, error);
    return null;
  }
};

export const setCache = async (
  key: string,
  data: unknown,
  ttlSeconds: number,
): Promise<void> => {
  try {
    const stringifiedData = JSON.stringify(data);

    await redisClient.set(key, stringifiedData, {
      EX: ttlSeconds,
    });
  } catch (error) {
    console.error(`Redis SET Error for key [${key}]:`, error);
  }
};

export const delCache = async (key: string) => {
  try {
    await redisClient.del(key);
  } catch (error) {
    console.error(`Redis DEL Error for key [${key}] : `, error);
  }
};
