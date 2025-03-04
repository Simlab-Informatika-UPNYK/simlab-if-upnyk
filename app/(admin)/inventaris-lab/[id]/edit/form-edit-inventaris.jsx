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

const formSchema = z.object({
  nama: z.string().min(2, { message: "Nama inventaris minimal 2 karakter" }),
  jumlah: z.preprocess(arg => arg === "" ? undefined : Number(arg), z.number({ invalid_type_error: "Jumlah harus berupa angka" }).min(1, { message: "Jumlah minimal 1" })),
  tahun: z.preprocess(arg => arg === "" ? undefined : Number(arg), z.number({ invalid_type_error: "Tahun harus berupa angka" })),
  kondisi: z.string().min(1, { message: "Kondisi harus diisi" })
})

export function FormEditInventaris({ inventaris }) {
  
  const { toast } = useToast()
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nama: inventaris.nama || "",
      jumlah: inventaris.jumlah || "",
      tahun: inventaris.tahun || "",
      kondisi: inventaris.kondisi || ""
    },
  })

  async function onSubmit(values) {
    setIsSubmitting(true)
    
    try {
      const supabase = createClient()
      
      const { error } = await supabase
        .from("inventaris")
        .update({
          nama: values.nama,
          jumlah: values.jumlah,
          tahun: values.tahun,
          kondisi: values.kondisi,
          updated_at: new Date().toISOString()
        })
        .eq("id", lab.id)

      if (error) throw error

      toast({
        title: "Berhasil Mengubah",
        description: `Inventaris ${values.nama} telah berhasil diperbarui`,
      })
      
      router.push('/inventaris-lab')
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
              <FormLabel className="text-sm font-medium">Nama Inventaris</FormLabel>
              <FormControl>
                <Input className="w-full" placeholder="Nama Inventaris" {...field} />
              </FormControl>
              <FormMessage className="text-sm text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="jumlah"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">Jumlah</FormLabel>
              <FormControl>
                <Input type="number" className="w-full" placeholder="Jumlah" {...field} />
              </FormControl>
              <FormMessage className="text-sm text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tahun"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">Tahun</FormLabel>
              <FormControl>
                <Input type="number" className="w-full" placeholder="Tahun Inventaris" {...field} />
              </FormControl>
              <FormMessage className="text-sm text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="kondisi"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">Kondisi</FormLabel>
              <FormControl>
                <Input className="w-full" placeholder="Kondisi" {...field} />
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
