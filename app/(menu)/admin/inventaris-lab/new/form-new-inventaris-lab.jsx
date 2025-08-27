"use client"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"

const formSchema = z.object({
  nama: z.string().min(2, { message: "Nama minimal 2 karakter" }),
  jumlah: z.number().min(1, { message: "Jumlah minimal 1" }),
  tahun: z.number().min(2000, { message: "Tahun minimal 2000" }).max(new Date().getFullYear(), { message: "Tahun tidak valid" }),
  kondisi: z.string().min(2, { message: "Kondisi minimal 2 karakter" }),
})

export function FormNewInventarisLab() {
  const { toast } = useToast()
  const router = useRouter()

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { nama: "Komputer", jumlah: 30, tahun: 2020, kondisi: "Baik" },
  })

  async function onSubmit(values) {
    try {
      // ...submission logic for inventaris lab...
      toast({
        title: "Berhasil Menambahkan",
        description: `Inventaris ${values.nama} telah berhasil ditambahkan`,
      })
      router.push('/inventaris-lab') // Change this route as needed
    } catch (error) {
      console.error(error)
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
              <FormLabel className="text-sm font-medium">Nama</FormLabel>
              <FormControl>
                <Input className="w-full" placeholder="Nama" {...field} />
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
                <Input type="number" className="w-full" placeholder="Tahun" {...field} />
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
        <div className="flex justify-end pt-4">
          <Button type="submit" className="px-6">Submit</Button>
        </div>
      </form>
    </Form>
  )
}
