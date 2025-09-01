'use server';

import slugify from 'react-slugify';
import { db } from '@/db/index';
import { user as userTable } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { requireAdmin } from '@/lib/admin-auth';
import { translatePostgresError } from '@/lib/postgres-error-translator';
import { auth } from '@/lib/auth';

export async function getAllUsers() {
  try {
    const data = await db
      .select({
        id: userTable.id,
        nama: userTable.name,
        role: userTable.role,
        email: userTable.email,
        slug: userTable.username, // as slug
        created_at: userTable.createdAt,
      })
      .from(userTable);
    return data;
  } catch (error) {
    const errorMessage = translatePostgresError(error);
    throw new Error(errorMessage);
  }
}

export async function getOneUser(slug) {
  try {
    const data = await db
      .select({
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
    const errorMessage = translatePostgresError(error);
    throw new Error(errorMessage);
  }
}

export async function createUser(data) {
  try {
    await requireAdmin();
    const authResult = await auth.api.signUpEmail({
      body: {
        name: data.nama,
        email: data.email,
        password: data.password,
        username: data.nama,
        role: data.role,
      },
    });

    if (authResult.error) {
      throw new Error(authResult.error.message || 'Gagal membuat user');
    }

    return { success: true, data: authResult.data };
  } catch (error) {
    const errorMessage = translatePostgresError(error);
    throw new Error(errorMessage);
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
    const updated = await db
      .update(userTable)
      .set(userData)
      .where(eq(userTable.id, id))
      .returning();
    return { success: true, data: updated };
  } catch (error) {
    const errorMessage = translatePostgresError(error);
    throw new Error(errorMessage);
  }
}

export async function deleteUser(id) {
  try {
    await requireAdmin();
    const deleted = await db
      .delete(userTable)
      .where(eq(userTable.id, id))
      .returning();
    return { success: true, data: deleted };
  } catch (error) {
    const errorMessage = translatePostgresError(error);
    throw new Error(errorMessage);
  }
}
