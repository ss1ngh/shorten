import { createClient, type RedisClientType } from "redis";

type StubClient = {
  get: (key: string) => Promise<string | null>;
  set: (key: string, val: string, opts?: { EX: number }) => Promise<void>;
  del: (key: string) => Promise<number>;
  on: (event: string, cb: () => void) => void;
  isOpen: boolean;
  connect: () => Promise<void>;
};

export const redisClient: RedisClientType | StubClient = {
  get: async (_key: string) => null,
  set: async (_key: string, _val: string, _opts?: { EX: number }) => {},
  del: async (_key: string) => 0,
  on: () => {},
  isOpen: false,
  connect: async () => {},
};

export const redisClientConnect = async () => {
  console.log("Redis caching is currently disabled.");
};
