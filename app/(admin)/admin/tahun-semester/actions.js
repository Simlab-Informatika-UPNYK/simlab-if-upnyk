'use server'

import { db } from "@/db";
import { tahun_semester } from "@/db/schema";
import { asc, eq } from "drizzle-orm";

/**
 * Get all tahun semester records ordered by slug
 */
export async function getTahunSemester() {
  return await db
    .select()
    .from(tahun_semester)
    .orderBy(asc(tahun_semester.slug));
}

/**
 * Check if tahun semester with given slug already exists
 */
export async function checkTahunSemesterExists(slug) {
  const result = await db
    .select()
    .from(tahun_semester)
    .where(eq(tahun_semester.slug, slug))
    .limit(1);

  return result.length > 0;
}

/**
 * Create new tahun semester record
 */
export async function createTahunSemester(data) {
  return await db.insert(tahun_semester).values(data).returning();
}

/**
 * Get single tahun semester by slug
 */
export async function getTahunSemesterBySlug(slug) {
  const result = await db
    .select()
    .from(tahun_semester)
    .where(eq(tahun_semester.slug, slug))
    .limit(1);

  return result[0];
}

/**
 * Update tahun semester record
 */
export async function updateTahunSemester(slug, data) {
  return await db.transaction(async (tx) => {
    // Check if slug is being changed
    if (data.slug && data.slug !== slug) {
      // Validate new slug is unique
      const exists = await tx.select()
        .from(tahun_semester)
        .where(eq(tahun_semester.slug, data.slug))
        .limit(1);
      
      if (exists.length > 0) {
        throw new Error('Slug sudah digunakan');
      }
    }

    // Update record
    return await tx.update(tahun_semester)
      .set(data)
      .where(eq(tahun_semester.slug, slug))
      .returning();
  });
}

/**
 * Delete tahun semester record
 */
export async function deleteTahunSemester(slug) {
  return await db
    .delete(tahun_semester)
    .where(eq(tahun_semester.slug, slug))
    .returning();
}
