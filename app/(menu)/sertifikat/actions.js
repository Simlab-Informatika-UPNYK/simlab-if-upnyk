"use server";

import { db } from "@/db";
import {
  permintaan_sertifikat,
  aslab,
  kelas_aslab,
  kelas_praktikum,
  mata_kuliah_praktikum,
  tahun_semester,
  user,
} from "@/db/schema";
import { eq, desc, and } from "drizzle-orm";
import { translatePostgresError } from "@/lib/postgres-error-translator";
import { requireAdmin } from "@/lib/admin-auth";
import { getServerSession } from "@/lib/auth-server";

export const getAllAslabWithCourses = async () => {
  await requireAdmin();
  try {
    const result = await db
      .select({
        id_aslab: aslab.id_aslab,
        nama: user.name,
        nim: aslab.nim,
        email: user.email,
        no_hp: aslab.no_hp,
        angkatan: aslab.angkatan,
        program_studi: aslab.program_studi,
        status: aslab.status,
        kelas_aslab: kelas_aslab,
        kelas_praktikum: kelas_praktikum,
        mata_kuliah: mata_kuliah_praktikum,
        tahun_semester: tahun_semester,
      })
      .from(aslab)
      .leftJoin(kelas_aslab, eq(aslab.id_aslab, kelas_aslab.aslab))
      .leftJoin(user, eq(user.aslab_id, aslab.id_aslab))
      .leftJoin(kelas_praktikum, eq(kelas_aslab.kelas, kelas_praktikum.id))
      .leftJoin(mata_kuliah_praktikum, eq(kelas_praktikum.mata_kuliah, mata_kuliah_praktikum.id))
      .leftJoin(tahun_semester, eq(kelas_praktikum.tahun_semester, tahun_semester.id))
      .orderBy(aslab.nim);

    // Group by aslab and process courses
    const aslabMap = new Map();

    result.forEach((item) => {
      if (!aslabMap.has(item.id_aslab)) {
        aslabMap.set(item.id_aslab, {
          id: item.id_aslab.toString(),
          nama: item.nama,
          nim: item.nim,
          email: item.email,
          no_hp: item.no_hp,
          angkatan: item.angkatan,
          program_studi: item.program_studi,
          status: item.status,
          courses: [],
          total_courses: 0,
        });
      }

      if (item.mata_kuliah && item.tahun_semester) {
        const aslabData = aslabMap.get(item.id_aslab);
        aslabData.courses.push({
          mata_kuliah: item.mata_kuliah.nama,
          kelas: item.kelas_praktikum.kelas,
          semester: `${item.tahun_semester.semester} ${item.tahun_semester.tahun_ajaran}`,
        });
        aslabData.total_courses = aslabData.courses.length;
      }
    });

    return Array.from(aslabMap.values());
  } catch (error) {
    const errorMessage = translatePostgresError(error);
    throw new Error(errorMessage);
  }
};

export async function findOneByNim(nim) {
  const result = await db
    .select()
    .from(permintaan_sertifikat)
    .innerJoin(aslab, eq(permintaan_sertifikat.id_aslab, aslab.id_aslab))
    .where(eq(aslab.nim, nim))
    .limit(1);

  return result[0] || null;
}

export async function findAllOrdered() {
  await requireAdmin();
  const result = await db
    .select({
      id: permintaan_sertifikat.id,
      waktu_pengajuan: permintaan_sertifikat.waktu_pengajuan,
      status: permintaan_sertifikat.status,
      keterangan: permintaan_sertifikat.keterangan,
      aslab: {
        id_aslab: aslab.id_aslab,
        nama: user.name,
        nim: aslab.nim,
      },
    })
    .from(permintaan_sertifikat)
    .innerJoin(aslab, eq(permintaan_sertifikat.id_aslab, aslab.id_aslab))
    .innerJoin(user, eq(user.aslab_id, aslab.id_aslab))
    .orderBy(desc(permintaan_sertifikat.waktu_pengajuan));

  return result.map((item) => ({
    id: item.id.toString(),
    nim: item.aslab.nim,
    nama_asisten: item.aslab.nama,
    tanggal_pengajuan: item.waktu_pengajuan
      ? new Date(item.waktu_pengajuan).toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      : "-",
    status: item.status ? item.status.charAt(0).toUpperCase() + item.status.slice(1) : "Pending",
  }));
}

export async function checkExists(nim) {
  await requireAdmin();
  const result = await findOneByNim(nim);
  return result !== null;
}

export const getAllCertificateRequests = findAllOrdered;

export const checkCertificateRequestExists = checkExists;

export const getCertificateRequestByNim = async (nim) => {
  await requireAdmin();
  try {
    const result = await db
      .select({
        id: permintaan_sertifikat.id,
        waktu_pengajuan: permintaan_sertifikat.waktu_pengajuan,
        status: permintaan_sertifikat.status,
        keterangan: permintaan_sertifikat.keterangan,
        nama_mahasiswa: user.name,
        nim: aslab.nim,
        program_studi: aslab.program_studi,
        kelas_aslab: kelas_aslab,
        kelas_praktikum: kelas_praktikum,
        mata_kuliah: mata_kuliah_praktikum,
        tahun_semester: tahun_semester,
      })
      .from(permintaan_sertifikat)
      .innerJoin(aslab, eq(permintaan_sertifikat.id_aslab, aslab.id_aslab))
      .leftJoin(kelas_aslab, eq(aslab.id_aslab, kelas_aslab.aslab))
      .leftJoin(user, eq(user.aslab_id, aslab.id_aslab))
      .leftJoin(kelas_praktikum, eq(kelas_aslab.kelas, kelas_praktikum.id))
      .leftJoin(mata_kuliah_praktikum, eq(kelas_praktikum.mata_kuliah, mata_kuliah_praktikum.id))
      .leftJoin(tahun_semester, eq(kelas_praktikum.tahun_semester, tahun_semester.id))
      .where(eq(aslab.nim, nim))
      .limit(1);

    if (!result || result.length === 0) {
      return null;
    }

    const data = result[0];

    // Process tahun_ajaran from multiple kelas_aslab records
    const allSemesters = result
      .filter((item) => item.tahun_semester)
      .map((item) => ({
        semester: item.tahun_semester.semester,
        tahun_ajaran: item.tahun_semester.tahun_ajaran,
      }));

    // Remove duplicates
    const uniqueSemesters = Array.from(new Set(allSemesters.map((s) => JSON.stringify(s)))).map((s) => JSON.parse(s));

    // Sort by academic year and semester
    uniqueSemesters.sort((a, b) => {
      const yearA = parseInt(a.tahun_ajaran.split("/")[0]);
      const yearB = parseInt(b.tahun_ajaran.split("/")[0]);

      if (yearA !== yearB) return yearA - yearB;
      return a.semester === "Gasal" ? -1 : 1;
    });

    const earliest = uniqueSemesters[0];
    const latest = uniqueSemesters[uniqueSemesters.length - 1];

    let tahun_ajaran_formatted = "";
    if (earliest && latest) {
      if (earliest.tahun_ajaran === latest.tahun_ajaran) {
        if (earliest.semester === latest.semester) {
          tahun_ajaran_formatted = `${earliest.semester} ${earliest.tahun_ajaran}`;
        } else {
          tahun_ajaran_formatted = `${earliest.semester} - ${latest.semester} ${earliest.tahun_ajaran}`;
        }
      } else {
        tahun_ajaran_formatted = `${earliest.semester} ${earliest.tahun_ajaran} s.d. ${latest.semester} ${latest.tahun_ajaran}`;
      }
    }

    // Get unique mata kuliah
    const uniqueMataKuliah = Array.from(
      new Map(
        result
          .filter((item) => item.mata_kuliah && item.tahun_semester)
          .map((item) => [
            item.mata_kuliah.id,
            {
              nama: item.mata_kuliah.nama,
              tahun_ajaran: `${item.tahun_semester.semester} ${item.tahun_semester.tahun_ajaran}`,
            },
          ])
      ).values()
    );

    return {
      id: data.id,
      waktu_pengajuan: data.waktu_pengajuan,
      status: data.status ? data.status.charAt(0).toUpperCase() + data.status.slice(1) : "Pending",
      keterangan: data.keterangan,
      nama_mahasiswa: data.nama_mahasiswa,
      nim: data.nim,
      program_studi: data.program_studi,
      tahun_ajaran: tahun_ajaran_formatted,
      mata_kuliah_praktikum: uniqueMataKuliah,
    };
  } catch (error) {
    const errorMessage = translatePostgresError(error);
    throw new Error(errorMessage);
  }
};

export const approveCertificateRequest = async (requestId) => {
  await requireAdmin();
  try {
    const result = await db.transaction(async (tx) => {
      return await tx
        .update(permintaan_sertifikat)
        .set({
          status: "Disetujui",
          keterangan: null,
          updated_at: new Date(),
        })
        .where(eq(permintaan_sertifikat.id, requestId))
        .returning();
    });

    return { success: true, data: result[0] };
  } catch (error) {
    const errorMessage = translatePostgresError(error);
    throw new Error(errorMessage);
  }
};

export const rejectCertificateRequest = async (requestId, reason) => {
  await requireAdmin();
  try {
    const result = await db.transaction(async (tx) => {
      return await tx
        .update(permintaan_sertifikat)
        .set({
          status: "Ditolak",
          keterangan: reason,
          updated_at: new Date(),
        })
        .where(eq(permintaan_sertifikat.id, requestId))
        .returning();
    });

    return { success: true, data: result[0] };
  } catch (error) {
    const errorMessage = translatePostgresError(error);
    throw new Error(errorMessage);
  }
};

export const cancelCertificateStatus = async (requestId) => {
  await requireAdmin();
  try {
    const result = await db.transaction(async (tx) => {
      return await tx
        .update(permintaan_sertifikat)
        .set({
          status: "pending",
          keterangan: null,
          updated_at: new Date(),
        })
        .where(eq(permintaan_sertifikat.id, requestId))
        .returning();
    });

    return { success: true, data: result[0] };
  } catch (error) {
    const errorMessage = translatePostgresError(error);
    throw new Error(errorMessage);
  }
};

export const getAslabDetailByNim = async (nim) => {
  const user = (await getServerSession()).user;
  if (user.role === "aslab" && user.username !== nim) {
    throw new Error("Unauthorized");
  }

  const result = await db.query.aslab.findFirst({
    columns: {
      id_aslab: true,
      nim: true,
      no_hp: true,
      angkatan: true,
      program_studi: true,
      status: true,
    },
    with: {
      user: {
        columns: {
          name: true,
          email: true,
        },
      },
      kelasAslab: {
        with: {
          kelasPraktikum: {
            with: {
              mataKuliah: {
                columns: {
                  nama: true,
                },
              },
              tahunSemester: {
                columns: {
                  semester: true,
                  tahun_ajaran: true,
                  slug: true,
                },
              },
            },
            columns: {
              kelas: true,
            },
          },
        },
      },
    },
    where: eq(aslab.nim, nim),
  });

  const aslabData = {
    id: result.id_aslab.toString(),
    nama: result.user.name,
    nim: result.nim,
    email: result.user.email,
    no_hp: result.no_hp,
    angkatan: result.angkatan,
    program_studi: result.program_studi,
    status: result.status,
    courses: result.kelasAslab
      .map((kelas) => ({
        mata_kuliah: kelas.kelasPraktikum.mataKuliah.nama,
        kelas: kelas.kelasPraktikum.kelas,
        semester: `${kelas.kelasPraktikum.tahunSemester.semester} ${kelas.kelasPraktikum.tahunSemester.tahun_ajaran}`,
        slug: kelas.kelasPraktikum.tahunSemester.slug,
      }))
      .sort((a, b) => a.slug.localeCompare(b.slug)), // Sort by tahunSemester.slug
  };

  return aslabData;
  // } catch (error) {
  //   const errorMessage = translatePostgresError(error);
  //   throw new Error(errorMessage);
  // }
};

export const getAllAslab = async () => {
  try {
    const result = await db
      .select({
        id_aslab: aslab.id_aslab,
        nama: user.name,
        nim: aslab.nim,
        email: user.email,
        no_hp: aslab.no_hp,
        angkatan: aslab.angkatan,
        program_studi: aslab.program_studi,
        status: aslab.status,
        kelas_aslab: kelas_aslab,
        kelas_praktikum: kelas_praktikum,
        mata_kuliah: mata_kuliah_praktikum,
        tahun_semester: tahun_semester,
      })
      .from(aslab)
      .leftJoin(user, eq(user.aslab_id, aslab.id_aslab))
      .leftJoin(kelas_aslab, eq(aslab.id_aslab, kelas_aslab.aslab))
      .leftJoin(kelas_praktikum, eq(kelas_aslab.kelas, kelas_praktikum.id))
      .leftJoin(mata_kuliah_praktikum, eq(kelas_praktikum.mata_kuliah, mata_kuliah_praktikum.id))
      .leftJoin(tahun_semester, eq(kelas_praktikum.tahun_semester, tahun_semester.id));

    // Group by aslab and process courses
    const aslabMap = new Map();

    result.forEach((item) => {
      if (!aslabMap.has(item.id_aslab)) {
        aslabMap.set(item.id_aslab, {
          ...item,
          courses: [],
        });
      }

      if (item.mata_kuliah && item.tahun_semester) {
        const aslabData = aslabMap.get(item.id_aslab);
        aslabData.courses.push({
          subject: item.mata_kuliah.nama,
          year: `${item.tahun_semester.semester} ${item.tahun_semester.tahun_ajaran}`,
        });
      }
    });

    return Array.from(aslabMap.values()).map((aslab) => ({
      ...aslab,
      courses: aslab.courses.map((course, index) => ({
        no: index + 1,
        ...course,
      })),
    }));
  } catch (error) {
    const errorMessage = translatePostgresError(error);
    throw new Error(errorMessage);
  }
};

export const createCertificateRequest = async (aslabId) => {
  const user = (await getServerSession()).user;
  if (user.role === "aslab" && user.aslab_id !== aslabId) {
    throw new Error("Unauthorized");
  }

  try {
    const existingRequest = await db
      .select()
      .from(permintaan_sertifikat)
      .where(and(eq(permintaan_sertifikat.id_aslab, aslabId), eq(permintaan_sertifikat.status, "pending")))
      .limit(1);

    if (existingRequest.length > 0) {
      throw new Error("Anda sudah memiliki permintaan sertifikat yang sedang diproses");
    }

    const result = await db.transaction(async (tx) => {
      return await tx
        .insert(permintaan_sertifikat)
        .values({
          id_aslab: aslabId,
          waktu_pengajuan: new Date(),
          status: "pending",
          created_at: new Date(),
          updated_at: new Date(),
        })
        .returning();
    });

    return { success: true, data: result[0] };
  } catch (error) {
    const errorMessage = translatePostgresError(error);
    throw new Error(errorMessage);
  }
};

export const getCertificateRequestsByAslab = async (aslabId) => {
  const user = (await getServerSession()).user;
  if (user.role === "aslab" && user.aslab_id !== aslabId) {
    throw new Error("Unauthorized: Admin access required");
  }

  // try {
  // const result = await db
  //   .select({
  //     id: permintaan_sertifikat.id,
  //     waktu_pengajuan: permintaan_sertifikat.waktu_pengajuan,
  //     status: permintaan_sertifikat.status,
  //     keterangan: permintaan_sertifikat.keterangan,
  //     // nama: user.name,
  //     nim: aslab.nim,
  //   })
  //   .from(permintaan_sertifikat)
  //   .innerJoin(aslab, eq(permintaan_sertifikat.id_aslab, aslab.id_aslab))
  //   .innerJoin(user, eq(user.aslab_id, permintaan_sertifikat.id_aslab))
  //   .where(eq(permintaan_sertifikat.id_aslab, aslabId));
  // .orderBy(desc(permintaan_sertifikat.waktu_pengajuan));
  const result = await db.query.permintaan_sertifikat.findMany({
    columns: {
      id: true,
      waktu_pengajuan: true,
      status: true,
      keterangan: true,
    },
    with: {
      aslab: {
        columns: { nim: true },
        with: {
          user: { columns: { name: true } },
        },
      },
    },
    where: eq(permintaan_sertifikat.id_aslab, aslabId),
  });

  return result.map((item) => ({
    id: item.id.toString(),
    nim: item.aslab.nim,
    nama_asisten: item.aslab.user.name,
    tanggal_pengajuan: item.waktu_pengajuan
      ? new Date(item.waktu_pengajuan).toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      : "-",
    status: item.status ? item.status.charAt(0).toUpperCase() + item.status.slice(1) : "Pending",
    keterangan: item.keterangan,
  }));
  // } catch (error) {
  //   const errorMessage = translatePostgresError(error);
  //   throw new Error(errorMessage);
  // }
};

export const updateCertificateStatus = async (requestId, status, keterangan = null) => {
  await requireAdmin();
  try {
    const validStatuses = ["Pending", "Disetujui", "Ditolak"];
    if (!validStatuses.includes(status)) {
      throw new Error("Status tidak valid. Status yang diperbolehkan: Pending, Disetujui, Ditolak");
    }

    // Validasi keterangan wajib untuk status Ditolak
    if (status === "Ditolak" && !keterangan) {
      throw new Error("Keterangan wajib diisi untuk status Ditolak");
    }

    const result = await db.transaction(async (tx) => {
      return await tx
        .update(permintaan_sertifikat)
        .set({
          status: status,
          keterangan: keterangan,
          updated_at: new Date(),
        })
        .where(eq(permintaan_sertifikat.id, requestId))
        .returning();
    });

    if (result.length === 0) {
      throw new Error("Permintaan sertifikat tidak ditemukan");
    }

    return { success: true, data: result[0] };
  } catch (error) {
    const errorMessage = translatePostgresError(error);
    throw new Error(errorMessage);
  }
};
