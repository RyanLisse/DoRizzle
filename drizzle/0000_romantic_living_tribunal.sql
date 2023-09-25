CREATE TABLE IF NOT EXISTS "todos" (
	"id" serial PRIMARY KEY NOT NULL,
	"content" text,
	"done" integer,
	"lastEdited" text,
	"createdAt" text
);
