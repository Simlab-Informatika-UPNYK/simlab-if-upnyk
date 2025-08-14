"use server";

import { db } from "@/db";
import { aslab } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getAslab() {
  return await db.select().from(aslab);
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
    console.error("Error fetching aslab:", error);
    return { error: "Database error occurred while fetching aslab" };
  }
}

export async function getAslabIds() {
  try {
    const result = await db.select({ nim: aslab.nim }).from(aslab);
    return result.map((item) => item.nim);
  } catch (error) {
    console.error("Error fetching aslab IDs:", error);
    return [];
  }
}

export async function createAslab(data) {
  try {
    await db.insert(aslab).values(data);
    revalidatePath("/aslab");
    return { success: true };
  } catch (error) {
    console.error("Error creating aslab:", error);
    return { error: error.message };
  }
}

export async function updateAslab(id, data) {
  try {
    await db.update(aslab).set(data).where(eq(aslab.id_aslab, id));
    revalidatePath("/aslab");
    return { success: true };
  } catch (error) {
    console.error("Error updating aslab:", error);
    return { error: error.message };
  }
}

export async function deleteAslab(id) {
  try {
    const data = await db.delete(aslab).where(eq(aslab.id_aslab, id)).returning();
    revalidatePath("/aslab");
    return { success: true, data };
  } catch (error) {
    console.error("Error deleting aslab:", error);
    return { error: error.message };
  }
}
