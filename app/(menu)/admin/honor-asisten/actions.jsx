"use server";

import { db } from "@/db";
import { honor_jenis } from "@/db/schema";
import { revalidatePath } from "next/cache";
import slugify from "react-slugify";
import { desc, eq } from "drizzle-orm";
import { requireAdmin } from "@/lib/admin-auth";

/**
 * Fetch all honor jenis records
 */
export async function getAllHonorJenis() {
  try {
    const data = await db
      .select()
      .from(honor_jenis)
      .orderBy(desc(honor_jenis.id));
    return data;
  } catch (error) {
    console.error("Error fetching honor jenis:", error);
    throw new Error(error.message);
  }
}

/**
 * Create a new honor jenis record
 */
export async function createHonorJenis({ jenis, biaya }) {
  try {
    await requireAdmin();
    const data = await db
      .insert(honor_jenis)
      .values({
        jenis,
        biaya,
        slug: slugify(jenis),
        created_at: new Date()
      })
      .returning();

    revalidatePath("/admin/honor-asisten");
    return data[0];
  } catch (error) {
    console.error("Error creating honor jenis:", error);
    throw new Error(error.message);
  }
}

/**
 * Update an existing honor jenis record
 */
export async function updateHonorJenis({ id, jenis, biaya }) {
  try {
    await requireAdmin();
    const data = await db
      .update(honor_jenis)
      .set({
        jenis,
        biaya, 
        slug: slugify(jenis)
      })
      .where(eq(honor_jenis.id, id))
      .returning();

    revalidatePath("/admin/honor-asisten");
    return data[0];
  } catch (error) {
    console.error("Error updating honor jenis:", error);
    throw new Error(error.message);
  }
}

/**
 * Delete a honor jenis record
 */
export async function deleteHonorJenis(id) {
  try {
    await requireAdmin();
    await db
      .delete(honor_jenis)
      .where(eq(honor_jenis.id, id));

    revalidatePath("/admin/honor-asisten");
    return { success: true };
  } catch (error) {
    console.error("Error deleting honor jenis:", error);
    throw new Error(error.message);
  }
}

/**
 * Get a single honor jenis by ID
 */
export async function getHonorJenisByJenis(slug) {
  try {
    const data = await db
      .select()
      .from(honor_jenis)
      .where(eq(honor_jenis.slug, slug))
      .then(res => res[0]);

    return data || null;
  } catch (error) {
    return null;
  }
}
