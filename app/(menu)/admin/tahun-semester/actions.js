'use server';

import { db } from '@/db';
import { tahun_semester } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { findOneBySlug, findAllOrdered, checkExists } from './db-utils';
import { requireAdmin } from '@/lib/admin-auth';
import { translatePostgresError } from '@/lib/postgres-error-translator';

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
      if (data.slug && data.slug !== slug) {
        const exists = await checkExists(data.slug);
        if (exists) {
          throw new Error('Tahun semester yang sama sudah tersimpan');
        }
      }

      return await tx
        .update(tahun_semester)
        .set(data)
        .where(eq(tahun_semester.slug, slug))
        .returning();
    });
  } catch (error) {
    const errorMessage = translatePostgresError(error);
    throw new Error(errorMessage);
  }
}

export async function deleteTahunSemester(slug) {
  try {
    await requireAdmin();
    return await db
      .delete(tahun_semester)
      .where(eq(tahun_semester.slug, slug))
      .returning();
  } catch (error) {
    const errorMessage = translatePostgresError(error);
    throw new Error(errorMessage);
  }
}
