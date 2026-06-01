CREATE TYPE "public"."checker_type" AS ENUM('exact', 'custom_cpp');--> statement-breakpoint
CREATE TYPE "public"."judge_language" AS ENUM('cpp17', 'cpp20', 'python3', 'java17', 'javascript', 'typescript', 'go', 'rust', 'csharp', 'kotlin');--> statement-breakpoint
CREATE TYPE "public"."judge_verdict" AS ENUM('accepted', 'wrong_answer', 'time_limit_exceeded', 'memory_limit_exceeded', 'runtime_error', 'compile_error', 'internal_error');--> statement-breakpoint
CREATE TYPE "public"."match_event_type" AS ENUM('match.created', 'player.ready', 'problem.revealed', 'submission.received', 'submission.verdict', 'reaction.sent', 'match.completed', 'match.cancelled', 'player.disconnected', 'player.reconnected');--> statement-breakpoint
CREATE TYPE "public"."match_status" AS ENUM('pending_ready', 'live', 'completed', 'cancelled', 'forfeited');--> statement-breakpoint
CREATE TYPE "public"."problem_status" AS ENUM('generated_candidate', 'auto_verified', 'needs_review', 'approved_for_practice', 'approved_for_ranked', 'rejected', 'retired');--> statement-breakpoint
CREATE TYPE "public"."user_role" AS ENUM('user', 'problem_manager', 'admin', 'owner');--> statement-breakpoint
CREATE TABLE "app_users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"auth_user_id" text NOT NULL,
	"username" text NOT NULL,
	"display_name" text,
	"bio" text,
	"image_url" text,
	"role" "user_role" DEFAULT 'user' NOT NULL,
	"email_verified" boolean DEFAULT false NOT NULL,
	"rating" integer DEFAULT 1000 NOT NULL,
	"rating_deviation" integer DEFAULT 350 NOT NULL,
	"ranked_matches_played" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "app_users_auth_user_id_unique" UNIQUE("auth_user_id"),
	CONSTRAINT "app_users_username_unique" UNIQUE("username")
);
--> statement-breakpoint
CREATE TABLE "match_events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"match_id" uuid NOT NULL,
	"version" integer NOT NULL,
	"type" "match_event_type" NOT NULL,
	"payload" jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "matches" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"problem_id" uuid NOT NULL,
	"player_one_id" uuid NOT NULL,
	"player_two_id" uuid NOT NULL,
	"status" "match_status" DEFAULT 'pending_ready' NOT NULL,
	"winner_user_id" uuid,
	"started_at" timestamp with time zone,
	"completed_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "problems" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" text NOT NULL,
	"slug" text NOT NULL,
	"statement" text NOT NULL,
	"input_format" text NOT NULL,
	"output_format" text NOT NULL,
	"constraints" text NOT NULL,
	"checker_type" "checker_type" DEFAULT 'exact' NOT NULL,
	"status" "problem_status" DEFAULT 'needs_review' NOT NULL,
	"rating" integer NOT NULL,
	"time_limit_ms" integer NOT NULL,
	"memory_limit_mb" integer NOT NULL,
	"tags" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"is_ranked_eligible" boolean DEFAULT false NOT NULL,
	"is_practice_eligible" boolean DEFAULT false NOT NULL,
	"consumed_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "problems_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "submissions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"match_id" uuid,
	"problem_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"language" "judge_language" NOT NULL,
	"source" text NOT NULL,
	"verdict" "judge_verdict",
	"passed_test_count" integer,
	"total_test_count" integer,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"judged_at" timestamp with time zone
);
--> statement-breakpoint
ALTER TABLE "match_events" ADD CONSTRAINT "match_events_match_id_matches_id_fk" FOREIGN KEY ("match_id") REFERENCES "public"."matches"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "matches" ADD CONSTRAINT "matches_problem_id_problems_id_fk" FOREIGN KEY ("problem_id") REFERENCES "public"."problems"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "matches" ADD CONSTRAINT "matches_player_one_id_app_users_id_fk" FOREIGN KEY ("player_one_id") REFERENCES "public"."app_users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "matches" ADD CONSTRAINT "matches_player_two_id_app_users_id_fk" FOREIGN KEY ("player_two_id") REFERENCES "public"."app_users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "matches" ADD CONSTRAINT "matches_winner_user_id_app_users_id_fk" FOREIGN KEY ("winner_user_id") REFERENCES "public"."app_users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "submissions" ADD CONSTRAINT "submissions_match_id_matches_id_fk" FOREIGN KEY ("match_id") REFERENCES "public"."matches"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "submissions" ADD CONSTRAINT "submissions_problem_id_problems_id_fk" FOREIGN KEY ("problem_id") REFERENCES "public"."problems"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "submissions" ADD CONSTRAINT "submissions_user_id_app_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."app_users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "match_events_match_id_version_unique" ON "match_events" USING btree ("match_id","version");--> statement-breakpoint
CREATE INDEX "match_events_match_id_created_at_idx" ON "match_events" USING btree ("match_id","created_at");