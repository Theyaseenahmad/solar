CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"Fname" varchar(100) NOT NULL,
	"Lname" varchar(100) NOT NULL,
	"email" varchar(100) NOT NULL,
	"provider" varchar(20),
	"externalId" varchar(100),
	"image" text,
	"role" varchar(12) DEFAULT 'customer' NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP,
	"updated_at" timestamp DEFAULT CURRENT_TIMESTAMP
);
