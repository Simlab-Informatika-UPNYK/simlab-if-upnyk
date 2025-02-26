import { FormEditLab } from "./form-edit-lab"
import { createClient } from "@/utils/supabase/server"
import BackButton from "@/components/back-button"

async function getLab(id) {
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

  // Return a dummy lab object for development/testing
  const dummyLab = {
    id: id,
    nama: "Laboratorium Dummy",
    kode: "LAB-001",
    deskripsi: "Ini adalah laboratorium dummy untuk pengembangan",
    lokasi: "Gedung A Lantai 2",
    kapasitas: 30,
    status: "aktif",
    created_at: new Date().toISOString()
  }
  
  return dummyLab
}

export default async function EditLabPage({ params }) {
  const labId = params.id
  const lab = await getLab(labId)

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Edit Laboratorium</h1>
        <BackButton />
      </div>

      <div className="border rounded-lg p-6 shadow-sm">
        {lab ? (
          <FormEditLab lab={lab} />
        ) : (
          <div className="text-center p-4">
            <p className="text-red-500">Laboratorium tidak ditemukan</p>
          </div>
        )}
      </div>
    </div>
  )
}
