'use server';

import { createClient } from "@/utils/supabase/server";

// Fungsi untuk mendapatkan detail lab berdasarkan ID
export async function getLabDetail(id) {
  const supabase = await createClient();
  
  try {
    const { data, error } = await supabase
      .from("lab")
      .select('id, nama, lantai')
      .eq('id', id)
      .single();
    
    if (error) {
      console.error("Error fetching lab detail:", error);
      return { success: false, error: error.message };
    }
    
    return { success: true, data };
  } catch (error) {
    console.error("Error in getLabDetail function:", error);
    return { success: false, error: error.message };
  }
}
