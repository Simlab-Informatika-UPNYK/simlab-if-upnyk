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

export const aslabRelations = relations(aslab, ({ many }) => ({
  kelasAslab: many(kelas_aslab),
}));

export const userRelations = relations(user, ({ one }) => ({
  aslab: one(aslab, {
    fields: [user.aslab_id],
    references: [aslab.id_aslab],
  }),
}));

export const aslabUserRelations = relations(aslab, ({ many }) => ({
  users: many(user),
}));
