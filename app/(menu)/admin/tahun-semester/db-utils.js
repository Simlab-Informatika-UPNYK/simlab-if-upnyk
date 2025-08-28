import { db } from "@/db";
import { tahun_semester } from "@/db/schema";
import { asc, desc, eq } from "drizzle-orm";

export async function findOneBySlug(slug) {
  const result = await db
    .select()
    .from(tahun_semester)
    .where(eq(tahun_semester.slug, slug))
    .limit(1);

  return result[0] || null;
}

export async function findAllOrdered() {
  return await db
    .select()
    .from(tahun_semester)
    .orderBy(desc(tahun_semester.slug));
}

export async function checkExists(slug) {
  const result = await findOneBySlug(slug);
  return result !== null;
}
