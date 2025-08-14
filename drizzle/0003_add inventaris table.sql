CREATE TABLE "inventaris" (
	"id" serial PRIMARY KEY NOT NULL,
	"lab_id" integer,
	"no_meja" varchar(20),
	"no_snbt" varchar(50),
	"merek_model" varchar(100),
	"monitor" varchar(100),
	"processor" varchar(100),
	"storage" varchar(100),
	"ram" varchar(50),
	"gpu" varchar(100),
	"lan_card" varchar(50),
	"ups" boolean,
	"merk_ups" varchar(50),
	"keterangan" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "inventaris" ADD CONSTRAINT "inventaris_lab_id_lab_id_fk" FOREIGN KEY ("lab_id") REFERENCES "public"."lab"("id") ON DELETE no action ON UPDATE no action;