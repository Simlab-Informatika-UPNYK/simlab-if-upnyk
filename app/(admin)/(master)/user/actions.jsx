/* 

profiles
id (fk users)
aslab_id
name
role
created_at

auth.users
id
email

aslab
id_aslab
nama
nim
email
no_hp
angkatan
program_studi
status
profile_picture
*/

"use server";
import slugify from "react-slugify";
import { createClient } from "@/utils/supabase/server";

export async function getAllUsers() {
  /* 
    nama
    email
    role
    status
    created_at 
    */
  const supabase = await createClient();
  try {
    const { data, error } = await supabase.from("profiles").select(`
        id,
        nama, 
        role,
        email,
        slug,
        created_at
        `);

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