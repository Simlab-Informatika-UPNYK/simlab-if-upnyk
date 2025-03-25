"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function getAllCertificateRequests() {
  // Initialize Supabase client
  const supabase = createClient();

  // TODO: Implement actual Supabase query when database is ready
  // Example:
  // const { data, error } = await supabase
  //   .from('certificate_requests')
  //   .select('*')
  //   .order('tanggal_pengajuan', { ascending: false });

  // if (error) {
  //   console.error('Error fetching certificate requests:', error);
  //   throw new Error('Failed to fetch certificate requests');
  // }

  // For development, return dummy data
  return [
    {
      id: "001",
      nim: "124200023",
      nama_asisten: "Cantika Amalia",
      tanggal_pengajuan: "10 Desember 2024",
      status: "Waiting",
    },
    {
      id: "002",
      nim: "1245678903",
      nama_asisten: "Kesha Azka Afleni",
      tanggal_pengajuan: "10 Desember 2024",
      status: "Waiting",
    },
    {
      id: "003",
      nim: "124210023",
      nama_asisten: "Hana Hanida",
      tanggal_pengajuan: "10 Desember 2024",
      status: "Waiting",
    },
    {
      id: "004",
      nim: "124230023",
      nama_asisten: "Barita",
      tanggal_pengajuan: "26 November 2024",
      status: "Approve",
    },
    {
      id: "005",
      nim: "123210024",
      nama_asisten: "Kamilia Hana",
      tanggal_pengajuan: "21 November 2024",
      status: "Approve",
    },
    {
      id: "006",
      nim: "123200023",
      nama_asisten: "Lala Kamila",
      tanggal_pengajuan: "21 November 2024",
      status: "Approve",
    },
    {
      id: "007",
      nim: "124220022",
      nama_asisten: "Habib Maulana",
      tanggal_pengajuan: "02 November 2024",
      status: "Reject",
    },
    {
      id: "008",
      nim: "124220100",
      nama_asisten: "Faiz Ahmad",
      tanggal_pengajuan: "14 Oktober 2024",
      status: "Reject",
    },
    {
      id: "009",
      nim: "123220025",
      nama_asisten: "Lulu Kamilia",
      tanggal_pengajuan: "11 Oktober 2024",
      status: "Approve",
    },
    {
      id: "010",
      nim: "124200025",
      nama_asisten: "Ahmad Dzaky",
      tanggal_pengajuan: "11 Oktober 2024",
      status: "Reject",
    },
  ];
}

export async function getCertificateRequestByNim(nim) {
  // Initialize Supabase client
  const supabase = createClient();

  // TODO: Implement actual Supabase query when database is ready
  // Example:
  // const { data, error } = await supabase
  //   .from('certificate_requests')
  //   .select('*, mata_kuliah_praktikum(*)')
  //   .eq('nim', nim)
  //   .single();
  //
  // if (error) {
  //   console.error('Error fetching certificate request:', error);
  //   throw new Error('Failed to fetch certificate request');
  // }

  // For development, return dummy data
  return {
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
  };
}
