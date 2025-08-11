"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import slugify from "react-slugify";

/**
 * Fetch all honor jenis records
 */
export async function getAllHonorJenis() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("honor_jenis")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    console.error("Error fetching honor jenis:", error);
    throw new Error(error.message);
  }

  return data;
}

/**
 * Create a new honor jenis record
 */
export async function createHonorJenis({ jenis, biaya }) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("honor_jenis")
    .insert([{ jenis, biaya, slug: slugify(jenis) }])
    .select();

  if (error) {
    console.error("Error creating honor jenis:", error);
    throw new Error(error.message);
  }

  revalidatePath("/honor-asisten");
  return data[0];
}

/**
 * Update an existing honor jenis record
 */
export async function updateHonorJenis({ id, jenis, biaya }) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("honor_jenis")
    .update({ jenis, biaya, slug: slugify(jenis) })
    .eq("id", id)
    .select();

  if (error) {
    console.error("Error updating honor jenis:", error);
    throw new Error(error.message);
  }

  revalidatePath("/admin/honor-asisten");
  return data[0];
}

/**
 * Delete a honor jenis record
 */
export async function deleteHonorJenis(id) {
  const supabase = await createClient();

  const { error } = await supabase.from("honor_jenis").delete().eq("id", id);

  if (error) {
    console.error("Error deleting honor jenis:", error);
    throw new Error(error.message);
  }

  revalidatePath("/admin/honor-asisten");
  return { success: true };
}

/**
 * Get a single honor jenis by ID
 */
export async function getHonorJenisByJenis(slug) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("honor_jenis")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("Error fetching honor jenis:", error);
    throw new Error(error.message);
  }

  return data;
}
