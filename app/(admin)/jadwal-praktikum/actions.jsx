"use server";
import slugify from "react-slugify";
import { createClient } from "@/utils/supabase/server";

export async function getAllJadwal() {
  const supabase = await createClient();
  
  try {
    // Query the main table with foreign references
    const { data, error } = await supabase
      .from('kelas_praktikum')
      .select(`
        id,
        kelas,
        jumlah_praktikan,
        hari,
        waktu,
        jenis_praktikan,
        mata_kuliah_praktikum(id, nama),
        dosen_pengampu(id, nama),
        lab(id, nama),
        aslab1:aslab!kelas_praktikum_id_asisten1_fkey(id_aslab, nama),
        aslab2:aslab!kelas_praktikum_id_asisten2_fkey(id_aslab, nama),
        slug
      `);

    if (error) {
      console.error("Error fetching jadwal data:", error);
      return [];
    }

    // Transform the data into the required format
    return data.map(item => {
      const mataKuliah = item.mata_kuliah_praktikum ? item.mata_kuliah_praktikum.nama : 'Unknown';
      const dosen = item.dosen_pengampu ? item.dosen_pengampu.nama : 'Unknown';
      const labName = item.lab ? item.lab.nama_lab : 'Unknown';
      const asisten1 = item.aslab1 ? item.aslab1.nama : 'None';
      const asisten2 = item.aslab2 ? item.aslab2.nama : 'None';
      
      // Create the slug from mata kuliah and class
      const slugText = `${mataKuliah}-${item.kelas}`;
      
      return {
        id: item.id,
        slug: item.slug,
        kelas: item.kelas,
        mata_kuliah: mataKuliah,
        dosen: dosen,
        jumlah_praktikan: item.jumlah_praktikan,
        hari: item.hari,
        waktu: item.waktu,
        lab: labName,
        asisten1: asisten1,
        asisten2: asisten2,
        jenis_praktikan: item.jenis_praktikan,
      };
    });
  } catch (error) {
    console.error("Error in getAllJadwal function:", error);
    return [];
  }
}

export async function getOneUser(slug) {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from("profiles")
      .select(
        `
        id,
        nama, 
        role,
        email,
        slug,
        created_at
        `
      )
      .eq("slug", slug)
      .limit(1)
      .single();

    if (error) {
      console.error("Error fetching user:", error);
      return null;
    }

    const mappedData = {
      ...data,
      status: data.aslab?.status || null,
      aslab: undefined,
    };
    return mappedData;
  } catch (error) {
    console.error("Error in detail user:", error);
    return null;
  }
}

export async function createUser(data) {
  const supabase = await createClient();
  try {
    // Transform the form data to match the database schema
    const userData = {
      nama: data.nama,
      role: data.role,
      email: data.email,
      slug: slugify(data.nama),
    };

    const { data: insertedData, error } = await supabase
      .from("profiles")
      .insert(userData)
      .select();

    if (error) {
      console.error("Error inserting user data:", error);
      return { success: false, error: error.message };
    }

    return { success: true, data: insertedData };
  } catch (error) {
    console.error("Error:", error);
    return { success: false, error: error.message };
  }
}

export async function editUser(id, data) {
  const supabase = await createClient();
  try {
    const userData = {
      nama: data.nama,
      email: data.email,
      role: data.role,
      slug: slugify(data.nama),
    };

    const { data: updatedData, error } = await supabase
      .from("profiles")
      .update(userData)
      .eq("id", id)
      .select();

    if (error) {
      console.error("Error updating user data:", error);
      return { success: false, error: error.message };
    }

    return { success: true, data: updatedData };
  } catch (error) {
    console.error("Error in edit user function:", error);
    return { success: false, error: error.message };
  }
}

export async function deleteUser(id) {
  const supabase = await createClient();
  try {
    const { data, error } = await supabase
      .from("profiles")
      .delete()
      .eq("id", id)
      .select();

    if (error) {
      console.error("Error deleting user data:", error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Error in delete user function:", error);
    return { success: false, error: error.message };
  }
}
