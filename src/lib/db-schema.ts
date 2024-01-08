import { pgSchema, integer, timestamp } from "drizzle-orm/pg-core";

export const dbSchema = pgSchema("mashcode_schema");

export const usersTable = dbSchema.table("users", {
  id: integer("id").primaryKey().notNull(),
  createdAt: timestamp("created_at").notNull(),
});
