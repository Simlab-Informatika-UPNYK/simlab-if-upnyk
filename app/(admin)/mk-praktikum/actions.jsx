"use server";
import slugify from "react-slugify";
import { createClient } from "@/utils/supabase/server";

/* 
mata_kuliah_praktikum

id 
created_at 
nama 
semester 
jumlah_kelas 
slug
*/

export async function getAllMk() {
  const supabase = await createClient();
  try {
    const { data, error } = await supabase.from("mata_kuliah_praktikum").select(`
        created_at, nama, semester, jumlah_kelas, slug`);

    if (error) {
      console.error("Error fetching data from Supabase:", error);
      return [];
    }
    
    return data;
  } catch (error) {
    console.error("Error in getData function:", error);
    return [];
  }
}

export async function getOneMk(slug) {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from("mata_kuliah_praktikum")
      .select(`id, nama, semester, jumlah_kelas, slug`)
      .eq("slug", slug)
      .limit(1)
      .single();

    if (error) {
      console.error("Error fetching lab detail:", error);
      return null;
    }

    return data;
  } catch (error) {
    console.error("Error in detail lab function:", error);
    return null;
  }
}

export async function createMk(data) {
  const supabase = await createClient();
  try {
    // Transform the form data to match the database schema
    const mkData = {
      nama: data.nama,
      semester: data.semester,
      jumlah_kelas: data.jumlah_kelas,
      slug: slugify(data.nama),
    };

    const { data: insertedData, error } = await supabase
      .from("mata_kuliah_praktikum")
      .insert(mkData)
      .select();

    if (error) {
      console.error("Error inserting lab data:", error);
      return { success: false, error: error.message };
    }

    return { success: true, data: insertedData };
  } catch (error) {
    console.error("Error in createLab function:", error);
    return { success: false, error: error.message };
  }
}

export async function editMk(id, data) {
  const supabase = await createClient();
  try {
    const labData = {
      nama: data.nama,
      semester: data.semester,
      jumlah_kelas: data.jumlah_kelas,
      slug: slugify(data.nama),
    };

    const { data: updatedData, error } = await supabase
      .from("mata_kuliah_praktikum")
      .update(labData)
      .eq("id", id)
      .select();

    if (error) {
      console.error("Error updating lab data:", error);
      return { success: false, error: error.message };
    }

    return { success: true, data: updatedData };
  } catch (error) {
    console.error("Error in edit lab function:", error);
    return { success: false, error: error.message };
  }
}
