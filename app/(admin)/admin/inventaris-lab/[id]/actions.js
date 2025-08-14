"use server";
import { db } from "@/db";
import { lab } from "@/db/schema";
import { eq } from "drizzle-orm";

// Fungsi untuk mendapatkan ID lab berdasarkan slug
export async function getLabIdBySlug(slug) {
  try {
    const [data] = await db
      .select({ id: lab.id })
      .from(lab)
      .where(eq(lab.slug, slug))
      .limit(1);

    if (!data) return { success: false, error: "Lab not found" };
    return { success: true, data: data.id };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Fungsi untuk mendapatkan detail lab berdasarkan ID
export async function getLabDetail(slug) {
  try {
    const [data] = await db
      .select({
        id: lab.id,
        nama: lab.nama,
        lantai: lab.lantai,
        slug: lab.slug,
      })
      .from(lab)
      .where(eq(lab.slug, slug))
      .limit(1);

    if (!data) return { success: false, error: "Lab not found" };
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
