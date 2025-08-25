"use server";

import { db } from "@/db";
import { permintaan_sertifikat, aslab, kelas_aslab, kelas_praktikum, mata_kuliah_praktikum, tahun_semester } from "@/db/schema";
import { eq, desc, and } from "drizzle-orm";
import { 
  findAllOrdered,
  checkExists
} from "./db-utils";

export const getAllAslabWithCourses = async () => {
  try {
    const result = await db
      .select({
        id_aslab: aslab.id_aslab,
        nama: aslab.nama,
        nim: aslab.nim,
        email: aslab.email,
        no_hp: aslab.no_hp,
        angkatan: aslab.angkatan,
        program_studi: aslab.program_studi,
        status: aslab.status,
        kelas_aslab: kelas_aslab,
        kelas_praktikum: kelas_praktikum,
        mata_kuliah: mata_kuliah_praktikum,
        tahun_semester: tahun_semester
      })
      .from(aslab)
      .leftJoin(kelas_aslab, eq(aslab.id_aslab, kelas_aslab.aslab))
      .leftJoin(kelas_praktikum, eq(kelas_aslab.kelas, kelas_praktikum.id))
      .leftJoin(mata_kuliah_praktikum, eq(kelas_praktikum.mata_kuliah, mata_kuliah_praktikum.id))
      .leftJoin(tahun_semester, eq(kelas_praktikum.tahun_semester, tahun_semester.id))
      .orderBy(aslab.nama);

    // Group by aslab and process courses
    const aslabMap = new Map();
    
    result.forEach(item => {
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
          total_courses: 0
        });
      }
      
      if (item.mata_kuliah && item.tahun_semester) {
        const aslabData = aslabMap.get(item.id_aslab);
        aslabData.courses.push({
          mata_kuliah: item.mata_kuliah.nama,
          kelas: item.kelas_praktikum.kelas,
          semester: `${item.tahun_semester.semester} ${item.tahun_semester.tahun_ajaran}`
        });
        aslabData.total_courses = aslabData.courses.length;
      }
    });

    return Array.from(aslabMap.values());
  } catch (error) {
    console.error("Error fetching aslab data:", error);
    return [];
  }
};

export const getAllCertificateRequests = findAllOrdered;

export const checkCertificateRequestExists = checkExists;

export async function getCertificateRequestByNim(nim) {
  try {
    const result = await db
      .select({
        id: permintaan_sertifikat.id,
        waktu_pengajuan: permintaan_sertifikat.waktu_pengajuan,
        status: permintaan_sertifikat.status,
        keterangan: permintaan_sertifikat.keterangan,
        nama_mahasiswa: aslab.nama,
        nim: aslab.nim,
        program_studi: aslab.program_studi,
        kelas_aslab: kelas_aslab,
        kelas_praktikum: kelas_praktikum,
        mata_kuliah: mata_kuliah_praktikum,
        tahun_semester: tahun_semester
      })
      .from(permintaan_sertifikat)
      .innerJoin(aslab, eq(permintaan_sertifikat.id_aslab, aslab.id_aslab))
      .leftJoin(kelas_aslab, eq(aslab.id_aslab, kelas_aslab.aslab))
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
      .filter(item => item.tahun_semester)
      .map(item => ({
        semester: item.tahun_semester.semester,
        tahun_ajaran: item.tahun_semester.tahun_ajaran,
      }));

    // Remove duplicates
    const uniqueSemesters = Array.from(new Set(allSemesters.map(s => JSON.stringify(s))))
      .map(s => JSON.parse(s));

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
          .filter(item => item.mata_kuliah && item.tahun_semester)
          .map(item => [
            item.mata_kuliah.id,
            {
              nama: item.mata_kuliah.nama,
              tahun_ajaran: `${item.tahun_semester.semester} ${item.tahun_semester.tahun_ajaran}`
            }
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
    console.error("Error fetching certificate request:", error);
    throw new Error("Failed to fetch certificate request");
  }
}

export const approveCertificateRequest = async (requestId) => {
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
    console.error("Error approving certificate request:", error);
    return { success: false, error: error.message };
  }
};

export const rejectCertificateRequest = async (requestId, reason) => {
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
    console.error("Error rejecting certificate request:", error);
    return { success: false, error: error.message };
  }
};

export const cancelCertificateStatus = async (requestId) => {
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
    console.error("Error canceling certificate status:", error);
    return { success: false, error: error.message };
  }
};

export const getAslabDetailByNim = async (nim) => {
  try {
    const result = await db
      .select({
        id_aslab: aslab.id_aslab,
        nama: aslab.nama,
        nim: aslab.nim,
        email: aslab.email,
        no_hp: aslab.no_hp,
        angkatan: aslab.angkatan,
        program_studi: aslab.program_studi,
        status: aslab.status,
        kelas_aslab: kelas_aslab,
        kelas_praktikum: kelas_praktikum,
        mata_kuliah: mata_kuliah_praktikum,
        tahun_semester: tahun_semester
      })
      .from(aslab)
      .leftJoin(kelas_aslab, eq(aslab.id_aslab, kelas_aslab.aslab))
      .leftJoin(kelas_praktikum, eq(kelas_aslab.kelas, kelas_praktikum.id))
      .leftJoin(mata_kuliah_praktikum, eq(kelas_praktikum.mata_kuliah, mata_kuliah_praktikum.id))
      .leftJoin(tahun_semester, eq(kelas_praktikum.tahun_semester, tahun_semester.id))
      .where(eq(aslab.nim, nim));

    if (!result || result.length === 0) {
      return null;
    }

    // Group by aslab and process courses
    const aslabData = {
      id: result[0].id_aslab.toString(),
      nama: result[0].nama,
      nim: result[0].nim,
      email: result[0].email,
      no_hp: result[0].no_hp,
      angkatan: result[0].angkatan,
      program_studi: result[0].program_studi,
      status: result[0].status,
      courses: []
    };

    // Process courses
    result.forEach(item => {
      if (item.mata_kuliah && item.tahun_semester) {
        aslabData.courses.push({
          mata_kuliah: item.mata_kuliah.nama,
          kelas: item.kelas_praktikum.kelas,
          semester: `${item.tahun_semester.semester} ${item.tahun_semester.tahun_ajaran}`
        });
      }
    });

    // Remove duplicate courses
    aslabData.courses = Array.from(
      new Map(aslabData.courses.map(course => [
        `${course.mata_kuliah}-${course.kelas}-${course.semester}`,
        course
      ])).values()
    );

    return aslabData;
  } catch (error) {
    console.error("Error fetching aslab detail:", error);
    return null;
  }
};

export const getAllAslab = async () => {
  try {
    const result = await db
      .select({
        id_aslab: aslab.id_aslab,
        nama: aslab.nama,
        nim: aslab.nim,
        email: aslab.email,
        no_hp: aslab.no_hp,
        angkatan: aslab.angkatan,
        program_studi: aslab.program_studi,
        status: aslab.status,
        kelas_aslab: kelas_aslab,
        kelas_praktikum: kelas_praktikum,
        mata_kuliah: mata_kuliah_praktikum,
        tahun_semester: tahun_semester
      })
      .from(aslab)
      .leftJoin(kelas_aslab, eq(aslab.id_aslab, kelas_aslab.aslab))
      .leftJoin(kelas_praktikum, eq(kelas_aslab.kelas, kelas_praktikum.id))
      .leftJoin(mata_kuliah_praktikum, eq(kelas_praktikum.mata_kuliah, mata_kuliah_praktikum.id))
      .leftJoin(tahun_semester, eq(kelas_praktikum.tahun_semester, tahun_semester.id));

    // Group by aslab and process courses
    const aslabMap = new Map();
    
    result.forEach(item => {
      if (!aslabMap.has(item.id_aslab)) {
        aslabMap.set(item.id_aslab, {
          ...item,
          courses: []
        });
      }
      
      if (item.mata_kuliah && item.tahun_semester) {
        const aslabData = aslabMap.get(item.id_aslab);
        aslabData.courses.push({
          subject: item.mata_kuliah.nama,
          year: `${item.tahun_semester.semester} ${item.tahun_semester.tahun_ajaran}`
        });
      }
    });

    return Array.from(aslabMap.values()).map(aslab => ({
      ...aslab,
      courses: aslab.courses.map((course, index) => ({
        no: index + 1,
        ...course
      }))
    }));
  } catch (error) {
    console.error("Error fetching aslab data:", error);
    return [];
  }
};
