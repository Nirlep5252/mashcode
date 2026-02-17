import { sql } from "drizzle-orm";
import { boolean, integer, pgTable, primaryKey, text, timestamp, unique, uuid } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  handle: text("handle").notNull().unique(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const authSessions = pgTable("auth_sessions", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  tokenHash: text("token_hash").notNull().unique(),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  lastSeenAt: timestamp("last_seen_at", { withTimezone: true }).defaultNow().notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const duels = pgTable("duels", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  status: text("status", { enum: ["open", "active", "finished"] }).notNull().default("open"),
  rounds: integer("rounds").notNull().default(1),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const duelRooms = pgTable("duel_rooms", {
  id: uuid("id").primaryKey().defaultRandom(),
  state: text("state", { enum: ["waiting", "live", "completed"] }).notNull().default("waiting"),
  createdByUserId: uuid("created_by_user_id")
    .notNull()
    .references(() => users.id, { onDelete: "restrict" }),
  startedAt: timestamp("started_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});

export const duelRoomPlayers = pgTable(
  "duel_room_players",
  {
    roomId: uuid("room_id")
      .notNull()
      .references(() => duelRooms.id, { onDelete: "cascade" }),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    slot: integer("slot").notNull(),
    ready: boolean("ready").notNull().default(false),
    joinedAt: timestamp("joined_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    primaryKey({ columns: [table.roomId, table.userId] }),
    unique("duel_room_players_room_slot_unique").on(table.roomId, table.slot),
  ],
);

export const matchmakingQueueEntries = pgTable(
  "matchmaking_queue_entries",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    mode: text("mode", { enum: ["duel_casual", "duel_ranked"] }).notNull().default("duel_casual"),
    status: text("status", { enum: ["queued", "matched", "cancelled"] }).notNull().default("queued"),
    matchedRoomId: uuid("matched_room_id").references(() => duelRooms.id, { onDelete: "set null" }),
    joinedAt: timestamp("joined_at", { withTimezone: true }).defaultNow().notNull(),
    matchedAt: timestamp("matched_at", { withTimezone: true }),
    cancelledAt: timestamp("cancelled_at", { withTimezone: true }),
  },
  (table) => [
    unique("matchmaking_queue_entries_user_status_unique").on(table.userId, table.status),
    sql`check (status <> 'matched' or matched_room_id is not null)`,
  ],
);

export type Duel = typeof duels.$inferSelect;
export type NewDuel = typeof duels.$inferInsert;
export type MatchmakingQueueEntry = typeof matchmakingQueueEntries.$inferSelect;
export type DuelRoom = typeof duelRooms.$inferSelect;
