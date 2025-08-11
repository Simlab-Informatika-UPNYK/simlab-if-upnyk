import {
  pgTable,
  serial,
  text,
  varchar,
  timestamp,
  date,
  integer,
  pgEnum,
  boolean,
} from "drizzle-orm/pg-core";

export const aslab = pgTable("aslab", {
  id_aslab: serial("id_aslab").primaryKey(),
  nama: text("nama"),
  nim: text("nim"),
  email: text("email"),
  no_hp: varchar("no_hp", { length: 15 }),
  angkatan: varchar("angkatan", { length: 4 }),
  program_studi: text("program_studi"),
  status: varchar("status", { length: 20 }),
  profile_picture: text("profile_picture"),
});

export const aslab_honor = pgTable("aslab_honor", {
  id: serial("id").primaryKey(),
  created_at: timestamp("created_at"),
  aslab: integer("aslab").references(() => aslab.id_aslab),
  tahun_semester: integer("tahun_semester").references(() => tahun_semester.id),
  status_honor: text("status_honor"),
  tanggal_diambil: date("tanggal_diambil"),
});

export const dosen_pengampu = pgTable("dosen_pengampu", {
  id: serial("id").primaryKey(),
  created_at: timestamp("created_at"),
  nama: text("nama"),
  nip: text("nip"),
  email: text("email"),
  slug: text("slug").unique().notNull(),
});

export const honor_jenis = pgTable("honor_jenis", {
  id: serial("id").primaryKey(),
  created_at: timestamp("created_at"),
  jenis: text("jenis"),
  biaya: integer("biaya"),
  slug: text("slug").unique().notNull(),
});

export const kalab = pgTable("kalab", {
  id: serial("id").primaryKey(),
  created_at: timestamp("created_at"),
  nama: text("nama"),
  nip: text("nip"),
  email: text("email"),
  no_hp: text("no_hp"),
  photo: text("photo"),
  slug: text("slug").unique().notNull(),
});

export const kelas_aslab = pgTable("kelas_aslab", {
  id: serial("id").primaryKey(),
  created_at: timestamp("created_at"),
  aslab: integer("aslab").references(() => aslab.id_aslab),
  kelas: integer("kelas").references(() => kelas_praktikum.id),
});

export const kelas_praktikum = pgTable("kelas_praktikum", {
  id: serial("id").primaryKey(),
  created_at: timestamp("created_at"),
  kelas: text("kelas"),
  mata_kuliah: integer("mata_kuliah").references(
    () => mata_kuliah_praktikum.id
  ),
  id_dosen: integer("id_dosen").references(() => dosen_pengampu.id),
  jumlah_praktikan: integer("jumlah_praktikan"),
  hari: text("hari"),
  lab: integer("lab").references(() => lab.id),
  jenis_praktikan: text("jenis_praktikan"),
  waktu: text("waktu"),
  slug: text("slug").unique().notNull(),
  tahun_semester: integer("tahun_semester").references(() => tahun_semester.id),
});

export const lab = pgTable("lab", {
  id: serial("id").primaryKey(),
  created_at: timestamp("created_at"),
  nama: text("nama"),
  lantai: text("lantai"),
  kapasitas: integer("kapasitas"),
  kalab: integer("kalab").references(() => kalab.id),
  slug: text("slug").unique().notNull(),
});

export const mata_kuliah_praktikum = pgTable("mata_kuliah_praktikum", {
  id: serial("id").primaryKey(),
  created_at: timestamp("created_at"),
  nama: text("nama"),
  semester: text("semester"),
  jumlah_kelas: integer("jumlah_kelas"),
  slug: text("slug").unique().notNull(),
  kode_mk: integer("kode_mk"),
});

export const permintaan_sertifikat = pgTable("permintaan_sertifikat", {
  id: serial("id").primaryKey(),
  created_at: timestamp("created_at"),
  updated_at: timestamp("updated_at"),
  id_aslab: integer("id_aslab").references(() => aslab.id_aslab),
  waktu_pengajuan: timestamp("waktu_pengajuan"),
  status: text("status"),
  keterangan: text("keterangan"),
});

export const admin = pgTable("admin", {
  id: serial("id").primaryKey(),
  nama: text("nama"),
  nip: text("nip"),
});

/* export const user = pgTable("user", {
  id: serial("id").primaryKey(),
  username: text("username"),
  password: text("password"),
  created_at: timestamp("created_at"),
}); */

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  role: text("role"),
  aslab_id: integer("aslab_id").references(() => aslab.id_aslab),
  admin_id: integer("admin_id").references(() => admin.id),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified")
    .$defaultFn(() => false)
    .notNull(),
  image: text("image"),
  createdAt: timestamp("created_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  username: text("username").unique(),
  displayUsername: text("display_username"),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").$defaultFn(
    () => /* @__PURE__ */ new Date()
  ),
  updatedAt: timestamp("updated_at").$defaultFn(
    () => /* @__PURE__ */ new Date()
  ),
});

export const tahun_semester = pgTable("tahun_semester", {
  id: serial("id").primaryKey(),
  created_at: timestamp("created_at"),
  semester: text("semester"),
  tahun_ajaran: text("tahun_ajaran"),
  slug: text("slug").unique().notNull(),
});
