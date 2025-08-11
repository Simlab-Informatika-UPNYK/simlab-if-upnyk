import { db } from "@/db";
import { mata_kuliah_praktikum } from "@/db/schema";
import { asc, eq } from "drizzle-orm";

export async function findOneBySlug(slug) {
  const result = await db
    .select()
    .from(mata_kuliah_praktikum)
    .where(eq(mata_kuliah_praktikum.slug, slug))
    .limit(1);

  return result[0] || null;
}

export async function findAllOrdered() {
  return await db
    .select()
    .from(mata_kuliah_praktikum)
    .orderBy(asc(mata_kuliah_praktikum.slug));
}

export async function checkExists(slug) {
  const result = await findOneBySlug(slug);
  return result !== null;
}
