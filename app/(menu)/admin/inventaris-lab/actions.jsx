"use server";

import { db } from "@/db";
import { inventaris } from "@/db/schema";
import { requireAdmin } from "@/lib/admin-auth";
import translatePostgresError from "@/lib/postgres-error-translator";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

// Fungsi untuk mendapatkan semua data inventaris berdasarkan ID lab
export async function getInventarisByLabId(labId) {
  try {
    const data = await db.select().from(inventaris).where(eq(inventaris.lab_id, labId));
    return { success: true, data: data };
  } catch (error) {
    const errorMessage = translatePostgresError(error);
    throw new Error(errorMessage);
  }
}

// Fungsi untuk mendapatkan detail inventaris berdasarkan ID inventaris
export async function getInventarisById(id) {
  try {
    const [data] = await db.select().from(inventaris).where(eq(inventaris.id, id)).limit(1);

    if (!data) {
      return { success: false, error: "Inventaris not found" };
    }

    // Transform manual ke camelCase
    return {
      success: true,
      data: data,
    };
  } catch (error) {
    const errorMessage = translatePostgresError(error);
    throw new Error(errorMessage);
  }
}

// Fungsi untuk menambah inventaris baru
export async function addInventaris(data) {
  try {
    await requireAdmin();
    const [result] = await db.insert(inventaris).values(data).returning();

    revalidatePath(`/inventaris-lab/${data.labId}`);
    return {
      success: true,
      data: result,
    };
  } catch (error) {
    const errorMessage = translatePostgresError(error);
    throw new Error(errorMessage);
  }
}

// Fungsi untuk mengupdate data inventaris
export async function updateInventaris(id, data) {
  try {
    await requireAdmin();
    const [result] = await db.update(inventaris).set(data).where(eq(inventaris.id, id)).returning();

    revalidatePath(`/inventaris-lab/${data.labId}`);
    return {
      success: true,
      data: result,
    };
  } catch (error) {
    const errorMessage = translatePostgresError(error);
    throw new Error(errorMessage);
  }
}

// Fungsi untuk menghapus inventaris
export async function deleteInventaris(id, labId) {
  try {
    await requireAdmin();
    await db.delete(inventaris).where(eq(inventaris.id, id));
    revalidatePath(`/inventaris-lab/${labId}`);
    return { success: true };
  } catch (error) {
    const errorMessage = translatePostgresError(error);
    throw new Error(errorMessage);
  }
}
