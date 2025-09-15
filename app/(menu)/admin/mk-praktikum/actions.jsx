"use server";
import { db } from "@/db";
import { kelas_praktikum, mata_kuliah_praktikum, tahun_semester } from "@/db/schema";
import { asc, count, desc, eq } from "drizzle-orm";
import { mkPraktikumSchema } from "./_components/form-schema";
import slugify from "react-slugify";
import { findAllOrdered, findOneBySlug, checkExists } from "./db-utils";
import { requireAdmin } from "@/lib/admin-auth";
import { translatePostgresError } from "@/lib/postgres-error-translator";
import { mataKuliahPraktikumRelations } from "@/db/relations";

export const getAllMk = async (year_id = 1) => {
  try {
    const allmk = await db
      .select({
        id: mata_kuliah_praktikum.id,
        kode_mk: mata_kuliah_praktikum.kode_mk,
        nama: mata_kuliah_praktikum.nama,
        slug: mata_kuliah_praktikum.slug,
      })
      .from(mata_kuliah_praktikum)
      .orderBy(asc(mata_kuliah_praktikum.kode_mk));

    const kelasCount = await db
      .select({
        mata_kuliah: kelas_praktikum.mata_kuliah,
        jumlah_kelas: count(kelas_praktikum.id),
      })
      .from(kelas_praktikum)
      .where(eq(kelas_praktikum.tahun_semester, year_id))
      .groupBy(kelas_praktikum.mata_kuliah);

    const mergedData = allmk.map((mk) => {
      const countData = kelasCount.find((k) => k.mata_kuliah === mk.id);
      return {
        ...mk,
        jumlah_kelas: countData ? countData.jumlah_kelas : 0,
      };
    });

    return mergedData;
  } catch (error) {
    const errorMessage = translatePostgresError(error);
    throw new Error(errorMessage);
  }
};

export const getOneMk = async (slug) => {
  try {
    const item = await findOneBySlug(slug);
    if (!item) return null;

    return {
      kode_mk: item.kode_mk,
      nama: item.nama,
      id: item.id,
      slug: item.slug,
    };
  } catch (error) {
    const errorMessage = translatePostgresError(error);
    throw new Error(errorMessage);
  }
};

export const checkMkExists = checkExists;

export async function createMk(formData) {
  try {
    await requireAdmin();
    const validatedData = mkPraktikumSchema.parse(formData);
    const mkData = {
      kode_mk: validatedData.kode_mk,
      nama: validatedData.nama,
      slug: slugify(validatedData.nama),
    };

    const [data] = await db.insert(mata_kuliah_praktikum).values(mkData).returning();

    return data;
  } catch (error) {
    const errorMessage = translatePostgresError(error);
    throw new Error(errorMessage);
  }
}

export async function editMk(id, formData) {
  return await db.transaction(async (tx) => {
    try {
      await requireAdmin();
      const validatedData = mkPraktikumSchema.parse(formData);
      const mkData = {
        kode_mk: validatedData.kode_mk,
        nama: validatedData.nama,
        slug: slugify(validatedData.Nama),
      };

      const [data] = await tx
        .update(mata_kuliah_praktikum)
        .set(mkData)
        .where(eq(mata_kuliah_praktikum.id, id))
        .returning();

      return { success: true, data };
    } catch (error) {
      const errorMessage = translatePostgresError(error);
      throw new Error(errorMessage);
    }
  });
}

export async function deleteMk(id) {
  try {
    await requireAdmin();
    await db.delete(mata_kuliah_praktikum).where(eq(mata_kuliah_praktikum.id, id));
    return { success: true };
  } catch (error) {
    const errorMessage = translatePostgresError(error);
    throw new Error(errorMessage);
  }
}
