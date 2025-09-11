"use server";

import { db } from "@/db";
import { tahun_semester, kelas_praktikum, aslab_honor } from "@/db/schema";
import { eq, exists } from "drizzle-orm";
import { findOneBySlug, findAllOrdered, checkExists } from "./db-utils";
import { requireAdmin } from "@/lib/admin-auth";
import { translatePostgresError } from "@/lib/postgres-error-translator";

export const getTahunSemester = findAllOrdered;

export const checkTahunSemesterExists = checkExists;

export async function createTahunSemester(data) {
  try {
    await requireAdmin();
    return await db.insert(tahun_semester).values(data).returning();
  } catch (error) {
    const errorMessage = translatePostgresError(error);
    throw new Error(errorMessage);
  }
}

export const getTahunSemesterBySlug = findOneBySlug;

export async function updateTahunSemester(slug, data) {
  try {
    await requireAdmin();

    return await db.transaction(async (tx) => {
      const currentData = await tx.select().from(tahun_semester).where(eq(tahun_semester.slug, slug)).limit(1);

      if (currentData.length === 0) {
        throw new Error("Data tahun semester tidak ditemukan");
      }
      const tahunSemesterId = currentData[0].id;
      const isUsed = await checkTahunSemesterInUse(tahunSemesterId);
      if (isUsed) {
        throw new Error(
          "Tahun semester tidak dapat diupdate karena sedang digunakan di data kelas praktikum atau honor aslab"
        );
      }

      if (data.slug && data.slug !== slug) {
        const exists = await checkExists(data.slug);
        if (exists) {
          throw new Error("Tahun semester yang sama sudah tersimpan");
        }
      }

      return await tx.update(tahun_semester).set(data).where(eq(tahun_semester.slug, slug)).returning();
    });
  } catch (error) {
    const errorMessage = translatePostgresError(error);
    throw new Error(errorMessage);
  }
}

export async function deleteTahunSemester(slug) {
  try {
    await requireAdmin();
    return await db.delete(tahun_semester).where(eq(tahun_semester.slug, slug)).returning();
  } catch (error) {
    const errorMessage = translatePostgresError(error);
    throw new Error(errorMessage);
  }
}

export async function checkTahunSemesterInUse(id) {
  try {
    // Check if used in kelas_praktikum
    const usedInKelasPraktikum = await db
      .select()
      .from(kelas_praktikum)
      .where(eq(kelas_praktikum.tahun_semester, id))
      .limit(1);

    // Check if used in aslab_honor
    const usedInAslabHonor = await db.select().from(aslab_honor).where(eq(aslab_honor.tahun_semester, id)).limit(1);

    return usedInKelasPraktikum.length > 0 || usedInAslabHonor.length > 0;
  } catch (error) {
    console.error("Error checking tahun semester usage:", error);
    return false;
  }
}

export async function getTahunSemesterWithUsage() {
  const tahunSemesterData = await findAllOrdered();

  const dataWithUsage = await Promise.all(
    tahunSemesterData.map(async (item) => {
      const isUsed = await checkTahunSemesterInUse(item.id);
      return {
        ...item,
        isUsed,
      };
    })
  );

  return dataWithUsage;
}
