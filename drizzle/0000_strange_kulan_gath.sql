-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE IF NOT EXISTS "balance" (
	"id" serial PRIMARY KEY NOT NULL,
	"ingress" integer NOT NULL,
	"egress" integer NOT NULL,
	"total" integer NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "service_detail" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"service_id" integer NOT NULL,
	"service_type" integer NOT NULL,
	"professional_id" integer NOT NULL,
	"info" text,
	"price" integer NOT NULL,
	"cost" integer NOT NULL,
	"debt" integer DEFAULT 0 NOT NULL,
	"file_path" varchar(510),
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "debt" (
	"id" serial PRIMARY KEY NOT NULL,
	"debtor_id" integer NOT NULL,
	"info" text NOT NULL,
	"amount" integer NOT NULL,
	"paid" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "service" (
	"id" serial PRIMARY KEY NOT NULL,
	"patient_id" integer NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "professional" (
	"id" serial PRIMARY KEY NOT NULL,
	"first_name" varchar(50) NOT NULL,
	"last_name" varchar(50) NOT NULL,
	"email" varchar NOT NULL,
	"hash_password" varchar NOT NULL,
	"session_token" varchar NOT NULL,
	"specialty" varchar(100) NOT NULL,
	"rpn" integer NOT NULL,
	"telephone" varchar(20),
	"created_at" timestamp DEFAULT '2023-11-12 05:48:52.35594',
	"session_token" varchar(256),
	CONSTRAINT "professional_email_key" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "patient" (
	"id" serial PRIMARY KEY NOT NULL,
	"first_name" varchar(50) NOT NULL,
	"last_name" varchar(50) NOT NULL,
	"address" varchar(100) NOT NULL,
	"dni" integer NOT NULL,
	"telephone" varchar(20),
	"birth_date" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "patient_dni_key" UNIQUE("dni")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "service_detail" ADD CONSTRAINT "service_detail_professional_id_fkey" FOREIGN KEY ("professional_id") REFERENCES "professional"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "service_detail" ADD CONSTRAINT "service_detail_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "service"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "service_detail" ADD CONSTRAINT "service_detail_professional_id_fkey1" FOREIGN KEY ("professional_id") REFERENCES "professional"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "service_detail" ADD CONSTRAINT "service_detail_service_id_fkey1" FOREIGN KEY ("service_id") REFERENCES "service"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "debt" ADD CONSTRAINT "debt_debtor_id_fkey" FOREIGN KEY ("debtor_id") REFERENCES "professional"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "debt" ADD CONSTRAINT "debt_debtor_id_fkey1" FOREIGN KEY ("debtor_id") REFERENCES "professional"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "debt" ADD CONSTRAINT "debt_debtor_id_fkey2" FOREIGN KEY ("debtor_id") REFERENCES "patient"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "service" ADD CONSTRAINT "service_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "patient"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

*/
