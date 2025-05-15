"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function getAllCertificateRequests() {
  // Initialize Supabase client
  const supabase = await createClient();

  // TODO: Implement actual Supabase query when database is ready
  // Example:
  const { data, error } = await supabase
    .from("permintaan_sertifikat")
    .select("*, aslab(*)");
  // .order('waktu_pengajuan', { ascending: false });

  if (error) {
    console.error("Error fetching certificate requests:", error);
    throw new Error("Failed to fetch certificate requests");
  }

  return data.map((item) => ({
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
    status: item.status.charAt(0).toUpperCase() + item.status.slice(1),
  }));
}

export async function getCertificateRequestByNim(nim) {
  // Initialize Supabase client
  const supabase = await createClient();

  // TODO: Implement actual Supabase query when database is ready
  // Example:
  // Query certificate request where aslab is not null (using !inner join)
  const { data, error } = await supabase
    .from("permintaan_sertifikat")
    .select(
      `
      *,
      aslab!inner(
        nama, nim, program_studi,
        kelas_aslab(kelas(mata_kuliah(nama), tahun_semester(semester, tahun_ajaran)))
      )
      `
    )
    .eq("aslab.nim", nim)
    .single()

  if (error) {
    console.error("Error fetching certificate request:", error);
    return null;
  }

  return {
    id: data.id,
    waktu_pengajuan: data.waktu_pengajuan,
    status: data.status.charAt(0).toUpperCase() + data.status.slice(1),
    keterangan: data.keterangan,
    nama_mahasiswa: data.aslab.nama,
    nim: data.aslab.nim,
    program_studi: data.aslab.program_studi,
    tahun_ajaran: (() => {
      if (!data.aslab.kelas_aslab || data.aslab.kelas_aslab.length === 0) {
        return "";
      }

      const allSemesters = data.aslab.kelas_aslab.map((item) => ({
        semester: item.kelas.tahun_semester.semester,
        tahun_ajaran: item.kelas.tahun_semester.tahun_ajaran,
      }));

      // Sort by academic year and semester
      allSemesters.sort((a, b) => {
        const yearA = parseInt(a.tahun_ajaran.split("/")[0]);
        const yearB = parseInt(b.tahun_ajaran.split("/")[0]);

        if (yearA !== yearB) return yearA - yearB;
        return a.semester === "Gasal" ? -1 : 1;
      });

      const earliest = allSemesters[0];
      const latest = allSemesters[allSemesters.length - 1];

      // If years are the same, don't use "s.d." format
      if (earliest.tahun_ajaran === latest.tahun_ajaran) {
        if (earliest.semester === latest.semester) {
          return `${earliest.semester} ${earliest.tahun_ajaran}`;
        } else {
          return `${earliest.semester} - ${latest.semester} ${earliest.tahun_ajaran}`;
        }
      } else {
        return `${earliest.semester} ${earliest.tahun_ajaran} s.d. ${latest.semester} ${latest.tahun_ajaran}`;
      }
    })(),
    mata_kuliah_praktikum: data.aslab.kelas_aslab.map((item) => ({
      nama: item.kelas.mata_kuliah.nama,
      tahun_ajaran: `${item.kelas.tahun_semester.semester} ${item.kelas.tahun_semester.tahun_ajaran}`,
    })),
  };
  // if (error) {
  //   console.error('Error fetching certificate request:', error);
  //   throw new Error('Failed to fetch certificate request');
  // }

  // For development, return dummy data
  /* return {
    nama_mahasiswa: "Imam Agus Faisal",
    nim: "124200077",
    program_studi: "Sistem Informasi",
    tahun_ajaran: "Genap 2021/2022 s.d. Genap 2023/2024",
    status: "pending",
    keterangan: null,
    mata_kuliah_praktikum: [
      {
        nama: "Algoritma dan Pemrograman Lanjut",
        tahun_ajaran: "Genap 2021/2022",
      },
      {
        nama: "Algoritma dan Pemrograman",
        tahun_ajaran: "Gasal 2022/2023",
      },
      {
        nama: "Dasar-Dasar Pemrograman",
        tahun_ajaran: "Gasal 2022/2023",
      },
      {
        nama: "Pemrograman Berorientasi Objek",
        tahun_ajaran: "Genap 2022/2023",
      },
      {
        nama: "Algoritma dan Pemrograman Lanjut",
        tahun_ajaran: "Genap 2022/2023",
      },
      {
        nama: "Pemrograman Aplikasi Mobile",
        tahun_ajaran: "Gasal 2023/2024",
      },
      {
        nama: "Manajemen Proyek TI",
        tahun_ajaran: "Gasal 2023/2024",
      },
      {
        nama: "Rekayasa Kebutuhan Perangkat Lunak",
        tahun_ajaran: "Gasal 2023/2024",
      },
      {
        nama: "Teknologi dan Pemrograman Mobile",
        tahun_ajaran: "Genap 2023/2024",
      },
      {
        nama: "Algoritma dan Struktur Data",
        tahun_ajaran: "Genap 2023/2024",
      },
    ],
  }; */
}

// Add these new functions to handle certificate approval/rejection

export const approveCertificateRequest = async (requestId) => {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from("permintaan_sertifikat")
      .update({
        status: "Disetujui",
        keterangan: null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", requestId)
      .select();

    if (error) {
      console.error("Error approving certificate request:", error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Unexpected error in approve certificate:", error);
    return { success: false, error: error.message };
  }
};

export const rejectCertificateRequest = async (requestId, reason) => {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from("permintaan_sertifikat")
      .update({
        status: "Ditolak",
        keterangan: reason,
        updated_at: new Date().toISOString(),
      })
      .eq("id", requestId)
      .select();

    if (error) {
      console.error("Error rejecting certificate request:", error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Unexpected error in reject certificate:", error);
    return { success: false, error: error.message };
  }
};

export const cancelCertificateStatus = async (requestId) => {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from("permintaan_sertifikat")
      .update({
        status: "pending", // Set back to pending
        keterangan: null, // Clear any rejection reason
        updated_at: new Date().toISOString(),
      })
      .eq("id", requestId)
      .select();

    if (error) {
      console.error("Error canceling certificate status:", error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Unexpected error in cancel certificate status:", error);
    return { success: false, error: error.message };
  }
};

export const getAllAslab = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.from("aslab").select(
    `
      *
      `
  );

  return data;
};
