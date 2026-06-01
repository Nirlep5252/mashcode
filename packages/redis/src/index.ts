import { createClient } from "redis";
import type { ConnectionOptions } from "node:tls";

const defaultRedisUrl = "redis://localhost:6379";

export interface BullMqRedisConnection {
  readonly host: string;
  readonly port: number;
  readonly username?: string;
  readonly password?: string;
  readonly db?: number;
  readonly tls?: ConnectionOptions;
}

export const getRedisUrl = () => {
  return process.env.REDIS_URL ?? defaultRedisUrl;
};

export const createRedisClient = (url = getRedisUrl()) => {
  return createClient({ url });
};

export const createBullMqConnection = (
  url = getRedisUrl()
): BullMqRedisConnection => {
  const redisUrl = new URL(url);
  const dbPath = redisUrl.pathname.replace("/", "");

  if (redisUrl.protocol !== "redis:" && redisUrl.protocol !== "rediss:") {
    throw new Error(`Unsupported Redis protocol: ${redisUrl.protocol}`);
  }

  if (dbPath && !/^\d+$/.test(dbPath)) {
    throw new Error(`Redis database path must be numeric: ${redisUrl.pathname}`);
  }

  return {
    host: redisUrl.hostname,
    port: Number(redisUrl.port || 6379),
    ...(redisUrl.username
      ? { username: decodeURIComponent(redisUrl.username) }
      : {}),
    ...(redisUrl.password
      ? { password: decodeURIComponent(redisUrl.password) }
      : {}),
    ...(dbPath ? { db: Number(dbPath) } : {}),
    ...(redisUrl.protocol === "rediss:" ? { tls: {} } : {})
  };
};
