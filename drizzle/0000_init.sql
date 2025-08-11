CREATE TABLE "admin" (
	"id" serial PRIMARY KEY NOT NULL,
	"nama" text,
	"nip" text
);
--> statement-breakpoint
CREATE TABLE "aslab" (
	"id_aslab" serial PRIMARY KEY NOT NULL,
	"nama" text,
	"nim" text,
	"email" text,
	"no_hp" varchar(15),
	"angkatan" varchar(4),
	"program_studi" text,
	"status" varchar(20),
	"profile_picture" text
);
--> statement-breakpoint
CREATE TABLE "aslab_honor" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp,
	"aslab" integer,
	"tahun_semester" integer,
	"status_honor" text,
	"tanggal_diambil" date
);
--> statement-breakpoint
CREATE TABLE "dosen_pengampu" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp,
	"nama" text,
	"nip" text,
	"email" text,
	"slug" text
);
--> statement-breakpoint
CREATE TABLE "honor_jenis" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp,
	"jenis" text,
	"biaya" integer,
	"slug" text
);
--> statement-breakpoint
CREATE TABLE "kalab" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp,
	"nama" text,
	"nip" text,
	"email" text,
	"no_hp" text,
	"photo" text,
	"slug" text
);
--> statement-breakpoint
CREATE TABLE "kelas_aslab" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp,
	"aslab" integer,
	"kelas" integer
);
--> statement-breakpoint
CREATE TABLE "kelas_praktikum" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp,
	"kelas" text,
	"mata_kuliah" integer,
	"id_dosen" integer,
	"jumlah_praktikan" integer,
	"hari" text,
	"lab" integer,
	"jenis_praktikan" text,
	"waktu" text,
	"slug" text,
	"tahun_semester" integer
);
--> statement-breakpoint
CREATE TABLE "lab" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp,
	"nama" text,
	"lantai" text,
	"kapasitas" integer,
	"kalab" integer,
	"slug" text
);
--> statement-breakpoint
CREATE TABLE "mata_kuliah_praktikum" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp,
	"nama" text,
	"semester" text,
	"jumlah_kelas" integer,
	"slug" text,
	"kode_mk" integer
);
--> statement-breakpoint
CREATE TABLE "permintaan_sertifikat" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp,
	"updated_at" timestamp,
	"id_aslab" integer,
	"waktu_pengajuan" timestamp,
	"status" text,
	"keterangan" text
);
--> statement-breakpoint
CREATE TABLE "tahun_semester" (
	"id" serial PRIMARY KEY NOT NULL,
	"created_at" timestamp,
	"semester" text,
	"tahun_ajaran" text,
	"slug" text
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" text,
	"password" text,
	"created_at" timestamp,
	"role" text,
	"aslab_id" integer,
	"admin_id" integer
);
--> statement-breakpoint
ALTER TABLE "aslab_honor" ADD CONSTRAINT "aslab_honor_aslab_aslab_id_aslab_fk" FOREIGN KEY ("aslab") REFERENCES "public"."aslab"("id_aslab") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "aslab_honor" ADD CONSTRAINT "aslab_honor_tahun_semester_tahun_semester_id_fk" FOREIGN KEY ("tahun_semester") REFERENCES "public"."tahun_semester"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "kelas_aslab" ADD CONSTRAINT "kelas_aslab_aslab_aslab_id_aslab_fk" FOREIGN KEY ("aslab") REFERENCES "public"."aslab"("id_aslab") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "kelas_aslab" ADD CONSTRAINT "kelas_aslab_kelas_kelas_praktikum_id_fk" FOREIGN KEY ("kelas") REFERENCES "public"."kelas_praktikum"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "kelas_praktikum" ADD CONSTRAINT "kelas_praktikum_mata_kuliah_mata_kuliah_praktikum_id_fk" FOREIGN KEY ("mata_kuliah") REFERENCES "public"."mata_kuliah_praktikum"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "kelas_praktikum" ADD CONSTRAINT "kelas_praktikum_id_dosen_dosen_pengampu_id_fk" FOREIGN KEY ("id_dosen") REFERENCES "public"."dosen_pengampu"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "kelas_praktikum" ADD CONSTRAINT "kelas_praktikum_lab_lab_id_fk" FOREIGN KEY ("lab") REFERENCES "public"."lab"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "kelas_praktikum" ADD CONSTRAINT "kelas_praktikum_tahun_semester_tahun_semester_id_fk" FOREIGN KEY ("tahun_semester") REFERENCES "public"."tahun_semester"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "lab" ADD CONSTRAINT "lab_kalab_kalab_id_fk" FOREIGN KEY ("kalab") REFERENCES "public"."kalab"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "permintaan_sertifikat" ADD CONSTRAINT "permintaan_sertifikat_id_aslab_aslab_id_aslab_fk" FOREIGN KEY ("id_aslab") REFERENCES "public"."aslab"("id_aslab") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_aslab_id_aslab_id_aslab_fk" FOREIGN KEY ("aslab_id") REFERENCES "public"."aslab"("id_aslab") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_admin_id_admin_id_fk" FOREIGN KEY ("admin_id") REFERENCES "public"."admin"("id") ON DELETE no action ON UPDATE no action;