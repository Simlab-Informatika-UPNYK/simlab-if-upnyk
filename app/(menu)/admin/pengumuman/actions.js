"use server";

import { db } from "@/db";
import { pengumuman } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { requireAdmin } from "@/lib/admin-auth";
import { translatePostgresError } from "@/lib/postgres-error-translator";
import { getServerSession } from "@/lib/auth-server";

export async function getPengumuman() {
  try {
    const data = await db
      .select()
      .from(pengumuman)
      .orderBy(desc(pengumuman.created_at));

    return data;
  } catch (error) {
    const errorMessage = translatePostgresError(error);
    throw new Error(errorMessage);
  }
}

export async function getPengumumanById(id) {
  try {
    const result = await db
      .select()
      .from(pengumuman)
      .where(eq(pengumuman.id, id))
      .limit(1);

    return result[0] || null;
  } catch (error) {
    const errorMessage = translatePostgresError(error);
    throw new Error(errorMessage);
  }
}

export async function createPengumuman(data) {
  try {
    await requireAdmin();
    const session = await getServerSession();
    const userId = session?.user?.id;

    return await db.insert(pengumuman).values({
      ...data,
      created_by: userId
    }).returning();
  } catch (error) {
    const errorMessage = translatePostgresError(error);
    throw new Error(errorMessage);
  }
}

export async function updatePengumuman(id, data) {
  try {
    await requireAdmin();

    return await db.update(pengumuman)
      .set(data)
      .where(eq(pengumuman.id, id))
      .returning();
  } catch (error) {
    const errorMessage = translatePostgresError(error);
    throw new Error(errorMessage);
  }
}

export async function deletePengumuman(id) {
  try {
    await requireAdmin();
    return await db.delete(pengumuman)
      .where(eq(pengumuman.id, id))
      .returning();
  } catch (error) {
    const errorMessage = translatePostgresError(error);
    throw new Error(errorMessage);
  }
}

export async function togglePengumumanStatus(id, active) {
  try {
    await requireAdmin();
    return await db.update(pengumuman)
      .set({ active })
      .where(eq(pengumuman.id, id))
      .returning();
  } catch (error) {
    const errorMessage = translatePostgresError(error);
    throw new Error(errorMessage);
  }
}
