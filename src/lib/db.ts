import { pgSchema, integer, timestamp } from "drizzle-orm/pg-core";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

export const dbSchema = pgSchema("mashcode_schema");

export const usersTable = dbSchema.table("users", {
  id: integer("id").primaryKey().notNull(),
  createdAt: timestamp("created_at").notNull(),
});

export const db = drizzle(postgres(process.env.DB_URL!), {
  schema: { dbSchema, usersTable },
});
