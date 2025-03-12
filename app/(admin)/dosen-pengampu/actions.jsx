"use server";
import slugify from "react-slugify";
import { createClient } from "@/utils/supabase/server";

/* 
dosen_pengampu

created_at
nama
nip
email
slug
*/

export async function getAllDosen() {
  const supabase = await createClient();
  try {
    const { data, error } = await supabase
      .from("dosen_pengampu")
      .select(`created_at, nama, nip, email, slug`);

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

export async function getOneDosen(slug) {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from("dosen_pengampu")
      .select(`id, nama, nip, email, slug`)
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

export async function createDosen(data) {
  const supabase = await createClient();
  try {
    // Transform the form data to match the database schema
    const dosen = {
      nama: data.nama,
      nip: data.nip,
      email: data.email,
      slug: slugify(data.nama),
    };

    const { data: insertedData, error } = await supabase
      .from("dosen_pengampu")
      .insert(dosen)
      .select();

    if (error) {
      console.error("Error inserting data:", error);
      return { success: false, error: error.message };
    }

    return { success: true, data: insertedData };
  } catch (error) {
    console.error("Error in createLab function:", error);
    return { success: false, error: error.message };
  }
}

export async function editDosen(id, data) {
  const supabase = await createClient();
  try {
    const dosenData = {
      nama: data.nama,
      semester: data.semester,
      jumlah_kelas: data.jumlah_kelas,
      slug: slugify(data.nama),
    };

    const { data: updatedData, error } = await supabase
      .from("dosen_pengampu")
      .update(dosenData)
      .eq("id", id)
      .select();

    if (error) {
      console.error("Error updating data:", error);
      return { success: false, error: error.message };
    }

    return { success: true, data: updatedData };
  } catch (error) {
    console.error("Error in edit lab function:", error);
    return { success: false, error: error.message };
  }
}
