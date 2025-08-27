"use server";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { dosen_pengampu } from "@/db/schema";
import slugify from "react-slugify";
import { requireAdmin } from "@/lib/admin-auth";
import { translatePostgresError } from "@/lib/postgres-error-translator";

export async function getAllDosen() {
  try {
    return await db.select().from(dosen_pengampu);
  } catch (error) {
    const errorMessage = translatePostgresError(error);
    throw new Error(errorMessage);
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
    const errorMessage = translatePostgresError(error);
    throw new Error(errorMessage);
  }
}

export async function createDosen(data) {
  try {
    await requireAdmin();
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
    const errorMessage = translatePostgresError(error);
    throw new Error(errorMessage);
  }
}

export async function editDosen(id, data) {
  try {
    await requireAdmin();
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
    const errorMessage = translatePostgresError(error);
    throw new Error(errorMessage);
  }
}

export async function deleteDosen(slug) {
  try {
    await requireAdmin();
    await db
      .delete(dosen_pengampu)
      .where(eq(dosen_pengampu.slug, slug));
    return { error: null };
  } catch (error) {
    const errorMessage = translatePostgresError(error);
    throw new Error(errorMessage);
  }
}
