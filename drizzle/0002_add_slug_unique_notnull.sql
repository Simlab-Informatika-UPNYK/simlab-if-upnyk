ALTER TABLE "dosen_pengampu" ALTER COLUMN "slug" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "honor_jenis" ALTER COLUMN "slug" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "kalab" ALTER COLUMN "slug" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "kelas_praktikum" ALTER COLUMN "slug" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "lab" ALTER COLUMN "slug" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "mata_kuliah_praktikum" ALTER COLUMN "slug" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "tahun_semester" ALTER COLUMN "slug" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "dosen_pengampu" ADD CONSTRAINT "dosen_pengampu_slug_unique" UNIQUE("slug");--> statement-breakpoint
ALTER TABLE "honor_jenis" ADD CONSTRAINT "honor_jenis_slug_unique" UNIQUE("slug");--> statement-breakpoint
ALTER TABLE "kalab" ADD CONSTRAINT "kalab_slug_unique" UNIQUE("slug");--> statement-breakpoint
ALTER TABLE "kelas_praktikum" ADD CONSTRAINT "kelas_praktikum_slug_unique" UNIQUE("slug");--> statement-breakpoint
ALTER TABLE "lab" ADD CONSTRAINT "lab_slug_unique" UNIQUE("slug");--> statement-breakpoint
ALTER TABLE "mata_kuliah_praktikum" ADD CONSTRAINT "mata_kuliah_praktikum_slug_unique" UNIQUE("slug");--> statement-breakpoint
ALTER TABLE "tahun_semester" ADD CONSTRAINT "tahun_semester_slug_unique" UNIQUE("slug");