import {
  integer,
  timestamp,
  pgTable,
  serial,
  pgEnum,
} from "drizzle-orm/pg-core";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

export const users = pgTable("users", {
  id: integer("id").primaryKey().notNull(),
  createdAt: timestamp("created_at").notNull(),
  rating: integer("rating").notNull().default(0),
});

export const matches = pgTable("matches", {
  id: serial("id").primaryKey().notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  player1Id: integer("player1_id").notNull(),
  player2Id: integer("player2_id").notNull(),
  winner: pgEnum("winner", ["player1", "player2"])("winner"),
  status: pgEnum("status", ["pending", "completed"])("status"),
  problemId: integer("problem_id").notNull(),
});

export const db = drizzle(postgres(process.env.DB_URL!), {
  schema: { usersTable: users, matchesTable: matches },
});
