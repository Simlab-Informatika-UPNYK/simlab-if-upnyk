"use server";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { dosen_pengampu } from "@/db/schema";
import slugify from "react-slugify";

export async function getAllDosen() {
  try {
    return await db.select().from(dosen_pengampu);
  } catch (error) {
    console.error("Error fetching dosen:", error);
    return [];
  }
}

export async function getOneDosen(slug) {
  try {
    const [dosen] = await db
      .select()
      .from(dosen_pengampu)
      .where(eq(dosen_pengampu.slug, slug))
      .limit(1);
    return dosen || null;
  } catch (error) {
    console.error("Error fetching dosen:", error);
    return null;
  }
}

export async function createDosen(data) {
  try {
    const dosen = {
      nama: data.nama,
      nip: data.nip,
      email: data.email,
      slug: slugify(data.nama),
    };

    const [insertedDosen] = await db
      .insert(dosen_pengampu)
      .values(dosen)
      .returning();

    return { success: true, data: insertedDosen };
  } catch (error) {
    console.error("Error creating dosen:", error);
    return { success: false, error: error.message };
  }
}

export async function editDosen(id, data) {
  try {
    const dosenData = {
      nama: data.nama,
      nip: data.nip,
      email: data.email,
      slug: slugify(data.nama),
    };

    const [updatedDosen] = await db
      .update(dosen_pengampu)
      .set(dosenData)
      .where(eq(dosen_pengampu.id, id))
      .returning();

    return { success: true, data: updatedDosen };
  } catch (error) {
    console.error("Error updating dosen:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteDosen(slug) {
  try {
    await db
      .delete(dosen_pengampu)
      .where(eq(dosen_pengampu.slug, slug));
    return { error: null };
  } catch (error) {
    console.error("Error deleting dosen:", error);
    return { error: error.message };
  }
}
