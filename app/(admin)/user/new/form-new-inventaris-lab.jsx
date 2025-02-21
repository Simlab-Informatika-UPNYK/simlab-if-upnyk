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
  nama_lengkap: z.string().min(2, { message: "Nama minimal 2 karakter" }),
  email: z.string().email({ message: "Email tidak valid" }),
  peran: z.string().min(2, { message: "Peran minimal 2 karakter" }),
  status: z.string().min(2, { message: "Status minimal 2 karakter" }),
  tgl_daftar: z.string(),
  tgl_login_terakhir: z.string(),
})

export function FormNewInventarisLab() {
  const { toast } = useToast()
  const router = useRouter()

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { nama_lengkap: "", email: "", peran: "", status: "", tgl_daftar: "", tgl_login_terakhir: "" },
  })

  async function onSubmit(values) {
    try {
      // ...submission logic for inventaris lab...
      toast({
        title: "Berhasil Menambahkan",
        description: `Inventaris ${values.nama_lengkap} telah berhasil ditambahkan`,
      })
      router.push('/honor-asisten')
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="nama_lengkap"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">Nama Lengkap</FormLabel>
              <FormControl>
                <Input className="w-full" placeholder="Nama Lengkap" {...field} />
              </FormControl>
              <FormMessage className="text-sm text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">Email</FormLabel>
              <FormControl>
                <Input type="email" className="w-full" placeholder="Email" {...field} />
              </FormControl>
              <FormMessage className="text-sm text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="peran"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">Peran</FormLabel>
              <FormControl>
                <Input className="w-full" placeholder="Peran" {...field} />
              </FormControl>
              <FormMessage className="text-sm text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">Status</FormLabel>
              <FormControl>
                <Input className="w-full" placeholder="Status" {...field} />
              </FormControl>
              <FormMessage className="text-sm text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tgl_daftar"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">Tanggal Daftar</FormLabel>
              <FormControl>
                <Input type="date" className="w-full" placeholder="Tanggal Daftar" {...field} />
              </FormControl>
              <FormMessage className="text-sm text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tgl_login_terakhir"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">Tanggal Login Terakhir</FormLabel>
              <FormControl>
                <Input type="date" className="w-full" placeholder="Tanggal Login Terakhir" {...field} />
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
