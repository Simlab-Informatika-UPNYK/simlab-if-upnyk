"use client"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { useState, useEffect } from "react"
import { createClient } from "@/utils/supabase/client"

// Same schema as create form
const formSchema = z.object({
  nama: z.string().min(2, { message: "Nama Laboratorium minimal 2 karakter" }),
  lantai: z.string().min(1, { message: "Lantai harus diisi" }),
  kapasitas: z.preprocess(arg => arg === "" ? undefined : Number(arg), z.number({ invalid_type_error: "Kapasitas harus berupa angka" }).min(1, { message: "Kapasitas minimal 1" })),
  kalab: z.string().min(2, { message: "Kalab harus diisi" })
})

export function FormEditLab({ lab }) {
  
  const { toast } = useToast()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nama: lab.nama || "",
      lantai: lab.lantai || "",
      kapasitas: lab.kapasitas || "",
      kalab: lab.kalab || ""
    },
  })

  async function onSubmit(values) {
    setIsSubmitting(true)
    
    try {
      const supabase = createClient()
      
      const { error } = await supabase
        .from("laboratorium")
        .update({
          nama: values.nama,
          lantai: values.lantai,
          kapasitas: values.kapasitas,
          kalab: values.kalab,
          updated_at: new Date().toISOString()
        })
        .eq("id", lab.id)

      if (error) throw error

      toast({
        title: "Berhasil Mengubah",
        description: `Laboratorium ${values.nama} telah berhasil diperbarui`,
      })
      
      router.push('/lab')
      router.refresh()
    } catch (error) {
      toast({
        title: "Error",
        description: `Gagal memperbarui data: ${error.message}`,
        variant: "destructive"
      })
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="nama"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">Nama Laboratorium</FormLabel>
              <FormControl>
                <Input className="w-full" placeholder="Nama Laboratorium" {...field} />
              </FormControl>
              <FormMessage className="text-sm text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lantai"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">Lantai</FormLabel>
              <FormControl>
                <Input className="w-full" placeholder="Lantai" {...field} />
              </FormControl>
              <FormMessage className="text-sm text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="kapasitas"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">Kapasitas</FormLabel>
              <FormControl>
                <Input type="number" className="w-full" placeholder="Kapasitas" {...field} />
              </FormControl>
              <FormMessage className="text-sm text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="kalab"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">Kalab</FormLabel>
              <FormControl>
                <Input className="w-full" placeholder="Kalab" {...field} />
              </FormControl>
              <FormMessage className="text-sm text-red-500" />
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-3 pt-4">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => router.back()}
            disabled={isSubmitting}
          >
            Batal
          </Button>
          <Button 
            type="submit" 
            className="px-6"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Menyimpan..." : "Simpan"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
