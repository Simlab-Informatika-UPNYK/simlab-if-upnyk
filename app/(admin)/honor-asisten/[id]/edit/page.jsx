import { FormEditHonorAsisten } from "./form-edit-honor-asisten";
import { createClient } from "@/utils/supabase/server";
import BackButton from "@/components/back-button";

async function getHonorAsisten(id) {
  // const supabase = await createClient()
  // const { data, error } = await supabase
  //   .from("dosen_pengampu")
  //   .select()
  //   .eq("id", id)
  //   .single()

  // if (error) {
  //   console.error("Error fetching dosen pengampu:", error)
  //   return null
  // }

  // Return a dummy data object for development/testing
  const dummyData = {
    nama: "Dr. Budi Santoso",
    nip: "198501152010121003",
    mata_kuliah: "Praktikum Cloud Computing",
    kelas: "Informatika A",
  };

  return dummyData;
}

export default async function EditDosenPengampuPage({ params }) {
  const dosenId = (await params).id;
  const honorAsisten = await getHonorAsisten(dosenId);

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Edit Dosen Pengampu</h1>
        <BackButton />
      </div>

      <div className="">
        {honorAsisten ? (
          <FormEditHonorAsisten honor={honorAsisten} />
        ) : (
          <div className="text-center p-4">
            <p className="text-red-500">Data Dosen Pengampu tidak ditemukan</p>
          </div>
        )}
      </div>
    </div>
  );
}
