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

// Updated schema for Laboratorium inputs
const formSchema = z.object({
  nama: z.string().min(2, { message: "Nama Laboratorium minimal 2 karakter" }),
  lantai: z.string().min(1, { message: "Lantai harus diisi" }),
  kapasitas: z.preprocess(arg => arg === "" ? undefined : Number(arg), z.number({ invalid_type_error: "Kapasitas harus berupa angka" }).min(1, { message: "Kapasitas minimal 1" })),
  kalab: z.string().min(2, { message: "Kalab harus diisi" })
})

export function FormNewLab() {
  const { toast } = useToast()
  const router = useRouter()

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { nama: "", lantai: "", kapasitas: "", kalab: "" },
  })

  async function onSubmit(values) {
    try {
      // ...submission logic for laboratorium...
      toast({
        title: "Berhasil Menambahkan",
        description: `Laboratorium ${values.nama} telah berhasil ditambahkan`,
      })
      router.push('/lab') // Change this route as needed
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
        <div className="flex justify-end pt-4">
          <Button type="submit" className="px-6">Submit</Button>
        </div>
      </form>
    </Form>
  )
}
