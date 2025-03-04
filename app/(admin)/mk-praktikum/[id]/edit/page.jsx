import { FormEditMK } from "./form-edit-mk";
import { createClient } from "@/utils/supabase/server";
import BackButton from "@/components/back-button";

async function getMK(id) {
  // const supabase = await createClient()
  // const { data, error } = await supabase
  //   .from("mk_praktikum")
  //   .select()
  //   .eq("id", id)
  //   .single()

  // if (error) {
  //   console.error("Error fetching MK:", error)
  //   return null
  // }

  // Return a dummy MK object for development/testing
  const dummyMk = {
    kode_mk: "124210411",
    mata_kuliah: "Praktikum Cloud Computing",
    semester: "Ganjil",
    jumlah_kelas: 8,
  };

  return dummyMk;
}

export default async function EditMKPage({ params }) {
  const mkId = (await params).id;
  const mk = await getMK(mkId);

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Edit Mata Kuliah Praktikum</h1>
        <BackButton />
      </div>

      <div className="">
        {mk ? (
          <FormEditMK mk={mk} />
        ) : (
          <div className="text-center p-4">
            <p className="text-red-500">Mata Kuliah Praktikum tidak ditemukan</p>
          </div>
        )}
      </div>
    </div>
  );
}
