"use client"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { useState } from "react"

// Updated schema for input data tahun semester
const formSchema = z.object({
  semester: z.enum(["Gasal", "Genap"]),
  tahun: z.string().regex(/^\d{4}\/\d{4}$/, { message: "Format tahun harus seperti 2022/2023" })
})

export function FormNewTahunSemester() {
  const { toast } = useToast()
  const router = useRouter()
  
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { semester: "Gasal", tahun: "" },
  })

  async function onSubmit(values) {
    try {
      // ...submission logic for tahun semester...
      toast({
        title: "Berhasil Menambahkan",
        description: `Semester ${values.semester} tahun ${values.tahun} telah berhasil ditambahkan`,
      })
      router.push('/aslab') // Change this route as needed
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="semester"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">Semester</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Pilih semester" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Gasal">Gasal</SelectItem>
                    <SelectItem value="Genap">Genap</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage className="text-sm text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tahun"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">Tahun Akademik</FormLabel>
                <FormControl>
                  <Input className="w-full" placeholder="2022/2023" {...field} />
                </FormControl>
                <FormMessage className="text-sm text-red-500" />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-end pt-4">
          <Button type="submit" className="px-6">Tambahkan</Button>
        </div>
      </form>
    </Form>
  )
}
