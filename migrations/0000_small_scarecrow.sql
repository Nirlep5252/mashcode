CREATE SCHEMA "mashcode_schema";
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "mashcode_schema"."users" (
	"id" integer PRIMARY KEY NOT NULL,
	"created_at" timestamp NOT NULL
);
