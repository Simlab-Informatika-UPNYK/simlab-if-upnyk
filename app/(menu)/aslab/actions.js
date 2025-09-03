"use server";

import { db } from "@/db";
import { aslab, user } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { translatePostgresError } from "@/lib/postgres-error-translator";
import { auth } from "@/lib/auth";
import { requireAdmin } from "@/lib/admin-auth";

export async function getAslab() {
  try {
    return await db
      .select({
        nama: user.name,
        nim: aslab.nim,
        email: user.email,
        angkatan: aslab.angkatan,
        program_studi: aslab.program_studi,
        status: aslab.status,
        id_aslab: aslab.id_aslab,
      })
      .from(aslab)
      .leftJoin(user, eq(user.aslab_id, aslab.id_aslab));
  } catch (error) {
    const errorMessage = translatePostgresError(error);
    throw new Error(errorMessage);
  }
}

export async function getAslabByNim(nim) {
  try {
    const result = await db
      .select({
        nama: user.name,
        nim: aslab.nim,
        email: user.email,
        angkatan: aslab.angkatan,
        program_studi: aslab.program_studi,
        status: aslab.status,
        id_aslab: aslab.id_aslab,
        no_hp: aslab.no_hp,
      })
      .from(aslab)
      .leftJoin(user, eq(user.aslab_id, aslab.id_aslab))
      .where(eq(aslab.nim, nim))
      .limit(1);

    if (!result[0]) {
      return { error: `Aslab tidak ditemukan` };
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
  await requireAdmin();
  try {
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
          role: "aslab",
          aslab_id: aslabData.id_aslab,
        },
      });
    } catch (authError) {
      // Jika gagal membuat user, hapus data aslab yang baru dibuat
      await db.delete(aslab).where(eq(aslab.id_aslab, aslabData.id_aslab));
      throw new Error(`Gagal membuat user: ${authError.message}`);
    }

    revalidatePath("/aslab");
    return { success: true };
  } catch (error) {
    const errorMessage = translatePostgresError(error);
    throw new Error(errorMessage);
  }
}

export async function updateAslab(id_aslab, data) {
  try {
    await requireAdmin();

    const existingUser = await db.select().from(user).where(eq(user.aslab_id, id_aslab));

    await db.transaction(async (tx) => {
      const { nama, email, ...aslabData } = data;

      if (existingUser.length === 0) {
        const password = aslabData.nim + "aslab";
        await auth.api.signUpEmail({
          body: {
            email: email,
            name: nama,
            password: password,
            username: aslabData.nim,
            role: "aslab",
            aslab_id: id_aslab,
          },
        });
      } else {
        await tx.update(user).set({ name: nama, email: email }).where(eq(user.aslab_id, id_aslab));
      }

      await tx.update(aslab).set(aslabData).where(eq(aslab.id_aslab, id_aslab));
    });
    revalidatePath("/aslab");
    return { success: true };
  } catch (error) {
    const errorMessage = translatePostgresError(error);
    throw new Error(errorMessage);
  }
}

export async function deleteAslab(id) {
  await requireAdmin();
  try {
    const data = await db.delete(aslab).where(eq(aslab.id_aslab, id)).returning();
    revalidatePath("/aslab");
    return { success: true, data };
  } catch (error) {
    const errorMessage = translatePostgresError(error);
    throw new Error(errorMessage);
  }
}
