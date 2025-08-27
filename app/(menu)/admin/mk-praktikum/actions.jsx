"use server";
import { db } from "@/db";
import { mata_kuliah_praktikum } from "@/db/schema";
import { eq } from "drizzle-orm";
import { mkPraktikumSchema } from "./_components/form-schema";
import slugify from "react-slugify";
import { findAllOrdered, findOneBySlug, checkExists } from "./db-utils";
import { requireAdmin } from "@/lib/admin-auth";
import { translatePostgresError } from "@/lib/postgres-error-translator";

export const getAllMk = async () => {
  try {
    const result = await findAllOrdered();
    return result.map((item) => ({
      "Kode Mata Kuliah": item.kode_mk,
      Nama: item.nama,
      Semester: item.semester,
      "Jumlah Kelas": item.jumlah_kelas,
      id: item.id,
      slug: item.slug,
    }));
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
      "Kode Mata Kuliah": item.kode_mk,
      Nama: item.nama,
      Semester: item.semester,
      "Jumlah Kelas": item.jumlah_kelas,
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
      kode_mk: validatedData["Kode Mata Kuliah"],
      nama: validatedData.Nama,
      semester: validatedData.Semester,
      jumlah_kelas: validatedData["Jumlah Kelas"],
      slug: slugify(validatedData.Nama),
    };

    const [data] = await db
      .insert(mata_kuliah_praktikum)
      .values(mkData)
      .returning();

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
        kode_mk: validatedData["Kode Mata Kuliah"],
        nama: validatedData.Nama,
        semester: validatedData.Semester,
        jumlah_kelas: validatedData["Jumlah Kelas"],
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
    await db
      .delete(mata_kuliah_praktikum)
      .where(eq(mata_kuliah_praktikum.id, id));
    return { success: true };
  } catch (error) {
    const errorMessage = translatePostgresError(error);
    throw new Error(errorMessage);
  }
}
