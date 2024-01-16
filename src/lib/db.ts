import { integer, timestamp, pgTable } from "drizzle-orm/pg-core";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

export const users = pgTable("users", {
  id: integer("id").primaryKey().notNull(),
  createdAt: timestamp("created_at").notNull(),
  rating: integer("rating").notNull().default(0),
});

export const db = drizzle(postgres(process.env.DB_URL!), {
  schema: { usersTable: users },
});
