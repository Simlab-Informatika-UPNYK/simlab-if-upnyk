"use server";

import { db } from "@/db";
import { aslab, kelas_aslab, kelas_praktikum, tahun_semester, user, honor_jenis, mata_kuliah_praktikum } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { getTahunSemester } from "@/app/(menu)/admin/tahun-semester/actions";
import { translatePostgresError } from "@/lib/postgres-error-translator";


export async function getAslabByTahunSemester(tahunSemesterId) {
  try {
    const allAslab = await db
      .select({
        id_aslab: aslab.id_aslab,
        nama: user.name,
        nim: aslab.nim,
        email: user.email,
      })
      .from(aslab)
      .innerJoin(user, eq(aslab.id_aslab, user.aslab_id))
      .orderBy(aslab.nim);

    const classCounts = new Map();
    const honorTotal = new Map();
    const mataKuliahMap = new Map();
    
    // Cache honor types once for all aslab calculations
    const jenisHonor = await db.select().from(honor_jenis);
    const responsi = jenisHonor.find((item) => item.slug === "responsi");
    const koreksi = jenisHonor.find((item) => item.slug === "koreksi");
    const naskah = jenisHonor.find((item) => item.slug === "naskah");
    const honorarium = jenisHonor.find((item) => item.slug === "honorarium");

    // Calculate base honor components per class
    const baseHonorPerClass = (responsi?.biaya || 0) + (naskah?.biaya || 0) + ((honorarium?.biaya || 0) * 10);

    for (const aslabItem of allAslab) {
      try {
        // Get all classes with mata kuliah and praktikan count for this aslab
        const kelasData = await db
          .select({
            jumlah_praktikan: kelas_praktikum.jumlah_praktikan,
            nama_kelas: kelas_praktikum.kelas,
            nama_mata_kuliah: mata_kuliah_praktikum.nama,
          })
          .from(kelas_aslab)
          .innerJoin(kelas_praktikum, eq(kelas_praktikum.id, kelas_aslab.kelas))
          .innerJoin(mata_kuliah_praktikum, eq(mata_kuliah_praktikum.id, kelas_praktikum.mata_kuliah))
          .where(and(eq(kelas_aslab.aslab, aslabItem.id_aslab), eq(kelas_praktikum.tahun_semester, tahunSemesterId)));

        const countValue = kelasData.length;
        classCounts.set(aslabItem.id_aslab, countValue);

        // Group mata kuliah and kelas data
        if (countValue > 0) {
          const mataKuliahGroups = {};
          
          kelasData.forEach(kelas => {
            const mkName = kelas.nama_mata_kuliah;
            if (!mataKuliahGroups[mkName]) {
              mataKuliahGroups[mkName] = [];
            }
            mataKuliahGroups[mkName].push(kelas.nama_kelas);
          });

          // Format mata kuliah string
          const mataKuliahString = Object.entries(mataKuliahGroups)
            .map(([mkName, kelasList]) => {
              const kelasString = kelasList.join(', ');
              return `${mkName} (${kelasString})`;
            })
            .join('| ');

          mataKuliahMap.set(aslabItem.id_aslab, mataKuliahString);
        } else {
          mataKuliahMap.set(aslabItem.id_aslab, '');
        }

        // Calculate total honor
        let totalHonor = 0;
        if (countValue > 0) {
          // Calculate base honor for all classes
          totalHonor += countValue * baseHonorPerClass;
          
          // Add koreksi honor based on jumlah_praktikan
          if (koreksi) {
            const totalPraktikan = kelasData.reduce((sum, kelas) => sum + (kelas.jumlah_praktikan || 0), 0);
            totalHonor += koreksi.biaya * totalPraktikan;
          }
        }

        honorTotal.set(aslabItem.id_aslab, totalHonor);
      } catch (error) {
        console.error(`Error processing aslab ${aslabItem.id_aslab}:`, error);
        classCounts.set(aslabItem.id_aslab, 0);
        honorTotal.set(aslabItem.id_aslab, 0);
        mataKuliahMap.set(aslabItem.id_aslab, '');
      }
    }

    // Map aslab data with class count and mata kuliah
    const mappedAslab = allAslab.map((aslab) => ({
      id_aslab: aslab.id_aslab,
      nama: aslab.nama,
      mata_kuliah: mataKuliahMap.get(aslab.id_aslab) || '',
      nim: aslab.nim,
      email: aslab.email,
      jumlah_kelas: classCounts.get(aslab.id_aslab) || 0,
      jumlah_honor: honorTotal.get(aslab.id_aslab) || 0, // Ubah dari honor_result ke jumlah_honor
    }));

    return mappedAslab;
  } catch (error) {
    const errorMessage = translatePostgresError(error);
    throw new Error(errorMessage);
  }
}

// Get tahun semester ID from slug
export async function getTahunSemesterId(slug) {
  try {
    const tahunSemesterData = await db
      .select({ id: tahun_semester.id })
      .from(tahun_semester)
      .where(eq(tahun_semester.slug, slug))
      .limit(1);

    return tahunSemesterData[0]?.id || null;
  } catch (error) {
    const errorMessage = translatePostgresError(error);
    throw new Error(errorMessage);
  }
}

export { getTahunSemester };
