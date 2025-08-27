"use server";

import slugify from "react-slugify";
import { db } from "@/db/index";
import { user as userTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { requireAdmin } from "@/lib/admin-auth";

export async function getAllUsers() {
  try {
    const data = await db.select({
      id: userTable.id,
      nama: userTable.name,
      role: userTable.role,
      email: userTable.email,
      slug: userTable.username, // as slug
      created_at: userTable.createdAt,
    }).from(userTable);
    return data;
  } catch (error) {
    console.error("Error in getAllUsers function:", error);
    return [];
  }
}

export async function getOneUser(slug) {
  try {
    const data = await db.select({
      id: userTable.id,
      nama: userTable.name,
      role: userTable.role,
      email: userTable.email,
      slug: userTable.username, // as slug
      created_at: userTable.createdAt,
    })
      .from(userTable)
      .where(eq(userTable.username, slug));
    if (!data || data.length === 0) return null;
    return data[0];
  } catch (error) {
    console.error("Error in getOneUser function:", error);
    return null;
  }
}

export async function createUser(data) {
  try {
    await requireAdmin();
    const userData = {
      id: crypto.randomUUID(),
      name: data.nama,
      role: data.role,
      email: data.email,
      username: slugify(data.nama),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const inserted = await db.insert(userTable).values(userData).returning();
    return { success: true, data: inserted };
  } catch (error) {
    console.error("Error in createUser function:", error);
    return { success: false, error: error.message };
  }
}

export async function editUser(id, data) {
  try {
    await requireAdmin();
    const userData = {
      name: data.nama,
      email: data.email,
      role: data.role,
      username: slugify(data.nama),
      updatedAt: new Date(),
    };
    const updated = await db.update(userTable)
      .set(userData)
      .where(eq(userTable.id, id))
      .returning();
    return { success: true, data: updated };
  } catch (error) {
    console.error("Error in editUser function:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteUser(id) {
  try {
    await requireAdmin();
    const deleted = await db.delete(userTable)
      .where(eq(userTable.id, id))
      .returning();
    return { success: true, data: deleted };
  } catch (error) {
    console.error("Error in deleteUser function:", error);
    return { success: false, error: error.message };
  }
}
