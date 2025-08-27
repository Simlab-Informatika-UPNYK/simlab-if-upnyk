"use server";
import { db } from "@/db";
import { kelas_praktikum, kelas_aslab } from "@/db/schema";
import { eq, and, desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { translatePostgresError } from "@/lib/postgres-error-translator";

// Reusable query functions
export async function findAllJadwal() {
  try {
    return await db.query.kelas_praktikum.findMany({
      with: {
        dosenPengampu: { columns: { nama: true } },
        mataKuliah: { columns: { nama: true } },
        lab: { columns: { nama: true } },
        kelasAslab: {
          with: { aslab: { columns: { nama: true } } },
        },
      },
      orderBy: [desc(kelas_praktikum.id)],
    });
  } catch (error) {
    const errorMessage = translatePostgresError(error);
    throw new Error(errorMessage);
  }
}

// Find all jadwal filtered by aslab ID using Drizzle ORM filtering
export async function findAllJadwalByAslab(aslabId) {
  try {
    // First get all kelas_aslab relations for the specified aslab
    const kelasAslabRelations = await db.query.kelas_aslab.findMany({
      where: eq(kelas_aslab.aslab, aslabId),
      columns: { kelas: true },
    });

    // Extract the kelas IDs
    const kelasIds = kelasAslabRelations.map(relation => relation.kelas);

    if (kelasIds.length === 0) {
      return []; // No jadwal found for this aslab
    }

    // Find all jadwal that have matching kelas IDs
    return await db.query.kelas_praktikum.findMany({
      where: (jadwal, { inArray }) => inArray(jadwal.id, kelasIds),
      with: {
        dosenPengampu: { columns: { nama: true } },
        mataKuliah: { columns: { nama: true } },
        lab: { columns: { nama: true } },
        kelasAslab: {
          with: { aslab: { columns: { nama: true } } },
        },
      },
      orderBy: [desc(kelas_praktikum.id)],
    });
  } catch (error) {
    const errorMessage = translatePostgresError(error);
    throw new Error(errorMessage);
  }
}

export async function findOneById(id) {
  try {
    return await db.query.kelas_praktikum.findFirst({
      where: eq(kelas_praktikum.id, id),
      with: {
        dosenPengampu: true,
        mataKuliah: true,
        lab: true,
        kelasAslab: { with: { aslab: true } },
      },
    });
  } catch (error) {
    const errorMessage = translatePostgresError(error);
    throw new Error(errorMessage);
  }
}

export async function checkExists(kelas, mataKuliahId) {
  try {
    const existing = await db.query.kelas_praktikum.findFirst({
      where: and(
        eq(kelas_praktikum.kelas, kelas),
        eq(kelas_praktikum.mata_kuliah, mataKuliahId)
      ),
    });
    return !!existing;
  } catch (error) {
    const errorMessage = translatePostgresError(error);
    throw new Error(errorMessage);
  }
}

// Create operation
export async function createJadwal(formData) {
  try {
    const result = await db.transaction(async (tx) => {
      // Transform form data to match database schema
      const dbData = {
        kelas: formData.kelas,
        mata_kuliah: parseInt(formData.mataKuliahId),
        id_dosen: parseInt(formData.dosenPengampuId),
        jumlah_praktikan: formData.jumlahPraktikan,
        hari: formData.hari,
        waktu: formData.waktu,
        lab: parseInt(formData.labId),
        jenis_praktikan: formData.jenisPraktikan,
        tahun_semester: 1, // TODO: Get current tahun_semester
      };

      const [newJadwal] = await tx
        .insert(kelas_praktikum)
        .values(dbData)
        .returning();

      // Insert related aslab if any
      if (formData.aslabIds?.length) {
        await tx.insert(kelas_aslab).values(
          formData.aslabIds.map((aslabId) => ({
            kelas: newJadwal.id,
            aslab: aslabId,
          }))
        );
      }

      return newJadwal;
    });

    revalidatePath("/jadwal-praktikum");
    return result;
  } catch (error) {
    const errorMessage = translatePostgresError(error);
    throw new Error(errorMessage);
  }
}

// Update operation
export async function updateJadwal(id, formData) {
  try {
    const result = await db.transaction(async (tx) => {
      // Transform form data to match database schema
      const dbData = {
        kelas: formData.kelas,
        mata_kuliah: parseInt(formData.mataKuliahId),
        id_dosen: parseInt(formData.dosenPengampuId),
        jumlah_praktikan: formData.jumlahPraktikan,
        hari: formData.hari,
        waktu: formData.waktu,
        lab: parseInt(formData.labId),
        jenis_praktikan: formData.jenisPraktikan,
        tahun_semester: 1, // TODO: Get current tahun_semester
      };

      // Update main jadwal data
      const [updated] = await tx
        .update(kelas_praktikum)
        .set(dbData)
        .where(eq(kelas_praktikum.id, id))
        .returning();

      // Update aslab relations
      await tx.delete(kelas_aslab).where(eq(kelas_aslab.kelas, id));

      if (formData.aslabIds?.length) {
        await tx.insert(kelas_aslab).values(
          formData.aslabIds.map((aslabId) => ({
            kelas: id,
            aslab: aslabId,
          }))
        );
      }

      return updated;
    });

    revalidatePath("/jadwal-praktikum");
    return result;
  } catch (error) {
    const errorMessage = translatePostgresError(error);
    throw new Error(errorMessage);
  }
}

// Delete operation
export async function deleteJadwal(id) {
  try {
    await db.transaction(async (tx) => {
      await tx.delete(kelas_aslab).where(eq(kelas_aslab.kelas, id));
      await tx.delete(kelas_praktikum).where(eq(kelas_praktikum.id, id));
    });

    revalidatePath("/admin/jadwal-praktikum");
    return { success: true };
  } catch (error) {
    const errorMessage = translatePostgresError(error);
    throw new Error(errorMessage);
  }
}

// New query functions
export async function getMataKuliahOptions() {
  return await db.query.mata_kuliah_praktikum.findMany({
    columns: { id: true, nama: true },
  });
}

export async function getDosenOptions() {
  return await db.query.dosen_pengampu.findMany({
    columns: { id: true, nama: true },
  });
}

export async function getLabOptions() {
  return await db.query.lab.findMany({
    columns: { id: true, nama: true },
  });
}

export async function getAslabOptions() {
  return await db.query.aslab.findMany({
    columns: { id_aslab: true, nama: true, nim: true },
  });
}
