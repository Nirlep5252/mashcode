import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

export const createDatabaseClient = (
  databaseUrl =
    process.env.DATABASE_URL ??
    "postgres://mashcode:mashcode@localhost:5432/mashcode"
) => {
  const client = postgres(databaseUrl);

  return drizzle(client, { schema });
};

export type DatabaseClient = ReturnType<typeof createDatabaseClient>;

export * from "./match-events";
export * from "./schema";
