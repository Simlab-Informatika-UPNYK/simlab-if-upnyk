"use client"
import { toast } from "@/hooks/use-toast"
import MkPraktikumForm from "../../_components/form"
import { editMk } from "../../actions.jsx"
import { useRouter } from "next/navigation"

export default function FormEdit({ initialData }) {
  const router = useRouter()

  const handleSubmit = async (data) => {
    const result = await editMk(initialData.id, data)
    if (result?.success) {
      toast({
        title: "Berhasil",
        description: "Data mata kuliah berhasil diperbarui",
      })
      router.push("/admin/mk-praktikum")
    }
    return result
  }

  return (
    <MkPraktikumForm 
      initialData={initialData}
      onSubmit={handleSubmit}
      isEditing={true}
    />
  )
}
