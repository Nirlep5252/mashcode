CREATE TABLE "auth_sessions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"token_hash" text NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	"last_seen_at" timestamp with time zone DEFAULT now() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "auth_sessions_token_hash_unique" UNIQUE("token_hash")
);
--> statement-breakpoint
CREATE TABLE "duel_room_players" (
	"room_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"slot" integer NOT NULL,
	"ready" boolean DEFAULT false NOT NULL,
	"joined_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "duel_room_players_room_id_user_id_pk" PRIMARY KEY("room_id","user_id"),
	CONSTRAINT "duel_room_players_room_slot_unique" UNIQUE("room_id","slot")
);
--> statement-breakpoint
CREATE TABLE "duel_rooms" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"state" text DEFAULT 'waiting' NOT NULL,
	"created_by_user_id" uuid NOT NULL,
	"started_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "matchmaking_queue_entries" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"mode" text DEFAULT 'duel_casual' NOT NULL,
	"status" text DEFAULT 'queued' NOT NULL,
	"matched_room_id" uuid,
	"joined_at" timestamp with time zone DEFAULT now() NOT NULL,
	"matched_at" timestamp with time zone,
	"cancelled_at" timestamp with time zone,
	CONSTRAINT "matchmaking_queue_entries_user_status_unique" UNIQUE("user_id","status")
);
--> statement-breakpoint
ALTER TABLE "auth_sessions" ADD CONSTRAINT "auth_sessions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "duel_room_players" ADD CONSTRAINT "duel_room_players_room_id_duel_rooms_id_fk" FOREIGN KEY ("room_id") REFERENCES "public"."duel_rooms"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "duel_room_players" ADD CONSTRAINT "duel_room_players_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "duel_rooms" ADD CONSTRAINT "duel_rooms_created_by_user_id_users_id_fk" FOREIGN KEY ("created_by_user_id") REFERENCES "public"."users"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "matchmaking_queue_entries" ADD CONSTRAINT "matchmaking_queue_entries_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "matchmaking_queue_entries" ADD CONSTRAINT "matchmaking_queue_entries_matched_room_id_duel_rooms_id_fk" FOREIGN KEY ("matched_room_id") REFERENCES "public"."duel_rooms"("id") ON DELETE set null ON UPDATE no action;