ALTER TABLE "users" DROP COLUMN IF EXISTS "email";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "email_verified";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "confirmation_code";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "password";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "created_at";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN IF EXISTS "updated_at";