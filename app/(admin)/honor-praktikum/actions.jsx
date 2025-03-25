"use server";

import { createClient } from "@/utils/supabase/server";
/* {
    "nim": "124200023",
    "nama_asisten": "Cantika Amalia",
    "periode": "gasal 2024/2025",
    "jumlah_honor": "Rp. 2,500,000",
    "tanggal_pengambilan": null
  }, */

export const getTahunSemesterId = async (slug) => {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from("tahun_semester")
      .select("id")
      .eq("slug", slug)
      .single();

    if (error) {
      console.error("Error finding tahun semester ID:", error);
      return null;
    }

    return data.id;
  } catch (error) {
    console.error("Unexpected error:", error);
    return null;
  }
};

export const getAllPeriode = async () => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("tahun_semester")
    .select()
    .order("slug", { ascending: false });

  return data;
};

export const getLatestData = async () => {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("tahun_semester")
    .select("slug")
    .order("slug", { ascending: false })
    .limit(1)
    .single();

  return data.slug;
};

export const getAllData = async (slug) => {
  const supabase = await createClient();

  const { data: kelas, error: aslabKelasError } = await supabase
    .from("aslab")
    .select(
      `
      nama, nim, id_aslab, aslab_honor (
        tahun_semester(*), 
        status_honor, 
        tanggal_diambil
      ), 
      kelas_aslab(
        kelas (tahun_semester(slug), slug)
      )
    `
    )
    .eq("kelas_aslab.kelas.tahun_semester.slug", slug)
    .eq("aslab_honor.tahun_semester.slug", slug)
    .not("aslab_honor.tahun_semester", "is", null)
    .not("kelas_aslab.kelas.tahun_semester", "is", null)
    .not("kelas_aslab.kelas", "is", null);

  const mapped = kelas.map((k) => {
    return {
      nama: k.nama,
      nim: k.nim,
      tanggal_diambil: k.aslab_honor[0]?.tanggal_diambil || "-",
      jumlah_kelas: k.kelas_aslab.length,
    };
  });

  return mapped;
};

export const getOneHonor = async (nim, tahunSemesterId) => {
  const supabase = await createClient();

  const { data: aslabKelas, error: aslabKelasError } = await supabase
    .from("aslab")
    .select(
      `
      id_aslab, 
      nama, 
      nim, 
      aslab_honor(*),
      kelas_aslab(
        kelas(
          tahun_semester,
          id, 
          slug, 
          kelas, 
          mata_kuliah(
            nama, 
            slug), 
          jumlah_praktikan
        )
      )
    `
    )
    .eq("nim", nim)
    .eq("aslab_honor.tahun_semester", tahunSemesterId)
    .eq("kelas_aslab.kelas.tahun_semester", tahunSemesterId)
    .not("kelas_aslab.kelas", "is", null)
    .single();

  // return aslabKelas;

  if (aslabKelasError || !aslabKelas) {
    console.error("Error finding Honor:", aslabKelasError);
    return { error: "Honor not found" };
  }

  const { data: jenisHonor, error: jenisHonorError } = await supabase
    .from("honor_jenis")
    .select("jenis, biaya,slug");

  // Calculate total honor
  // Calculate total honor
  let totalHonor = 0;
  const honorDetails = [];

  // Find honor types by slug
  const responsi = jenisHonor.find((item) => item.slug === "responsi");
  const koreksi = jenisHonor.find((item) => item.slug === "koreksi");
  const naskah = jenisHonor.find((item) => item.slug === "naskah");
  const honorarium = jenisHonor.find((item) => item.slug === "honorarium");

  aslabKelas.kelas_aslab.forEach((kelasItem) => {
    kelasItem = kelasItem.kelas;
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
      honorBreakdown.koreksi = koreksi.biaya * kelasItem.jumlah_praktikan;
    }

    if (naskah) {
      honorBreakdown.naskah = naskah.biaya;
    }

    if (honorarium) {
      honorBreakdown.honorarium = honorarium.biaya * 10;
    }

    // Calculate total for this class
    const kelasHonor =
      honorBreakdown.responsi +
      honorBreakdown.koreksi +
      honorBreakdown.naskah +
      honorBreakdown.honorarium;

    honorBreakdown.total = kelasHonor;
    totalHonor += kelasHonor;

    honorDetails.push({
      ...kelasItem,
      honor_breakdown: honorBreakdown,
      honor_kelas: kelasHonor,
    });
  });

  return {
    asisten: {
      nama: aslabKelas.nama,
      nim: aslabKelas.nim,
      id_aslab: aslabKelas.id_aslab,
    },
    id_aslab_honor: aslabKelas.aslab_honor[0]?.id || null,
    tanggal_diambil: aslabKelas.aslab_honor[0]?.tanggal_diambil || null,
    kelas: honorDetails,
    total_honor: totalHonor,
    formatted_honor: `Rp. ${totalHonor.toLocaleString("id-ID")}`,
  };
};

export const updateHonor = async (id, newTanggal, aslabId, tahunSemesterId) => {
  const supabase = await createClient();

  try {
    const { data: aslabData } = await supabase
      .from("aslab")
      .select("nim")
      .eq("id_aslab", aslabId)
      .single();
    // If id exists, update that record
    if (id) {
      const { data: updatedRow, error } = await supabase
        .from("aslab_honor")
        .update({
          tanggal_diambil: newTanggal,
        })
        .eq("id", id)
        .select();

      if (error) {
        console.error("Error updating honor data:", error);
        return { success: false, error: error.message };
      }

      if (aslabData && aslabData.nim) {
        // Fetch complete honor data with the nim
        const updatedData = await getOneHonor(aslabData.nim, tahunSemesterId);
        return { success: true, data: updatedData };
      } else {
        return { success: false, error: "Could not find assistant data" };
      }
    }
    // If id doesn't exist, create a new record
    else {
      // Ensure we have the required parameters
      if (!aslabId || !tahunSemesterId) {
        return {
          success: false,
          error:
            "Aslab ID and Tahun Semester ID are required to create a new honor record",
        };
      }

      const { data, error } = await supabase
        .from("aslab_honor")
        .insert({
          aslab: aslabId,
          tahun_semester: tahunSemesterId,
          status_honor: "Belum Diambil", // Default status
          tanggal_diambil: newTanggal,
        })
        .select();

      if (error) {
        console.error("Error creating honor data:", error);
        return { success: false, error: error.message };
      }

      const updatedData = await getOneHonor(aslabData.nim, tahunSemesterId);

      return {
        success: true,
        data: updatedData,
      };
    }
  } catch (error) {
    console.error("Error in edit honor function:", error);
    return { success: false, error: error.message };
  }
};
