ALTER TABLE "inventaris" ADD COLUMN "nama" text NOT NULL;--> statement-breakpoint
ALTER TABLE "inventaris" ADD COLUMN "tahun" integer;--> statement-breakpoint
ALTER TABLE "inventaris" ADD COLUMN "kondisi" text;--> statement-breakpoint
ALTER TABLE "inventaris" DROP COLUMN "no_meja";--> statement-breakpoint
ALTER TABLE "inventaris" DROP COLUMN "no_snbt";--> statement-breakpoint
ALTER TABLE "inventaris" DROP COLUMN "merek_model";--> statement-breakpoint
ALTER TABLE "inventaris" DROP COLUMN "monitor";--> statement-breakpoint
ALTER TABLE "inventaris" DROP COLUMN "processor";--> statement-breakpoint
ALTER TABLE "inventaris" DROP COLUMN "storage";--> statement-breakpoint
ALTER TABLE "inventaris" DROP COLUMN "ram";--> statement-breakpoint
ALTER TABLE "inventaris" DROP COLUMN "gpu";--> statement-breakpoint
ALTER TABLE "inventaris" DROP COLUMN "lan_card";--> statement-breakpoint
ALTER TABLE "inventaris" DROP COLUMN "ups";--> statement-breakpoint
ALTER TABLE "inventaris" DROP COLUMN "merk_ups";