import { FormEditJadwal } from "./form-edit-jadwal";
import BackButton from "@/components/back-button";
import { createClient } from "@/utils/supabase/server";

// Server action to get jadwal by slug
async function getJadwalDetail(slug) {
  const supabase = await createClient();
  
  try {
    // Get jadwal data with all related information
    const { data: jadwal, error } = await supabase
      .from("kelas_praktikum")
      .select(`
        id,
        kelas,
        id_mk:mata_kuliah,
        id_dosen,
        jumlah_praktikan,
        hari,
        lab,
        jenis_praktikan,
        waktu,
        slug
      `)
      .eq("slug", slug)
      .limit(1)
      .single();

    if (error) {
      console.error("Error fetching jadwal:", error);
      return null;
    }
    
    return jadwal;
  } catch (error) {
    console.error("Exception when fetching jadwal:", error);
    return null;
  }
}

export default async function EditJadwalPage({ params }) {
  const slug = (await params).id; // params is not a Promise, no need to await
  const jadwal = await getJadwalDetail(slug);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Edit Jadwal Praktikum</h1>
        <BackButton />
      </div>

      <div className="">
        {jadwal ? (
          <FormEditJadwal jadwal={jadwal} />
        ) : (
          <div className="text-center p-4">
            <p className="text-red-500">Jadwal praktikum tidak ditemukan</p>
          </div>
        )}
      </div>
    </div>
  );
}