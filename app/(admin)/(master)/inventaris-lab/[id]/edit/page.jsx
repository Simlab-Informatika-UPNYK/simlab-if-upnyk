import { FormEditInventaris } from "./form-edit-inventaris"
import { createClient } from "@/utils/supabase/server"
import BackButton from "@/components/back-button"

async function getInventaris(id) {
  // const supabase = await createClient()
  // const { data, error } = await supabase
  //   .from("laboratorium")
  //   .select()
  //   .eq("id", id)
  //   .single()

  // if (error) {
  //   console.error("Error fetching lab:", error)
  //   return null
  // }

  // Return a dummy lab inventory object for development/testing
  const dummyInventarisLab = {
    id: id,
    nama: "Komputer Desktop",
    jumlah: 10,
    tahun: 2022,
    kondisi: "Baik",
    created_at: new Date().toISOString()
  }
  
  return dummyInventarisLab
}

export default async function EditInventarisLab({ params }) {
  const inventarisId = params.id
  const inventaris = await getInventaris(inventarisId)

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Edit Inventaris Lab</h1>
        <BackButton />
      </div>

      <div className="">
        {inventaris ? (
          <FormEditInventaris inventaris={inventaris} />
        ) : (
          <div className="text-center p-4">
            <p className="text-red-500">Inventaris tidak ditemukan</p>
          </div>
        )}
      </div>
    </div>
  )
}
