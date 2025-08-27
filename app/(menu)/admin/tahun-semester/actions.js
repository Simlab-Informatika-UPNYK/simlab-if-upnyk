"use server";

import { db } from "@/db";
import { tahun_semester } from "@/db/schema";
import { eq } from "drizzle-orm";
import { 
  findOneBySlug,
  findAllOrdered,
  checkExists
} from "./db-utils";

export const getTahunSemester = findAllOrdered;

export const checkTahunSemesterExists = checkExists;

export async function createTahunSemester(data) {
  return await db.insert(tahun_semester).values(data).returning();
}

export const getTahunSemesterBySlug = findOneBySlug;

export async function updateTahunSemester(slug, data) {
  return await db.transaction(async (tx) => {
    if (data.slug && data.slug !== slug) {
      const exists = await checkExists(data.slug);
      if (exists) {
        throw new Error("Slug sudah digunakan");
      }
    }

    return await tx
      .update(tahun_semester)
      .set(data)
      .where(eq(tahun_semester.slug, slug))
      .returning();
  });
}

export async function deleteTahunSemester(slug) {
  try {
    return await db
      .delete(tahun_semester)
      .where(eq(tahun_semester.slug, slug))
      .returning();
  } catch (error) {
    throw new Error("Gagal menghapus tahun semester: " + error.message);
  }
}
