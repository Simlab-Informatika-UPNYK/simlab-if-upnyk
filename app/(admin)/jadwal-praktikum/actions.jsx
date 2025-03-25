"use server";
import slugify from "react-slugify";
import { createClient } from "@/utils/supabase/server";

export async function getAllJadwal() {
  const supabase = await createClient();

  try {
    // Query the main table with foreign references
    const { data, error } = await supabase
      .from("kelas_praktikum")
      .select(
        `
        id,
        dosen_pengampu(nama),
        kelas,
        jumlah_praktikan,
        hari,
        waktu,
        jenis_praktikan,
        mata_kuliah(nama),
        aslab:kelas_aslab(
          aslab(nama)
        ),
        lab(nama),
        slug
      `
      )
      .order("id", { ascending: true });

    if (error) {
      console.error("Error fetching jadwal data:", error);
      return [];
    }

    // Transform the data into the required format
    // return data.map((item) => {
    //   const mataKuliah = item.mata_kuliah_praktikum
    //     ? item.mata_kuliah_praktikum.nama
    //     : "Unknown";
    //   const dosen = item.dosen_pengampu ? item.dosen_pengampu.nama : "Unknown";
    //   const labName = item.lab ? item.lab.nama_lab : "Unknown";
    //   const asisten1 = item.aslab1 ? item.aslab1.nama : "None";
    //   const asisten2 = item.aslab2 ? item.aslab2.nama : "None";

    //   // Create the slug from mata kuliah and class
    //   const slugText = `${mataKuliah}-${item.kelas}`;

    //   return data;
    // });
    return data
  } catch (error) {
    console.error("Error in getAllJadwal function:", error);
    return [];
  }
}
