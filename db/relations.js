import { relations } from "drizzle-orm";
import {
  kelas_praktikum,
  kelas_aslab,
  aslab,
  dosen_pengampu,
  mata_kuliah_praktikum,
  lab,
  tahun_semester,
  user,
  permintaan_sertifikat,
} from "./schema";

export const kelasPraktikumRelations = relations(kelas_praktikum, ({ one, many }) => ({
  dosenPengampu: one(dosen_pengampu, {
    fields: [kelas_praktikum.id_dosen],
    references: [dosen_pengampu.id],
  }),
  mataKuliah: one(mata_kuliah_praktikum, {
    fields: [kelas_praktikum.mata_kuliah],
    references: [mata_kuliah_praktikum.id],
  }),
  lab: one(lab, {
    fields: [kelas_praktikum.lab],
    references: [lab.id],
  }),
  tahunSemester: one(tahun_semester, {
    fields: [kelas_praktikum.tahun_semester],
    references: [tahun_semester.id],
  }),
  kelasAslab: many(kelas_aslab),
}));

export const kelasAslabRelations = relations(kelas_aslab, ({ one }) => ({
  aslab: one(aslab, {
    fields: [kelas_aslab.aslab],
    references: [aslab.id_aslab],
  }),
  kelasPraktikum: one(kelas_praktikum, {
    fields: [kelas_aslab.kelas],
    references: [kelas_praktikum.id],
  }),
}));

export const aslabRelations = relations(aslab, ({ many, one }) => ({
  kelasAslab: many(kelas_aslab),
  user: one(user, {
    fields: [aslab.id_aslab],
    references: [user.aslab_id],
  }),
  permintaanSertifikat: many(permintaan_sertifikat),
}));

export const userRelations = relations(user, ({ one }) => ({
  aslab: one(aslab, {
    fields: [user.aslab_id],
    references: [aslab.id_aslab],
  }),
}));

export const permintaanSertifikatRelations = relations(permintaan_sertifikat, ({ one }) => ({
  aslab: one(aslab, {
    fields: [permintaan_sertifikat.id_aslab],
    references: [aslab.id_aslab],
  }),
}));

export const mataKuliahPraktikumRelations = relations(mata_kuliah_praktikum, ({ many }) => ({
  kelasPraktikum: many(kelas_praktikum),
}));

export const tahunSemesterRelations = relations(tahun_semester, ({ many }) => ({
  kelasPraktikum: many(kelas_praktikum),
}));
