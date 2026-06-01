import {
  boolean,
  index,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid
} from "drizzle-orm/pg-core";
import {
  checkerTypes,
  judgeLanguages,
  judgeVerdicts,
  matchStatuses,
  problemLifecycleStates,
  userRoles
} from "@mashcode/domain";
import { matchEventTypes, type MatchEventPayload } from "@mashcode/contracts";

export const userRole = pgEnum("user_role", userRoles);

export const problemStatus = pgEnum(
  "problem_status",
  problemLifecycleStates
);

export const matchStatus = pgEnum("match_status", matchStatuses);

export const judgeVerdict = pgEnum("judge_verdict", judgeVerdicts);

export const judgeLanguage = pgEnum("judge_language", judgeLanguages);

export const checkerType = pgEnum("checker_type", checkerTypes);

export const matchEventType = pgEnum("match_event_type", matchEventTypes);

export const appUsers = pgTable("app_users", {
  id: uuid("id").primaryKey().defaultRandom(),
  authUserId: text("auth_user_id").notNull().unique(),
  username: text("username").notNull().unique(),
  displayName: text("display_name"),
  bio: text("bio"),
  imageUrl: text("image_url"),
  role: userRole("role").notNull().default("user"),
  emailVerified: boolean("email_verified").notNull().default(false),
  rating: integer("rating").notNull().default(1000),
  ratingDeviation: integer("rating_deviation").notNull().default(350),
  rankedMatchesPlayed: integer("ranked_matches_played").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow()
});

export const problems = pgTable("problems", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  statement: text("statement").notNull(),
  inputFormat: text("input_format").notNull(),
  outputFormat: text("output_format").notNull(),
  constraints: text("constraints").notNull(),
  checkerType: checkerType("checker_type").notNull().default("exact"),
  status: problemStatus("status").notNull().default("needs_review"),
  rating: integer("rating").notNull(),
  timeLimitMs: integer("time_limit_ms").notNull(),
  memoryLimitMb: integer("memory_limit_mb").notNull(),
  tags: jsonb("tags").$type<readonly string[]>().notNull().default([]),
  isRankedEligible: boolean("is_ranked_eligible").notNull().default(false),
  isPracticeEligible: boolean("is_practice_eligible").notNull().default(false),
  consumedAt: timestamp("consumed_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .defaultNow()
});

export const matches = pgTable("matches", {
  id: uuid("id").primaryKey().defaultRandom(),
  problemId: uuid("problem_id")
    .notNull()
    .references(() => problems.id),
  playerOneId: uuid("player_one_id")
    .notNull()
    .references(() => appUsers.id),
  playerTwoId: uuid("player_two_id")
    .notNull()
    .references(() => appUsers.id),
  status: matchStatus("status").notNull().default("pending_ready"),
  winnerUserId: uuid("winner_user_id").references(() => appUsers.id),
  startedAt: timestamp("started_at", { withTimezone: true }),
  completedAt: timestamp("completed_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow()
});

export const matchEvents = pgTable(
  "match_events",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    matchId: uuid("match_id")
      .notNull()
      .references(() => matches.id),
    version: integer("version").notNull(),
    type: matchEventType("type").notNull(),
    payload: jsonb("payload").$type<MatchEventPayload>().notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow()
  },
  (table) => [
    uniqueIndex("match_events_match_id_version_unique").on(
      table.matchId,
      table.version
    ),
    index("match_events_match_id_created_at_idx").on(
      table.matchId,
      table.createdAt
    )
  ]
);

export const submissions = pgTable("submissions", {
  id: uuid("id").primaryKey().defaultRandom(),
  matchId: uuid("match_id").references(() => matches.id),
  problemId: uuid("problem_id")
    .notNull()
    .references(() => problems.id),
  userId: uuid("user_id")
    .notNull()
    .references(() => appUsers.id),
  language: judgeLanguage("language").notNull(),
  source: text("source").notNull(),
  verdict: judgeVerdict("verdict"),
  passedTestCount: integer("passed_test_count"),
  totalTestCount: integer("total_test_count"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
  judgedAt: timestamp("judged_at", { withTimezone: true })
});
