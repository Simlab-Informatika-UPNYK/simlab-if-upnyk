"use server";
import slugify from "react-slugify";
import { createClient } from "@/utils/supabase/server";

export async function getAllLab() {
  const supabase = await createClient();
  try {
    const { data, error } = await supabase.from("lab").select(`
        nama, 
        lantai, 
        kapasitas, 
        slug,
        kalab (
          nama
        )`);

    if (error) {
      console.error("Error fetching data from Supabase:", error);
      return [];
    }
    // Map the data to include the kalab's name directly
    const mappedData = data.map(item => ({
      ...item,
      kalab: item.kalab?.nama || null,
    }));
    return mappedData;
  } catch (error) {
    console.error("Error in getData function:", error);
    return [];
  }
}

export async function getAllKalab() {
  const supabase = await createClient();
  try {
    const { data, error } = await supabase.from("kalab").select("id, nama");

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

export async function getOneLab(slug) {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from("lab")
      .select(`id, nama, lantai, slug, kapasitas, kalab (nama, id)`)
      .eq("slug", slug)
      .limit(1)
      .single();

    if (error) {
      console.error("Error fetching lab detail:", error);
      return null;
    }

    const mappedData = {
      ...data,
      kalab: data.kalab?.nama || null,
      kalab_id: data.kalab?.id || null,
    };
    return mappedData;
  } catch (error) {
    console.error("Error in detail lab function:", error);
    return null;
  }
}

export async function createLab(data) {
  const supabase = await createClient();
  try {
    // Transform the form data to match the database schema
    const labData = {
      nama: data.nama,
      lantai: data.lantai,
      kapasitas: data.kapasitas,
      kalab: data.kalab,
      slug: slugify(data.nama),
    };

    const { data: insertedData, error } = await supabase
      .from("lab")
      .insert(labData)
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

export async function editLab(id, data) {
  const supabase = await createClient();
  try {
    const labData = {
      nama: data.nama,
      lantai: data.lantai,
      kapasitas: data.kapasitas,
      kalab: data.kalab,
      slug: slugify(data.nama),
    };

    const { data: updatedData, error } = await supabase
      .from("lab")
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
