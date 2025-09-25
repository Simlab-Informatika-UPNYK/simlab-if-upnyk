import { relations } from "drizzle-orm/relations";
import { aslab, aslabHonor, tahunSemester, kelasAslab, kelasPraktikum, kalab, lab, mataKuliahPraktikum, dosenPengampu, user, account, session, permintaanSertifikat, admin, pengumuman, inventaris } from "./schema";

export const aslabHonorRelations = relations(aslabHonor, ({one}) => ({
	aslab: one(aslab, {
		fields: [aslabHonor.aslab],
		references: [aslab.idAslab]
	}),
	tahunSemester: one(tahunSemester, {
		fields: [aslabHonor.tahunSemester],
		references: [tahunSemester.id]
	}),
}));

export const aslabRelations = relations(aslab, ({many}) => ({
	aslabHonors: many(aslabHonor),
	kelasAslabs: many(kelasAslab),
	permintaanSertifikats: many(permintaanSertifikat),
	users: many(user),
}));

export const tahunSemesterRelations = relations(tahunSemester, ({many}) => ({
	aslabHonors: many(aslabHonor),
	kelasPraktikums: many(kelasPraktikum),
}));

export const kelasAslabRelations = relations(kelasAslab, ({one}) => ({
	aslab: one(aslab, {
		fields: [kelasAslab.aslab],
		references: [aslab.idAslab]
	}),
	kelasPraktikum: one(kelasPraktikum, {
		fields: [kelasAslab.kelas],
		references: [kelasPraktikum.id]
	}),
}));

export const kelasPraktikumRelations = relations(kelasPraktikum, ({one, many}) => ({
	kelasAslabs: many(kelasAslab),
	mataKuliahPraktikum: one(mataKuliahPraktikum, {
		fields: [kelasPraktikum.mataKuliah],
		references: [mataKuliahPraktikum.id]
	}),
	dosenPengampu: one(dosenPengampu, {
		fields: [kelasPraktikum.idDosen],
		references: [dosenPengampu.id]
	}),
	lab: one(lab, {
		fields: [kelasPraktikum.lab],
		references: [lab.id]
	}),
	tahunSemester: one(tahunSemester, {
		fields: [kelasPraktikum.tahunSemester],
		references: [tahunSemester.id]
	}),
}));

export const labRelations = relations(lab, ({one, many}) => ({
	kalab: one(kalab, {
		fields: [lab.kalab],
		references: [kalab.id]
	}),
	kelasPraktikums: many(kelasPraktikum),
	inventarises: many(inventaris),
}));

export const kalabRelations = relations(kalab, ({many}) => ({
	labs: many(lab),
}));

export const mataKuliahPraktikumRelations = relations(mataKuliahPraktikum, ({many}) => ({
	kelasPraktikums: many(kelasPraktikum),
}));

export const dosenPengampuRelations = relations(dosenPengampu, ({many}) => ({
	kelasPraktikums: many(kelasPraktikum),
}));

export const accountRelations = relations(account, ({one}) => ({
	user: one(user, {
		fields: [account.userId],
		references: [user.id]
	}),
}));

export const userRelations = relations(user, ({one, many}) => ({
	accounts: many(account),
	sessions: many(session),
	aslab: one(aslab, {
		fields: [user.aslabId],
		references: [aslab.idAslab]
	}),
	admin: one(admin, {
		fields: [user.adminId],
		references: [admin.id]
	}),
	pengumumen: many(pengumuman),
}));

export const sessionRelations = relations(session, ({one}) => ({
	user: one(user, {
		fields: [session.userId],
		references: [user.id]
	}),
}));

export const permintaanSertifikatRelations = relations(permintaanSertifikat, ({one}) => ({
	aslab: one(aslab, {
		fields: [permintaanSertifikat.idAslab],
		references: [aslab.idAslab]
	}),
}));

export const adminRelations = relations(admin, ({many}) => ({
	users: many(user),
}));

export const pengumumanRelations = relations(pengumuman, ({one}) => ({
	user: one(user, {
		fields: [pengumuman.createdBy],
		references: [user.id]
	}),
}));

export const inventarisRelations = relations(inventaris, ({one}) => ({
	lab: one(lab, {
		fields: [inventaris.labId],
		references: [lab.id]
	}),
}));