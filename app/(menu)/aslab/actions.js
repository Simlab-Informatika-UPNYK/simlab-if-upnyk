"use server";

import { db } from "@/db";
import { aslab } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { translatePostgresError } from "@/lib/postgres-error-translator";

export async function getAslab() {
  try {
    return await db.select().from(aslab);
  } catch (error) {
    const errorMessage = translatePostgresError(error);
    throw new Error(errorMessage);
  }
}

export async function getAslabById(nim) {
  try {
    const result = await db
      .select()
      .from(aslab)
      .where(eq(aslab.nim, nim))
      .limit(1);
      
    if (!result[0]) {
      return { error: `Aslab with NIM ${nim} not found` };
    }
    return result[0];
  } catch (error) {
    const errorMessage = translatePostgresError(error);
    throw new Error(errorMessage);
  }
}

export async function getAslabIds() {
  try {
    const result = await db.select({ nim: aslab.nim }).from(aslab);
    return result.map((item) => item.nim);
  } catch (error) {
    const errorMessage = translatePostgresError(error);
    throw new Error(errorMessage);
  }
}

export async function createAslab(data) {
  try {
    await db.insert(aslab).values(data);
    revalidatePath("/aslab");
    return { success: true };
  } catch (error) {
    const errorMessage = translatePostgresError(error);
    throw new Error(errorMessage);
  }
}

export async function updateAslab(id, data) {
  try {
    await db.update(aslab).set(data).where(eq(aslab.id_aslab, id));
    revalidatePath("/aslab");
    return { success: true };
  } catch (error) {
    const errorMessage = translatePostgresError(error);
    throw new Error(errorMessage);
  }
}

export async function deleteAslab(id) {
  try {
    const data = await db.delete(aslab).where(eq(aslab.id_aslab, id)).returning();
    revalidatePath("/aslab");
    return { success: true, data };
  } catch (error) {
    const errorMessage = translatePostgresError(error);
    throw new Error(errorMessage);
  }
}
