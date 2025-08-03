"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/utils/supabase/client"
import { useToast } from "@/hooks/use-toast"
import { Image } from "lucide-react"

// Components
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { LoadingButton } from "@/components/ui/loading-button"

const formSchema = z.object({
  nama: z.string().min(2, "Nama harus diisi minimal 2 karakter"),
  nim: z.string()
    .length(9, "NIM harus 9 digit")
    .regex(/^\d+$/, "NIM harus berupa angka"),
  email: z.string().email("Email tidak valid"),
  angkatan: z.string().min(1, "Pilih angkatan"),
  program_studi: z.string().min(1, "Pilih program studi"),
  pendidikan_terakhir: z.string().min(1, "Pilih pendidikan"),
  status: z.string().min(1, "Pilih status"),
  no_hp: z.string()
    .regex(/^\d*$/, "Nomor HP harus angka")
    .min(10, "Minimal 10 digit")
    .optional(),
  profile_picture: z.instanceof(File).optional()
})

export function NewAslabForm() {
  const { toast } = useToast()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nama: "",
      nim: "",
      email: "",
      angkatan: "",
      program_studi: "",
      pendidikan_terakhir: "",
      status: "",
      no_hp: "",
      profile_picture: undefined
    }
  })

  const onSubmit = async (values) => {
    try {
      setIsLoading(true)
      setError("")
      
      const supabase = createClient()
      let profileUrl = null

      // Handle image upload if exists
      if (values.profile_picture) {
        const file = values.profile_picture
        const fileExt = file.name.split('.').pop()
        const fileName = `${values.nim}.${fileExt}`

        const { error: uploadError } = await supabase.storage
          .from('profile-pictures')
          .upload(`aslab/${fileName}`, file, {
            cacheControl: '3600',
            upsert: true
          })

        if (uploadError) throw uploadError

        const { data: { publicUrl } } = supabase.storage
          .from('profile-pictures')
          .getPublicUrl(`aslab/${fileName}`)

        profileUrl = publicUrl
      }

      // Insert data
      const { error: insertError } = await supabase
        .from('aslab')
        .insert({
          ...values,
          profile_picture: profileUrl
        })

      if (insertError) throw insertError

      toast({
        title: "Berhasil",
        description: `Data ${values.nama} berhasil ditambahkan`
      })
      router.push('/aslab')

    } catch (err) {
      setError(err.message || "Terjadi kesalahan")
      console.error("Error:", err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <div className="grid md:flex md:flex-row-reverse gap-6">
          {/* Profile Picture */}
          <FormField
            control={form.control}
            name="profile_picture"
            render={({ field }) => (
              <FormItem className="flex flex-col md:w-1/2 items-center">
                <FormControl>
                  <label className="flex flex-col items-center gap-4 cursor-pointer">
                    <div className="h-40 w-40 flex items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-gray-300 bg-gray-50">
                      {field.value ? (
                        <img 
                          src={URL.createObjectURL(field.value)} 
                          alt="Preview" 
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="text-center">
                          <Image className="w-6 h-6 mx-auto" />
                          <FormLabel>Foto Profil</FormLabel>
                        </div>
                      )}
                    </div>
                    <Input 
                      type="file" 
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => field.onChange(e.target.files?.[0])}
                    />
                  </label>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Name and NIM */}
          <div className="flex flex-col gap-6 md:w-1/2">
            <FormField
              control={form.control}
              name="nama"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Asisten</FormLabel>
                  <FormControl>
                    <Input placeholder="Masukkan nama" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="nim"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>NIM</FormLabel>
                  <FormControl>
                    <Input placeholder="Masukkan NIM" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Masukkan email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Angkatan and Program Studi */}
        <div className="grid md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="angkatan"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Angkatan</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih angkatan" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {[2020, 2021, 2022, 2023, 2024].map(year => (
                      <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="program_studi"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Program Studi</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih program studi" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Sistem Informasi">Sistem Informasi</SelectItem>
                    <SelectItem value="Informatika">Informatika</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Pendidikan and Status */}
        <div className="grid md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="pendidikan_terakhir"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pendidikan Terakhir</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih pendidikan" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="sma">SMA</SelectItem>
                    <SelectItem value="smk">SMK</SelectItem>
                    <SelectItem value="ma">MA</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Aktif">Aktif</SelectItem>
                    <SelectItem value="Tidak Aktif">Tidak Aktif</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Phone Number */}
        <FormField
          control={form.control}
          name="no_hp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nomor HP</FormLabel>
              <FormControl>
                <Input placeholder="Masukkan nomor HP" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end pt-4">
          <LoadingButton type="submit" loading={isLoading}>
            Submit
          </LoadingButton>
        </div>
      </form>
    </Form>
  )
}
