"use server";
import { db } from "@/db";
import { kelas_praktikum, kelas_aslab, tahun_semester, user } from "@/db/schema";
import { eq, and, desc } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { translatePostgresError } from "@/lib/postgres-error-translator";
import { findAllOrdered } from "../admin/tahun-semester/db-utils";
import { requireAdmin } from "@/lib/admin-auth";
import { getServerSession } from "@/lib/auth-server";

export const getTahunSemester = findAllOrdered;

// Find all jadwal filtered by aslab ID using Drizzle ORM filtering
export async function findAllJadwalByAslab(aslabId) {
  const user = (await getServerSession()).user;
  if (user.role === "aslab" && user.aslab_id !== aslabId) {
    throw new Error("Unauthorized");
  }
  try {
    const kelasAslabRelations = await db.query.kelas_aslab.findMany({
      where: eq(kelas_aslab.aslab, aslabId),
      columns: { kelas: true },
    });

    // Extract the kelas IDs
    const kelasIds = kelasAslabRelations.map((relation) => relation.kelas);

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
          with: { aslab: { columns: { nama: true, nim: true } } },
        },
      },
      orderBy: [desc(kelas_praktikum.id)],
    });
  } catch (error) {
    const errorMessage = translatePostgresError(error);
    throw new Error(errorMessage);
  }
}

// Find all jadwal filtered by tahun semester
export async function findAllJadwalByTahunSemester(tahunSemesterId) {
  await requireAdmin();
  try {
    return await db.query.kelas_praktikum.findMany({
      where: eq(kelas_praktikum.tahun_semester, tahunSemesterId),
      with: {
        dosenPengampu: { columns: { nama: true } },
        mataKuliah: { columns: { nama: true } },
        lab: { columns: { nama: true } },
        kelasAslab: {
          with: {
            aslab: {
              with: { user: { columns: { name: true } } },
              columns: { nama: true, nim: true },
            },
          },
        },
        tahunSemester: true,
      },
      orderBy: [desc(kelas_praktikum.id)],
    });
  } catch (error) {
    const errorMessage = translatePostgresError(error);
    throw new Error(errorMessage);
  }
}

// Find jadwal by aslab ID and tahun semester
export async function findAllJadwalByAslabAndTahunSemester(aslabId, tahunSemesterId) {
  const user = (await getServerSession()).user;
  if (user.role === "aslab" && user.aslab_id !== aslabId) {
    throw new Error("Unauthorized");
  }
  try {
    // First get all kelas_aslab relations for the specified aslab
    const kelasAslabRelations = await db.query.kelas_aslab.findMany({
      where: eq(kelas_aslab.aslab, aslabId),
      columns: { kelas: true },
    });

    // Extract the kelas IDs
    const kelasIds = kelasAslabRelations.map((relation) => relation.kelas);

    if (kelasIds.length === 0) {
      return []; // No jadwal found for this aslab
    }

    // Find all jadwal that have matching kelas IDs and tahun semester
    return await db.query.kelas_praktikum.findMany({
      where: (jadwal, { inArray, eq }) => and(inArray(jadwal.id, kelasIds), eq(jadwal.tahun_semester, tahunSemesterId)),
      with: {
        dosenPengampu: { columns: { nama: true } },
        mataKuliah: { columns: { nama: true } },
        lab: { columns: { nama: true } },
        kelasAslab: {
          with: {
            aslab: {
              with: { user: { columns: { name: true } } },
              columns: { nim: true },
            },
          },
        },
        tahunSemester: true,
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
        kelasAslab: {
          with: { aslab: { with: { user: { columns: { name: true } } }, columns: { nim: true, id_aslab: true } } },
        },
        tahunSemester: true,
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
      where: and(eq(kelas_praktikum.kelas, kelas), eq(kelas_praktikum.mata_kuliah, mataKuliahId)),
    });
    return !!existing;
  } catch (error) {
    const errorMessage = translatePostgresError(error);
    throw new Error(errorMessage);
  }
}

export async function createJadwal(formData) {
  const user = (await getServerSession()).user;
  if (user.role === "aslab" && !formData.aslabIds?.includes(user.aslab_id)) {
    throw new Error("Unauthorized");
  }

  try {
    const result = await db.transaction(async (tx) => {
      const dbData = {
        kelas: formData.kelas,
        mata_kuliah: parseInt(formData.mataKuliahId),
        id_dosen: parseInt(formData.dosenPengampuId),
        jumlah_praktikan: formData.jumlahPraktikan,
        hari: formData.hari,
        waktu: formData.waktu,
        lab: parseInt(formData.labId),
        jenis_praktikan: formData.jenisPraktikan,
        tahun_semester: parseInt(formData.tahunSemesterId),
      };

      const [newJadwal] = await tx.insert(kelas_praktikum).values(dbData).returning();

      // Insert related aslab if any
      if (formData.aslabIds?.length) {
        await tx.insert(kelas_aslab).values(
          formData.aslabIds.map((aslabId) => ({
            kelas: newJadwal.id,
            aslab: parseInt(aslabId),
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
  const user = (await getServerSession()).user;
  if (user.role === "aslab" && !formData.aslabIds?.includes(user.aslab_id)) {
    throw new Error("Unauthorized");
  }

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
        tahun_semester: parseInt(formData.tahunSemesterId),
      };

      // Update main jadwal data
      const [updated] = await tx.update(kelas_praktikum).set(dbData).where(eq(kelas_praktikum.id, id)).returning();

      // Update aslab relations
      await tx.delete(kelas_aslab).where(eq(kelas_aslab.kelas, id));

      if (formData.aslabIds?.length) {
        await tx.insert(kelas_aslab).values(
          formData.aslabIds.map((aslabId) => ({
            kelas: id,
            aslab: parseInt(aslabId),
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
export async function deleteJadwal(id, asisten) {
  const user = (await getServerSession()).user;
  if (user.role === "aslab" && !asisten.includes(user.username)) {
    throw new Error("Unauthorized");
  }

  try {
    await db.transaction(async (tx) => {
      await tx.delete(kelas_aslab).where(eq(kelas_aslab.kelas, id));
      await tx.delete(kelas_praktikum).where(eq(kelas_praktikum.id, id));
    });

    revalidatePath("/jadwal-praktikum");
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
  const result = await db.query.aslab.findMany({
    with: {
      user: { columns: { name: true } },
    },
    columns: { id_aslab: true, nim: true },
  });

  return result.map((r) => ({
    id_aslab: r.id_aslab,
    nim: r.nim,
    nama: r.user?.name,
  }));
}

export async function getTahunSemesterOptions() {
  return await db.query.tahun_semester.findMany({
    columns: { id: true, semester: true, tahun_ajaran: true },
    orderBy: [desc(tahun_semester.id)],
  });
}
