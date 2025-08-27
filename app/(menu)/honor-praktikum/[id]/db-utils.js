'use server';

import { db } from '@/db';
import { tahun_semester } from '@/db/schema';
import { eq } from 'drizzle-orm';

export const findOneBySlug = async (slug) => {
  try {
    const result = await db
      .select()
      .from(tahun_semester)
      .where(eq(tahun_semester.slug, slug))
      .limit(1);

    return result[0] || null;
  } catch (error) {
    return null;
  }
};

export const findAllOrdered = async () => {
  try {
    const result = await db
      .select()
      .from(tahun_semester)
      .orderBy(tahun_semester.slug);

    return result;
  } catch (error) {
    return [];
  }
};

export const checkExists = async (slug) => {
  try {
    const result = await db
      .select()
      .from(tahun_semester)
      .where(eq(tahun_semester.slug, slug))
      .limit(1);

    return result.length > 0;
  } catch (error) {
    return false;
  }
};
