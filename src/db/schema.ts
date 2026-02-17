import { pgTable, text, timestamp, uuid, integer } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  handle: text("handle").notNull().unique(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const duels = pgTable("duels", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  status: text("status", { enum: ["open", "active", "finished"] }).notNull().default("open"),
  rounds: integer("rounds").notNull().default(1),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export type Duel = typeof duels.$inferSelect;
export type NewDuel = typeof duels.$inferInsert;
