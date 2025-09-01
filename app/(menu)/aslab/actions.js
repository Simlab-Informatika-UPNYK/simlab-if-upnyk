'use server';

import { db } from '@/db';
import { aslab } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { translatePostgresError } from '@/lib/postgres-error-translator';
import { auth } from '@/lib/auth';

export async function getAslab() {
  try {
    return await db.select().from(aslab);
  } catch (error) {
    const errorMessage = translatePostgresError(error);
    throw new Error(errorMessage);
  }
}

export async function getAslabByNim(nim) {
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
    // Insert data aslab ke database
    const insertedAslab = await db.insert(aslab).values(data).returning();
    const aslabData = insertedAslab[0];

    // Buat user untuk aslab dengan password NIM + "aslab"
    const password = `${data.nim}aslab`;
    const email = data.email || `${data.nim}@student.upnyk.ac.id`;

    try {
      await auth.api.signUpEmail({
        body: {
          email: email,
          name: data.nama,
          password: password,
          username: data.nim,
          role: 'aslab',
          aslab_id: aslabData.id_aslab,
        },
      });
    } catch (authError) {
      // Jika gagal membuat user, hapus data aslab yang baru dibuat
      await db.delete(aslab).where(eq(aslab.id_aslab, aslabData.id_aslab));
      throw new Error(`Gagal membuat user: ${authError.message}`);
    }

    revalidatePath('/aslab');
    return { success: true };
  } catch (error) {
    const errorMessage = translatePostgresError(error);
    throw new Error(errorMessage);
  }
}

export async function updateAslab(id, data) {
  try {
    await db.update(aslab).set(data).where(eq(aslab.id_aslab, id));
    revalidatePath('/aslab');
    return { success: true };
  } catch (error) {
    const errorMessage = translatePostgresError(error);
    throw new Error(errorMessage);
  }
}

export async function deleteAslab(id) {
  try {
    const data = await db
      .delete(aslab)
      .where(eq(aslab.id_aslab, id))
      .returning();
    revalidatePath('/aslab');
    return { success: true, data };
  } catch (error) {
    const errorMessage = translatePostgresError(error);
    throw new Error(errorMessage);
  }
}
