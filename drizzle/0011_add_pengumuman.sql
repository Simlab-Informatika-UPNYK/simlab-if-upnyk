CREATE TABLE "pengumuman" (
	"id" serial PRIMARY KEY NOT NULL,
	"judul" text,
	"isi" text,
	"active" boolean DEFAULT true,
	"created_at" timestamp DEFAULT now(),
	"created_by" text
);
--> statement-breakpoint
ALTER TABLE "pengumuman" ADD CONSTRAINT "pengumuman_created_by_user_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;