ALTER TABLE "users" ADD COLUMN "contact_phone" varchar(15) NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "phone_verified" boolean DEFAULT true;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "email" varchar(100) NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "email_verified" boolean DEFAULT false;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "confirmation_code" varchar(6);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "password" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "created_at" date DEFAULT CURRENT_TIMESTAMP;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "updated_at" date DEFAULT CURRENT_TIMESTAMP;