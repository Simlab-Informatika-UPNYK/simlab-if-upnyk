"use client"

import { DosenForm } from "../../_components/form"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { editDosen } from "../../actions"

export function FormEditDosen({ initialData }) {
  const { toast } = useToast()
  const router = useRouter()

  const handleSubmit = async (data) => {
    try {
      const result = await editDosen(initialData.id, data)
      if (!result.success) throw new Error(result.error)

      toast({
        title: "Success",
        description: "Dosen berhasil diperbarui",
      })
      router.push(`/admin/dosen-pengampu`)
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    }
  }

  return (
    <DosenForm 
      onSubmit={handleSubmit}
      initialValues={{
        nama: initialData.nama,
        nip: initialData.nip,
        email: initialData.email
      }}
    />
  )
}
