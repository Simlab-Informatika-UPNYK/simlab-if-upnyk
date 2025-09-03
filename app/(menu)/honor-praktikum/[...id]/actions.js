"use server";

import { db } from "@/db";
import {
  aslab,
  aslab_honor,
  tahun_semester,
  kelas_aslab,
  kelas_praktikum,
  mata_kuliah_praktikum,
  honor_jenis,
  user,
} from "@/db/schema";
import { eq, and, count } from "drizzle-orm";
import { findOneBySlug, findAllOrdered } from "./db-utils";
import { translatePostgresError } from "@/lib/postgres-error-translator";

export const getTahunSemesterId = async (slug) => {
  try {
    const tahunSemester = await findOneBySlug(slug);
    return tahunSemester?.id || null;
  } catch (error) {
    const errorMessage = translatePostgresError(error);
    throw new Error(errorMessage);
  }
};

export const getAllPeriode = async () => {
  try {
    const periode = await findAllOrdered();
    return periode;
  } catch (error) {
    const errorMessage = translatePostgresError(error);
    throw new Error(errorMessage);
  }
};

export const getLatestData = async () => {
  try {
    const periode = await findAllOrdered();
    return periode.length > 0 ? periode[0].slug : null;
  } catch (error) {
    const errorMessage = translatePostgresError(error);
    throw new Error(errorMessage);
  }
};

export const getAllData = async (slug) => {
  try {
    const tahunSemester = await findOneBySlug(slug);

    if (!tahunSemester) {
      return [];
    }

    // Get ALL aslab (not just those with honor data)
    const allAslab = await db
      .select({
        id_aslab: aslab.id_aslab,
        nama: user.name,
        nim: aslab.nim,
      })
      .from(aslab)
      .innerJoin(user, eq(user.aslab_id, aslab.id_aslab))
      .orderBy(user.name);

    // Get honor data for this periode
    const honorData = await db
      .select({
        id: aslab_honor.id,
        aslab: aslab_honor.aslab,
        tanggal_diambil: aslab_honor.tanggal_diambil,
        status_honor: aslab_honor.status_honor,
      })
      .from(aslab_honor)
      .where(eq(aslab_honor.tahun_semester, tahunSemester.id));

    // Create a map for honor data by aslab ID
    const honorMap = new Map();
    honorData.forEach((honor) => {
      honorMap.set(honor.aslab, honor);
    });

    // Get class counts for all aslab
    const classCounts = new Map();
    for (const aslabItem of allAslab) {
      const countResult = await db
        .select({ count: count() })
        .from(kelas_aslab)
        .innerJoin(kelas_praktikum, eq(kelas_praktikum.id, kelas_aslab.kelas))
        .where(and(eq(kelas_aslab.aslab, aslabItem.id_aslab), eq(kelas_praktikum.tahun_semester, tahunSemester.id)));

      const countValue = countResult[0]?.count || 0;
      classCounts.set(aslabItem.id_aslab, countValue);
    }

    // Map all aslab with their honor status
    const mapped = allAslab.map((aslabItem) => {
      const honor = honorMap.get(aslabItem.id_aslab);
      return {
        id_aslab: aslabItem.id_aslab,
        nama: aslabItem.nama,
        nim: aslabItem.nim,
        tanggal_diambil: honor?.tanggal_diambil || "-",
        status_honor: honor?.status_honor || "-",
        jumlah_kelas: classCounts.get(aslabItem.id_aslab) || 0,
        id_aslab_honor: honor?.id || null,
        tahun_semester: slug,
      };
    });

    return mapped;
  } catch (error) {
    const errorMessage = translatePostgresError(error);
    throw new Error(errorMessage);
  }
};

export const getAllDataByAslab = async (slug, id_aslab) => {
  try {
    const tahunSemester = await findOneBySlug(slug);

    if (!tahunSemester) {
      return [];
    }

    // Get ALL aslab (not just those with honor data)
    const allAslab = await db
      .select({
        id_aslab: aslab.id_aslab,
        nama: user.name,
        nim: aslab.nim,
      })
      .from(aslab)
      .innerJoin(user, eq(user.aslab_id, aslab.id_aslab))
      .orderBy(user.name)
      .where(eq(aslab.id_aslab, id_aslab));

    // Get honor data for this periode
    const honorData = await db
      .select({
        id: aslab_honor.id,
        aslab: aslab_honor.aslab,
        tanggal_diambil: aslab_honor.tanggal_diambil,
        status_honor: aslab_honor.status_honor,
      })
      .from(aslab_honor)
      .where(eq(aslab_honor.tahun_semester, tahunSemester.id));

    // Create a map for honor data by aslab ID
    const honorMap = new Map();
    honorData.forEach((honor) => {
      honorMap.set(honor.aslab, honor);
    });

    // Get class counts for all aslab
    const classCounts = new Map();
    for (const aslabItem of allAslab) {
      const countResult = await db
        .select({ count: count() })
        .from(kelas_aslab)
        .innerJoin(kelas_praktikum, eq(kelas_praktikum.id, kelas_aslab.kelas))
        .where(and(eq(kelas_aslab.aslab, aslabItem.id_aslab), eq(kelas_praktikum.tahun_semester, tahunSemester.id)));

      const countValue = countResult[0]?.count || 0;
      classCounts.set(aslabItem.id_aslab, countValue);
    }

    // Map all aslab with their honor status
    const mapped = allAslab.map((aslabItem) => {
      const honor = honorMap.get(aslabItem.id_aslab);
      return {
        id_aslab: aslabItem.id_aslab,
        nama: aslabItem.nama,
        nim: aslabItem.nim,
        tanggal_diambil: honor?.tanggal_diambil || "-",
        status_honor: honor?.status_honor || "-",
        jumlah_kelas: classCounts.get(aslabItem.id_aslab) || 0,
        id_aslab_honor: honor?.id || null,
        tahun_semester: slug,
      };
    });

    return mapped;
  } catch (error) {
    const errorMessage = translatePostgresError(error);
    throw new Error(errorMessage);
  }
};

export const getOneHonor = async (nim, tahunSemesterSlug) => {
  try {
    const tahunSemester = await findOneBySlug(tahunSemesterSlug);

    if (!tahunSemester) {
      return { error: "Tahun semester tidak ditemukan" };
    }

    const aslabData = await db
      .select({
        id_aslab: aslab.id_aslab,
        nama: user.name,
        nim: aslab.nim,
        aslab_honor_id: aslab_honor.id,
        aslab_honor_tanggal_diambil: aslab_honor.tanggal_diambil,
        kelas_id: kelas_praktikum.id,
        kelas_nama: kelas_praktikum.kelas,
        kelas_jumlah_praktikan: kelas_praktikum.jumlah_praktikan,
        mata_kuliah_nama: mata_kuliah_praktikum.nama,
        mata_kuliah_slug: mata_kuliah_praktikum.slug,
      })
      .from(aslab)
      .leftJoin(user, eq(user.aslab_id, aslab.id_aslab))
      .leftJoin(aslab_honor, and(eq(aslab_honor.aslab, aslab.id_aslab), eq(aslab_honor.tahun_semester, tahunSemester.id)))
      .leftJoin(kelas_aslab, eq(kelas_aslab.aslab, aslab.id_aslab))
      .leftJoin(
        kelas_praktikum,
        and(eq(kelas_praktikum.id, kelas_aslab.kelas), eq(kelas_praktikum.tahun_semester, tahunSemester.id))
      )
      .leftJoin(mata_kuliah_praktikum, eq(mata_kuliah_praktikum.id, kelas_praktikum.mata_kuliah))
      .where(eq(aslab.nim, nim));

    console.log("aslab data", aslabData);

    if (!aslabData || aslabData.length === 0) {
      return { error: "Honor not found" };
    }

    // Get honor types
    const jenisHonor = await db.select().from(honor_jenis);

    // Calculate total honor
    let totalHonor = 0;
    const honorDetails = [];

    // Find honor types by slug
    const responsi = jenisHonor.find((item) => item.slug === "responsi");
    const koreksi = jenisHonor.find((item) => item.slug === "koreksi");
    const naskah = jenisHonor.find((item) => item.slug === "naskah");
    const honorarium = jenisHonor.find((item) => item.slug === "honorarium");

    // Group classes by kelas_id to avoid duplicates
    const uniqueClasses = new Map();
    aslabData.forEach((item) => {
      if (item.kelas_id && !uniqueClasses.has(item.kelas_id)) {
        uniqueClasses.set(item.kelas_id, item);
      }
    });

    // Calculate honor for each unique class
    uniqueClasses.forEach((kelasItem) => {
      // Initialize honor components with 0
      const honorBreakdown = {
        responsi: 0,
        koreksi: 0,
        naskah: 0,
        honorarium: 0,
        total: 0,
      };

      // Calculate each honor component
      if (responsi) {
        honorBreakdown.responsi = responsi.biaya;
      }

      if (koreksi) {
        honorBreakdown.koreksi = koreksi.biaya * (kelasItem.kelas_jumlah_praktikan || 0);
      }

      if (naskah) {
        honorBreakdown.naskah = naskah.biaya;
      }

      if (honorarium) {
        honorBreakdown.honorarium = honorarium.biaya * 10;
      }

      // Calculate total for this class
      const kelasHonor =
        honorBreakdown.responsi + honorBreakdown.koreksi + honorBreakdown.naskah + honorBreakdown.honorarium;

      honorBreakdown.total = kelasHonor;
      totalHonor += kelasHonor;

      honorDetails.push({
        id: kelasItem.kelas_id,
        slug: kelasItem.kelas_slug,
        kelas: kelasItem.kelas_nama,
        jumlah_praktikan: kelasItem.kelas_jumlah_praktikan,
        mata_kuliah: {
          nama: kelasItem.mata_kuliah_nama,
          slug: kelasItem.mata_kuliah_slug,
        },
        honor_breakdown: honorBreakdown,
        honor_kelas: kelasHonor,
      });
    });

    return {
      asisten: {
        nama: aslabData[0].nama ?? null,
        nim: aslabData[0].nim ?? null,
        id_aslab: aslabData[0].id_aslab ?? null,
      },
      id_aslab_honor: aslabData[0].aslab_honor_id || null,
      tanggal_diambil: aslabData[0].aslab_honor_tanggal_diambil || null,
      kelas: honorDetails,
      total_honor: totalHonor,
      formatted_honor: `Rp. ${totalHonor.toLocaleString("id-ID")}`,
      honor_jenis: {
        responsi: responsi,
        koreksi: koreksi,
        naskah: naskah,
        honorarium: honorarium,
      },
    };
  } catch (error) {
    const errorMessage = translatePostgresError(error);
    throw new Error(errorMessage);
  }
};

export const calculateHonorForAslab = async (aslabId, tahunSemesterId) => {
  try {
    // Get honor types
    const jenisHonor = await db.select().from(honor_jenis);

    // Get classes for this aslab in the specified periode
    const kelasData = await db
      .select({
        kelas_id: kelas_praktikum.id,
        kelas_slug: kelas_praktikum.slug,
        kelas_nama: kelas_praktikum.kelas,
        kelas_jumlah_praktikan: kelas_praktikum.jumlah_praktikan,
        mata_kuliah_nama: mata_kuliah_praktikum.nama,
        mata_kuliah_slug: mata_kuliah_praktikum.slug,
      })
      .from(kelas_aslab)
      .innerJoin(kelas_praktikum, eq(kelas_praktikum.id, kelas_aslab.kelas))
      .innerJoin(mata_kuliah_praktikum, eq(mata_kuliah_praktikum.id, kelas_praktikum.mata_kuliah))
      .where(and(eq(kelas_aslab.aslab, aslabId), eq(kelas_praktikum.tahun_semester, tahunSemesterId)));

    // Find honor types by slug
    const responsi = jenisHonor.find((item) => item.slug === "responsi");
    const koreksi = jenisHonor.find((item) => item.slug === "koreksi");
    const naskah = jenisHonor.find((item) => item.slug === "naskah");
    const honorarium = jenisHonor.find((item) => item.slug === "honorarium");

    let totalHonor = 0;
    const honorDetails = [];

    // Calculate honor for each class
    kelasData.forEach((kelasItem) => {
      // Initialize honor components with 0
      const honorBreakdown = {
        responsi: 0,
        koreksi: 0,
        naskah: 0,
        honorarium: 0,
        total: 0,
      };

      // Calculate each honor component
      if (responsi) {
        honorBreakdown.responsi = responsi.biaya;
      }

      if (koreksi) {
        honorBreakdown.koreksi = koreksi.biaya * (kelasItem.kelas_jumlah_praktikan || 0);
      }

      if (naskah) {
        honorBreakdown.naskah = naskah.biaya;
      }

      if (honorarium) {
        honorBreakdown.honorarium = honorarium.biaya * 10; // Assuming 10 meetings per semester
      }

      // Calculate total for this class
      const kelasHonor =
        honorBreakdown.responsi + honorBreakdown.koreksi + honorBreakdown.naskah + honorBreakdown.honorarium;

      honorBreakdown.total = kelasHonor;
      totalHonor += kelasHonor;

      honorDetails.push({
        id: kelasItem.kelas_id,
        slug: kelasItem.kelas_slug,
        kelas: kelasItem.kelas_nama,
        jumlah_praktikan: kelasItem.kelas_jumlah_praktikan,
        mata_kuliah: {
          nama: kelasItem.mata_kuliah_nama,
          slug: kelasItem.mata_kuliah_slug,
        },
        honor_breakdown: honorBreakdown,
        honor_kelas: kelasHonor,
      });
    });

    return {
      total_honor: totalHonor,
      honor_details: honorDetails,
      jumlah_kelas: kelasData.length,
    };
  } catch (error) {
    const errorMessage = translatePostgresError(error);
    throw new Error(errorMessage);
  }
};

export const createHonorPraktikum = async (data) => {
  try {
    console.log("Creating honor praktikum with data:", data);

    // Get tahun semester based on periode
    const tahunSemester = await db.select().from(tahun_semester).where(eq(tahun_semester.slug, data.periode)).limit(1);

    if (tahunSemester.length === 0) {
      return {
        success: false,
        error: "Periode tidak valid",
      };
    }

    console.log("Found tahun semester:", tahunSemester[0]);

    // Calculate honor automatically
    const honorCalculation = await calculateHonorForAslab(parseInt(data.aslab_id), tahunSemester[0].id);

    console.log("Honor calculation result:", honorCalculation);

    // Create honor record
    const insertData = {
      aslab: parseInt(data.aslab_id),
      tahun_semester: tahunSemester[0].id,
      status_honor: data.status_honor || (data.tanggal_pengambilan ? "Sudah Diambil" : "Belum Diambil"),
      tanggal_diambil: data.tanggal_pengambilan,
      created_at: new Date(), // Add created_at field
    };

    console.log("Inserting data:", insertData);

    const result = await db.insert(aslab_honor).values(insertData).returning();

    console.log("Insert successful, result:", result);

    return {
      success: true,
      data: result[0],
      honor_calculation: honorCalculation,
    };
  } catch (error) {
    const errorMessage = translatePostgresError(error);
    throw new Error(errorMessage);
  }
};

export const updateHonor = async (id, newTanggal, aslabId, tahunSemesterId) => {
  try {
    const aslabData = await db.select({ nim: aslab.nim }).from(aslab).where(eq(aslab.id_aslab, aslabId)).limit(1);

    if (aslabData.length === 0 || !aslabData[0].nim) {
      return { success: false, error: "Could not find assistant data" };
    }

    const nim = aslabData[0].nim;

    // If id exists, update that record
    if (id) {
      const updatedRow = await db
        .update(aslab_honor)
        .set({
          tanggal_diambil: newTanggal,
          status_honor: newTanggal ? "Sudah Diambil" : "Belum Diambil",
        })
        .where(eq(aslab_honor.id, id))
        .returning();

      return {
        success: true,
        data: {
          nim,
          aslabId,
          tahunSemesterId,
          tanggal_diambil: newTanggal,
          status_honor: newTanggal ? "Sudah Diambil" : "Belum Diambil",
        },
      };
    }
    // If id doesn't exist, create a new record
    else {
      // Ensure we have the required parameters
      if (!aslabId || !tahunSemesterId) {
        return {
          success: false,
          error: "Aslab ID and Tahun Semester ID are required to create a new honor record",
        };
      }

      const result = await db
        .insert(aslab_honor)
        .values({
          aslab: aslabId,
          tahun_semester: tahunSemesterId,
          status_honor: "Sudah Diambil",
          tanggal_diambil: newTanggal,
        })
        .returning();

      return {
        success: true,
        data: {
          nim,
          aslabId,
          tahunSemesterId,
          tanggal_diambil: newTanggal,
          status_honor: "Sudah Diambil",
        },
      };
    }
  } catch (error) {
    const errorMessage = translatePostgresError(error);
    throw new Error(errorMessage);
  }
};
