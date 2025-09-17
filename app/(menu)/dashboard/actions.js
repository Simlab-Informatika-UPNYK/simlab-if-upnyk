"use server";

import { db } from "@/db";
import { pengumuman, kalab, lab } from "@/db/schema";
import { eq, desc, count, sum } from "drizzle-orm";
import { translatePostgresError } from "@/lib/postgres-error-translator";
import { findAllJadwalByAslabAndTahunSemester } from "../jadwal-praktikum/actions.jsx";
import { getLatestTahunSemester } from "../admin/tahun-semester/actions";

// Get active announcements
export async function getActivePengumuman() {
  try {
    const data = await db
      .select({
        id: pengumuman.id,
        judul: pengumuman.judul,
        isi: pengumuman.isi,
        created_at: pengumuman.created_at,
      })
      .from(pengumuman)
      .where(eq(pengumuman.active, true))
      .orderBy(desc(pengumuman.created_at))
      .limit(5); // Limit to 5 latest announcements

    return data;
  } catch (error) {
    const errorMessage = translatePostgresError(error);
    throw new Error(errorMessage);
  }
}

// Get lab schedule for aslab based on latest tahun semester
export async function getJadwalAslab(aslabId) {
  try {
    // Get latest tahun semester
    const latestTahunSemester = await getLatestTahunSemester();
    
    if (!latestTahunSemester) {
      // Return empty jadwal if no tahun semester available
      return {
        jadwal: [],
        tahunSemester: null
      };
    }
    
    // Get jadwal for aslab in the latest tahun semester
    const jadwal = await findAllJadwalByAslabAndTahunSemester(aslabId, latestTahunSemester.id);
    
    // Return jadwal with tahun semester info
    return {
      jadwal: jadwal.slice(0, 5), // Show 5 upcoming schedules
      tahunSemester: latestTahunSemester
    };
  } catch (error) {
    const errorMessage = translatePostgresError(error);
    throw new Error(errorMessage);
  }
}

// Get kalab list (modified to be accessible by aslab)
export async function getKalabList() {
  try {
    const data = await db
      .select({
        nama: kalab.nama,
        email: kalab.email,
        no_hp: kalab.no_hp,
      })
      .from(kalab)
      .orderBy(kalab.nama);

    return data;
  } catch (error) {
    const errorMessage = translatePostgresError(error);
    throw new Error(errorMessage);
  }
}

// Get dashboard stats
export async function getDashboardStats() {
  try {
    // Count active kalab
    const kalabCount = await db
      .select({ count: count() })
      .from(kalab);

    // Count total lab capacity - sum from lab table
    const labCapacity = await db
      .select({ total: sum(lab.kapasitas) })
      .from(lab);

    return {
      kalabCount: kalabCount[0]?.count || 0,
      totalCapacity: labCapacity[0]?.total || 0,
    };
  } catch (error) {
    const errorMessage = translatePostgresError(error);
    throw new Error(errorMessage);
  }
}
