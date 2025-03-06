"use client"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { createKalab } from "../actions"

// Schema with keys matching the required fields
const formSchema = z.object({
  "Nama Lengkap": z.string().min(1, { message: "Harap isi Nama Lengkap" }),
  "NIDN/NIP": z.string().min(1, { message: "Harap isi NIDN/NIP" }),
  // "Jabatan": z.string().min(1, { message: "Harap isi Jabatan" }),
  "Email": z.string().email({ message: "Email tidak valid" }),
  "No Telepon": z.string().min(1, { message: "Harap isi No Telepon" }),
})

export function FormNew() {
  const { toast } = useToast()
  const router = useRouter()

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      "Nama Lengkap": "",
      "NIDN/NIP": "",
      // "Jabatan": "",
      "Email": "",
      "No Telepon": ""
    },
  })

  async function onSubmit(values) {
    try {
      // Call the server action to create a new kalab entry
      const result = await createKalab(values);
      
      if (result.success) {
        toast({
          title: "Berhasil Menambahkan",
          description: `Data kepala laboratorium berhasil ditambahkan`,
          variant: "success"
        })
        router.push('/kalab')
      } else {
        toast({
          title: "Gagal Menambahkan",
          description: result.error || "Terjadi kesalahan saat menambahkan data",
          variant: "destructive"
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Terjadi kesalahan tak terduga",
        variant: "destructive"
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {Object.keys(formSchema.shape).map((key) => (
          <FormField
            key={key}
            control={form.control}
            name={key}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">{key}</FormLabel>
                <FormControl>
                  <Input
                    className="w-full"
                    placeholder={key}
                    {...field}
                    type={ key === "Email" ? "email" : "text" }
                  />
                </FormControl>
                <FormMessage className="text-sm text-red-500" />
              </FormItem>
            )}
          />
        ))}
        <div className="flex justify-end pt-4">
          <Button type="submit" className="px-6">Submit</Button>
        </div>
      </form>
    </Form>
  )
}
