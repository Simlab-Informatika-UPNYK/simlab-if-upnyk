CREATE TABLE "kajur" (
	"id" serial PRIMARY KEY NOT NULL,
	"nama" text,
	"nip" text,
	"tanda_tangan" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp
);
