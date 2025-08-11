"use server";
import { db } from "@/db";
import { mata_kuliah_praktikum } from "@/db/schema";
import { eq } from "drizzle-orm";
import { mkPraktikumSchema } from "./_components/form-schema";
import slugify from "react-slugify";
import { findAllOrdered, findOneBySlug, checkExists } from "./db-utils";

export const getAllMk = async () => {
  const result = await findAllOrdered();
  return result.map((item) => ({
    "Kode Mata Kuliah": item.kode_mk,
    Nama: item.nama,
    Semester: item.semester,
    "Jumlah Kelas": item.jumlah_kelas,
    id: item.id,
    slug: item.slug,
  }));
};

export const getOneMk = async (slug) => {
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
};

export const checkMkExists = checkExists;

export async function createMk(formData) {
  try {
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
    console.error("Error creating mata kuliah:", error.message);
    return {
      success: false,
      error: error.message || "Gagal membuat mata kuliah",
    };
  }
}

export async function editMk(id, formData) {
  return await db.transaction(async (tx) => {
    try {
      const validatedData = mkPraktikumSchema.parse(formData);
      const mkData = {
        kode_mk: validatedData["Kode Mata Kuliah"],
        nama: validatedData.Nama,
        semester: validatedData.Semester,
        jumlah_kelas: validatedData["Jumlah Kelas"],
        slug: slugify(validatedData.Nama),
      };

      if (mkData.slug) {
        const exists = await checkExists(mkData.slug);
        if (exists) {
          throw new Error("Slug sudah digunakan");
        }
      }

      const [data] = await tx
        .update(mata_kuliah_praktikum)
        .set(mkData)
        .where(eq(mata_kuliah_praktikum.id, id))
        .returning();

      return { success: true, data };
    } catch (error) {
      console.error("Error updating mata kuliah:", error.message);
      throw error;
    }
  });
}

export async function deleteMk(id) {
  try {
    await db
      .delete(mata_kuliah_praktikum)
      .where(eq(mata_kuliah_praktikum.id, id));
    return { success: true };
  } catch (error) {
    console.error("Error deleting mata kuliah:", error.message);
    return {
      success: false,
      error: error.message || "Gagal menghapus mata kuliah",
    };
  }
}
