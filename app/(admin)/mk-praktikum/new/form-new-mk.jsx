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

// Updated schema for Mata Kuliah inputs
const formSchema = z.object({
  kodeMK: z.string().min(2, { message: "Kode MK minimal 2 karakter" }),
  mataKuliah: z.string().min(2, { message: "Mata Kuliah minimal 2 karakter" }),
  semester: z.string().min(1, { message: "Semester harus diisi" }),
  jumlahKelas: z.preprocess(arg => arg === "" ? undefined : Number(arg), z.number({ invalid_type_error: "Jumlah Kelas harus berupa angka" }).min(1, { message: "Jumlah Kelas minimal 1" })),
})

export function FormNewMK() {
  const { toast } = useToast()
  const router = useRouter()

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { kodeMK: "", mataKuliah: "", semester: "", jumlahKelas: "" },
  })

  async function onSubmit(values) {
    try {
      // ...submission logic for mata kuliah...
      toast({
        title: "Berhasil Menambahkan",
        description: `Mata Kuliah ${values.mataKuliah} telah berhasil ditambahkan`,
      })
      router.push('/mk-praktikum') // Change this route as needed
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="kodeMK"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">Kode MK</FormLabel>
              <FormControl>
                <Input className="w-full" placeholder="Kode MK" {...field} />
              </FormControl>
              <FormMessage className="text-sm text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="mataKuliah"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">Mata Kuliah</FormLabel>
              <FormControl>
                <Input className="w-full" placeholder="Mata Kuliah" {...field} />
              </FormControl>
              <FormMessage className="text-sm text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="semester"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">Semester</FormLabel>
              <FormControl>
                <Input className="w-full" placeholder="Semester" {...field} />
              </FormControl>
              <FormMessage className="text-sm text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="jumlahKelas"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">Jumlah Kelas</FormLabel>
              <FormControl>
                <Input type="number" className="w-full" placeholder="Jumlah Kelas" {...field} />
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
