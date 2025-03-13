"use server";
import slugify from "react-slugify";
import { createClient } from "@/utils/supabase/server";

export async function getKalabData() {
  const supabase = await createClient();
  try {
    // Fetch kalab data from Supabase
    const { data, error } = await supabase
      .from("kalab") // Replace with your actual table name
      .select("*");

    if (error) {
      console.error("Error fetching data from Supabase:", error);
      return [];
    }

    // Map the Supabase data to match the expected format if needed
    return data.map((item, index) => ({
      "Nama Lengkap": item.nama,
      "NIDN/NIP": item.nip,
      Email: item.email,
      "No. Telepon": item.no_hp,
      Jabatan: "",
      slug: item.slug,
      photo: `https://unsplash.it/200/200?random=${index}`,
    }));
  } catch (error) {
    console.error("Error in getData function:", error);
    return [];
  }
}

export async function getKalabDetail(slug) {
  const supabase = await createClient();

  try {
    const { data: kalab, error } = await supabase
      .from("kalab")
      .select()
      .eq("slug", slug);

    if (error) {
      console.error("Error fetching kalab detail:", error);
      return null;
    }

    // Return the first matching record or null if none found
    return kalab;
  } catch (error) {
    console.error("Error in getKalabDetail function:", error);
    return null;
  }
}

export async function createKalab(data) {
  const supabase = await createClient();
  try {
    // Transform the form data to match the database schema
    const kalabData = {
      nama: data["Nama Lengkap"],
      nip: data["NIDN/NIP"],
      email: data["Email"],
      no_hp: data["No Telepon"],
      //   jabatan: data["Jabatan"]
      slug: slugify(data["Nama Lengkap"]),
    };

    // Insert data into the kalab table
    const { data: insertedData, error } = await supabase
      .from("kalab")
      .insert(kalabData)
      .select();

    if (error) {
      console.error("Error inserting kalab data:", error);
      return { success: false, error: error.message };
    }

    return { success: true, data: insertedData };
  } catch (error) {
    console.error("Error in createKalab function:", error);
    return { success: false, error: error.message };
  }
}

export async function editKalab(slug, data) {
  const supabase = await createClient();
  try {
    // Transform the form data to match the database schema
    const kalabData = {
      nama: data["Nama Lengkap"],
      nip: data["NIDN/NIP"],
      email: data["Email"],
      no_hp: data["No Telepon"],
      // Update slug only if name changed
      slug: data["Nama Lengkap"] ? slugify(data["Nama Lengkap"]) : slug,
    };

    // Update data in the kalab table
    const { data: updatedData, error } = await supabase
      .from("kalab")
      .update(kalabData)
      .eq("slug", slug)
      .select();

    if (error) {
      console.error("Error updating kalab data:", error);
      return { success: false, error: error.message };
    }

    return { success: true, data: updatedData };
  } catch (error) {
    console.error("Error in editKalab function:", error);
    return { success: false, error: error.message };
  }
}