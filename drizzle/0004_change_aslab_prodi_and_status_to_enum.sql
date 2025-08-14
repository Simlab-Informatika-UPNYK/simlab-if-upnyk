CREATE TYPE "public"."program_studi" AS ENUM('Sistem Informasi', 'Informatika');--> statement-breakpoint
CREATE TYPE "public"."status_aslab" AS ENUM('Aktif', 'Tidak Aktif');--> statement-breakpoint
ALTER TABLE "aslab" ALTER COLUMN "program_studi" SET DATA TYPE "public"."program_studi" USING "program_studi"::"public"."program_studi";--> statement-breakpoint
ALTER TABLE "aslab" ALTER COLUMN "status" SET DATA TYPE "public"."status_aslab" USING "status"::"public"."status_aslab";