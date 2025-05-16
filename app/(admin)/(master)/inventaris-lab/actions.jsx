'use server';

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// Fungsi untuk mendapatkan semua data inventaris berdasarkan ID lab
export async function getInventarisByLabId(labId) {
  const supabase = await createClient();
  
  try {
    const { data, error } = await supabase
      .from("inventaris")
      .select('*')
      .eq('lab_id', labId);
    
    if (error) {
      console.error("Error fetching inventaris data:", error);
      return { success: false, error: error.message };
    }
    
    return { success: true, data };
  } catch (error) {
    console.error("Error in getInventarisByLabId function:", error);
    return { success: false, error: error.message };
  }
}

// Fungsi untuk mendapatkan detail inventaris berdasarkan ID inventaris
export async function getInventarisById(id) {
  const supabase = await createClient();
  
  try {
    const { data, error } = await supabase
      .from("inventaris")
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error("Error fetching inventaris detail:", error);
      return { success: false, error: error.message };
    }
    
    return { success: true, data };
  } catch (error) {
    console.error("Error in getInventarisById function:", error);
    return { success: false, error: error.message };
  }
}

// Fungsi untuk menambah inventaris baru
export async function addInventaris(data) {
  const supabase = await createClient();
  
  try {
    const { data: result, error } = await supabase
      .from("inventaris")
      .insert([data])
      .select();
    
    if (error) {
      console.error("Error adding inventaris:", error);
      return { success: false, error: error.message };
    }
    
    revalidatePath(`/inventaris-lab/${data.lab_id}`);
    return { success: true, data: result };
  } catch (error) {
    console.error("Error in addInventaris function:", error);
    return { success: false, error: error.message };
  }
}

// Fungsi untuk mengupdate data inventaris
export async function updateInventaris(id, data) {
  const supabase = await createClient();
  
  try {
    const { data: result, error } = await supabase
      .from("inventaris")
      .update(data)
      .eq('id', id)
      .select();
    
    if (error) {
      console.error("Error updating inventaris:", error);
      return { success: false, error: error.message };
    }
    
    revalidatePath(`/inventaris-lab/${data.lab_id}`);
    return { success: true, data: result };
  } catch (error) {
    console.error("Error in updateInventaris function:", error);
    return { success: false, error: error.message };
  }
}

// Fungsi untuk menghapus inventaris
export async function deleteInventaris(id, labId) {
  const supabase = await createClient();
  
  try {
    const { error } = await supabase
      .from("inventaris")
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error("Error deleting inventaris:", error);
      return { success: false, error: error.message };
    }
    
    revalidatePath(`/inventaris-lab/${labId}`);
    return { success: true };
  } catch (error) {
    console.error("Error in deleteInventaris function:", error);
    return { success: false, error: error.message };
  }
}
