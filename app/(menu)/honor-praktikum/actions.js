'use server';

import { db } from '@/db';
import {
  aslab,
  kelas_aslab,
  kelas_praktikum,
  tahun_semester,
} from '@/db/schema';
import { eq, and, count } from 'drizzle-orm';
import { getTahunSemester } from '@/app/(menu)/admin/tahun-semester/actions';
import { translatePostgresError } from '@/lib/postgres-error-translator';

export async function getAslabByTahunSemester(tahunSemesterId) {
  try {
    // Get all aslab with their class count for the specified periode
    const allAslab = await db
      .select({
        id_aslab: aslab.id_aslab,
        nama: aslab.nama,
        nim: aslab.nim,
        email: aslab.email,
      })
      .from(aslab)
      .orderBy(aslab.nama);

    // Get class counts for each aslab in the specified periode
    const classCounts = new Map();
    for (const aslabItem of allAslab) {
      const countResult = await db
        .select({ count: count() })
        .from(kelas_aslab)
        .innerJoin(kelas_praktikum, eq(kelas_praktikum.id, kelas_aslab.kelas))
        .where(
          and(
            eq(kelas_aslab.aslab, aslabItem.id_aslab),
            eq(kelas_praktikum.tahun_semester, tahunSemesterId)
          )
        );

      const countValue = countResult[0]?.count || 0;
      classCounts.set(aslabItem.id_aslab, countValue);
    }

    // Map aslab data with class count
    const mappedAslab = allAslab.map((aslab) => ({
      id_aslab: aslab.id_aslab,
      nama: aslab.nama,
      nim: aslab.nim,
      email: aslab.email,
      jumlah_kelas: classCounts.get(aslab.id_aslab) || 0,
    }));

    return mappedAslab;
  } catch (error) {
    const errorMessage = translatePostgresError(error);
    throw new Error(errorMessage);
  }
}

// Get tahun semester ID from slug
export async function getTahunSemesterId(slug) {
  try {
    const tahunSemesterData = await db
      .select({ id: tahun_semester.id })
      .from(tahun_semester)
      .where(eq(tahun_semester.slug, slug))
      .limit(1);

    return tahunSemesterData[0]?.id || null;
  } catch (error) {
    const errorMessage = translatePostgresError(error);
    throw new Error(errorMessage);
  }
}

export { getTahunSemester };
