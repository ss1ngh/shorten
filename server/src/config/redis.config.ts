import { createClient } from "redis";

export const redisClient = {
  get: async (key: string) => null,
  set: async (key: string, val: string, opts: any) => {},
  del: async (key: string) => {},
  on: (event: string, cb: any) => {},
  isOpen: false,
  connect: async () => {},
} as any;

export const redisClientConnect = async () => {
  console.log("Redis caching is currently disabled.");
};
