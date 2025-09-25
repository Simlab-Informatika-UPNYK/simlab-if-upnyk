import { pgTable, unique, serial, timestamp, text, integer, foreignKey, date, varchar, boolean, pgEnum } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const programStudi = pgEnum("program_studi", ['Sistem Informasi', 'Informatika'])
export const statusAslab = pgEnum("status_aslab", ['Aktif', 'Tidak Aktif'])
export const userRole = pgEnum("user_role", ['admin', 'aslab'])


export const honorJenis = pgTable("honor_jenis", {
	id: serial().primaryKey().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	jenis: text(),
	biaya: integer(),
	slug: text().notNull(),
}, (table) => [
	unique("honor_jenis_slug_unique").on(table.slug),
]);

export const aslabHonor = pgTable("aslab_honor", {
	id: serial().primaryKey().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	aslab: integer(),
	tahunSemester: integer("tahun_semester"),
	statusHonor: text("status_honor"),
	tanggalDiambil: date("tanggal_diambil"),
}, (table) => [
	foreignKey({
			columns: [table.aslab],
			foreignColumns: [aslab.idAslab],
			name: "aslab_honor_aslab_aslab_id_aslab_fk"
		}),
	foreignKey({
			columns: [table.tahunSemester],
			foreignColumns: [tahunSemester.id],
			name: "aslab_honor_tahun_semester_tahun_semester_id_fk"
		}),
]);

export const tahunSemester = pgTable("tahun_semester", {
	id: serial().primaryKey().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	semester: text(),
	tahunAjaran: text("tahun_ajaran"),
	slug: text().notNull(),
}, (table) => [
	unique("tahun_semester_slug_unique").on(table.slug),
]);

export const kelasAslab = pgTable("kelas_aslab", {
	id: serial().primaryKey().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	aslab: integer(),
	kelas: integer(),
}, (table) => [
	foreignKey({
			columns: [table.aslab],
			foreignColumns: [aslab.idAslab],
			name: "kelas_aslab_aslab_aslab_id_aslab_fk"
		}),
	foreignKey({
			columns: [table.kelas],
			foreignColumns: [kelasPraktikum.id],
			name: "kelas_aslab_kelas_kelas_praktikum_id_fk"
		}),
]);

export const mataKuliahPraktikum = pgTable("mata_kuliah_praktikum", {
	id: serial().primaryKey().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	nama: text(),
	semester: text(),
	jumlahKelas: integer("jumlah_kelas"),
	slug: text().notNull(),
	kodeMk: integer("kode_mk").notNull(),
}, (table) => [
	unique("mata_kuliah_praktikum_slug_unique").on(table.slug),
	unique("mata_kuliah_praktikum_kode_mk_unique").on(table.kodeMk),
]);

export const dosenPengampu = pgTable("dosen_pengampu", {
	id: serial().primaryKey().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	nama: text(),
	nip: text(),
	email: text(),
	slug: text().notNull(),
}, (table) => [
	unique("dosen_pengampu_slug_unique").on(table.slug),
]);

export const lab = pgTable("lab", {
	id: serial().primaryKey().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	nama: text(),
	lantai: text(),
	kapasitas: integer(),
	kalab: integer(),
	slug: text().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.kalab],
			foreignColumns: [kalab.id],
			name: "lab_kalab_kalab_id_fk"
		}),
	unique("lab_slug_unique").on(table.slug),
]);

export const kalab = pgTable("kalab", {
	id: serial().primaryKey().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	nama: text(),
	nip: text(),
	email: text(),
	noHp: text("no_hp"),
	photo: text(),
	slug: text().notNull(),
}, (table) => [
	unique("kalab_slug_unique").on(table.slug),
]);

export const admin = pgTable("admin", {
	id: serial().primaryKey().notNull(),
	nama: text(),
	nip: text(),
});

export const kelasPraktikum = pgTable("kelas_praktikum", {
	id: serial().primaryKey().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	kelas: text(),
	mataKuliah: integer("mata_kuliah"),
	idDosen: integer("id_dosen"),
	jumlahPraktikan: integer("jumlah_praktikan"),
	hari: text(),
	lab: integer(),
	jenisPraktikan: text("jenis_praktikan"),
	tahunSemester: integer("tahun_semester"),
	waktuMulai: text("waktu_mulai"),
	waktuSelesai: text("waktu_selesai"),
}, (table) => [
	foreignKey({
			columns: [table.mataKuliah],
			foreignColumns: [mataKuliahPraktikum.id],
			name: "kelas_praktikum_mata_kuliah_mata_kuliah_praktikum_id_fk"
		}),
	foreignKey({
			columns: [table.idDosen],
			foreignColumns: [dosenPengampu.id],
			name: "kelas_praktikum_id_dosen_dosen_pengampu_id_fk"
		}),
	foreignKey({
			columns: [table.lab],
			foreignColumns: [lab.id],
			name: "kelas_praktikum_lab_lab_id_fk"
		}),
	foreignKey({
			columns: [table.tahunSemester],
			foreignColumns: [tahunSemester.id],
			name: "kelas_praktikum_tahun_semester_tahun_semester_id_fk"
		}),
]);

export const account = pgTable("account", {
	id: text().primaryKey().notNull(),
	accountId: text("account_id").notNull(),
	providerId: text("provider_id").notNull(),
	userId: text("user_id").notNull(),
	accessToken: text("access_token"),
	refreshToken: text("refresh_token"),
	idToken: text("id_token"),
	accessTokenExpiresAt: timestamp("access_token_expires_at", { mode: 'string' }),
	refreshTokenExpiresAt: timestamp("refresh_token_expires_at", { mode: 'string' }),
	scope: text(),
	password: text(),
	createdAt: timestamp("created_at", { mode: 'string' }).notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: "account_user_id_user_id_fk"
		}).onDelete("cascade"),
]);

export const session = pgTable("session", {
	id: text().primaryKey().notNull(),
	expiresAt: timestamp("expires_at", { mode: 'string' }).notNull(),
	token: text().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).notNull(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).notNull(),
	ipAddress: text("ip_address"),
	userAgent: text("user_agent"),
	userId: text("user_id").notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [user.id],
			name: "session_user_id_user_id_fk"
		}).onDelete("cascade"),
	unique("session_token_unique").on(table.token),
]);

export const aslab = pgTable("aslab", {
	idAslab: serial("id_aslab").primaryKey().notNull(),
	nama: text(),
	nim: text(),
	email: text(),
	noHp: varchar("no_hp", { length: 15 }),
	angkatan: varchar({ length: 4 }),
	programStudi: programStudi("program_studi"),
	status: statusAslab(),
	profilePicture: text("profile_picture"),
});

export const permintaanSertifikat = pgTable("permintaan_sertifikat", {
	id: serial().primaryKey().notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
	idAslab: integer("id_aslab"),
	waktuPengajuan: timestamp("waktu_pengajuan", { mode: 'string' }),
	status: text(),
	keterangan: text(),
	alasan: text(),
}, (table) => [
	foreignKey({
			columns: [table.idAslab],
			foreignColumns: [aslab.idAslab],
			name: "permintaan_sertifikat_id_aslab_aslab_id_aslab_fk"
		}),
]);

export const user = pgTable("user", {
	id: text().default(nextval(\'user_id_seq\'::regclass)).primaryKey().notNull(),
	username: text(),
	createdAt: timestamp("created_at", { mode: 'string' }).notNull(),
	role: userRole().default('aslab'),
	aslabId: integer("aslab_id"),
	adminId: integer("admin_id"),
	name: text().notNull(),
	email: text().notNull(),
	emailVerified: boolean("email_verified").notNull(),
	image: text(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).notNull(),
	displayUsername: text("display_username"),
	nip: text(),
	requiresPasswordChange: boolean("requires_password_change"),
}, (table) => [
	foreignKey({
			columns: [table.aslabId],
			foreignColumns: [aslab.idAslab],
			name: "user_aslab_id_aslab_id_aslab_fk"
		}),
	foreignKey({
			columns: [table.adminId],
			foreignColumns: [admin.id],
			name: "user_admin_id_admin_id_fk"
		}),
	unique("user_username_unique").on(table.username),
	unique("user_email_unique").on(table.email),
]);

export const verification = pgTable("verification", {
	id: text().primaryKey().notNull(),
	identifier: text().notNull(),
	value: text().notNull(),
	expiresAt: timestamp("expires_at", { mode: 'string' }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
});

export const pengumuman = pgTable("pengumuman", {
	id: serial().primaryKey().notNull(),
	judul: text(),
	isi: text(),
	active: boolean().default(true),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	createdBy: text("created_by"),
}, (table) => [
	foreignKey({
			columns: [table.createdBy],
			foreignColumns: [user.id],
			name: "pengumuman_created_by_user_id_fk"
		}),
]);

export const inventaris = pgTable("inventaris", {
	id: serial().primaryKey().notNull(),
	labId: integer("lab_id"),
	keterangan: text(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	nama: text(),
	tahun: integer(),
	kondisi: text(),
}, (table) => [
	foreignKey({
			columns: [table.labId],
			foreignColumns: [lab.id],
			name: "inventaris_lab_id_lab_id_fk"
		}),
]);

export const kajur = pgTable("kajur", {
	id: serial().primaryKey().notNull(),
	nama: text(),
	nip: text(),
	tandaTangan: text("tanda_tangan"),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { mode: 'string' }),
	signatureTop: integer("signature_top").default(0),
	signatureLeft: integer("signature_left").default(0),
	signatureHeight: integer("signature_height").default(100),
	signatureWidth: integer("signature_width").default(200),
});
