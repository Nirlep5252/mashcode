ALTER TABLE "mashcode_schema"."users" ADD COLUMN "rating" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "mashcode_schema"."users" SET SCHEMA public;
--> statement-breakpoint
DROP SCHEMA "mashcode_schema";
