"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast"; // Import toast component

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Image, User, User2 } from "lucide-react";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";

const formSchema = z.object({
  nama: z.string().min(2, { message: "Nama harus diisi minimal 2 karakter" }),
  nim: z
    .string()
    .length(9, { message: "NIM harus berupa 9 angka" })
    .refine((val) => /^\d+$/.test(val), { message: "NIM harus berupa angka" }),
  email: z.string().email({ message: "Email harus valid" }),
  angkatan: z.string().min(2, { message: "Pilih tahun angkatan" }),
  program_studi: z.string().min(2, { message: "Pilih program studi" }),
  pendidikan_terakhir: z
    .union([
      z.string().min(2, { message: "Pilih pendidikan terakhir" }),
      z.null(),
    ])
    .optional(),
  status: z.string().min(2, { message: "Pilih status" }),
  no_hp: z
    .union([
      z.string().length(0),
      z
        .string()
        .min(10, { message: "Nomor HP minimal 10 digit" })
        .refine((val) => /^\d+$/.test(val), {
          message: "Nomor HP harus berupa angka",
        }),
    ])
    .optional()
    .transform((e) => (e === null ? undefined : e)),
  profile_picture: z
    .union([z.instanceof(File), z.string(), z.null(), z.undefined()])
    .optional(),
});

export function FormEdit({ data }) {
  const [formError, setFormError] = useState("");
  const router = useRouter();
  const [message, setMessage] = useState({});
  const [open, setOpen] = useState(false);

  // console.log("data" ,data)
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nama: data.nama,
      nim: data.nim,
      email: data.email,
      angkatan: data.angkatan,
      program_studi: data.program_studi,
      pendidikan_terakhir: data.pendidikan_terakhir,
      status: data.status,
      profile_picture: data.profile_picture,
    },
  });

  async function onSubmit(values) {
    try {
      setFormError(""); // Reset error message
      const supabase = createClient();

      // Upload image to storage if it exists
      let profileUrl = null;
      console.log(values);
      if (
        typeof values.profile_picture === "object" &&
        values.profile_picture !== null
      ) {
        const file = values.profile_picture;
        const fileExt = file.name.split(".").pop();
        const fileName = `${values.nim}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from("profile-pictures") // your bucket name
          .update(`aslab/${fileName}`, file, {
            cacheControl: "3600",
            upsert: true,
          });

        if (uploadError) {
          throw uploadError;
        }

        // Get the public URL
        const {
          data: { publicUrl },
        } = supabase.storage
          .from("profile-pictures")
          .getPublicUrl(`aslab/${fileName}`);

        profileUrl = publicUrl;

        console.log(publicUrl);
      }
      // // Insert data into database
      const { error: insertError } = await supabase
        .from("aslab")
        .update({
          ...values,
          profile_picture: profileUrl || values.profile_picture,
        })
        .eq("id_aslab", data.id_aslab);

      if (insertError) throw insertError;

      // Show success notification
      toast({
        title: "Berhasil mengupdate data",
        description: `Data asisten ${values.nama} berhasil diperbarui`,
        variant: "success",
      });

      // Redirect back to the detail page
      router.push(`/aslab`);
    } catch (error) {
      console.error("Error:", error);

      // Show error toast
      toast({
        title: "Gagal mengupdate data",
        description:
          error.message || "Terjadi kesalahan saat mengupdate data asisten",
        variant: "destructive",
      });

      if (error.message && error.message.toLowerCase().includes("null")) {
        setFormError("Data tidak boleh kosong");
      } else {
        setFormError(
          error.message || "Terjadi kesalahan saat menambahkan asisten baru"
        );
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="mb-6"></div>
        <div className="grid grid-cols-1 md:flex md:flex-row-reverse gap-6">
          <FormField
            control={form.control}
            name="profile_picture"
            render={({ field }) => (
              <FormItem className="flex flex-col md:w-1/2 items-center justify-center">
                <FormControl>
                  <label
                    className="flex flex-col items-center gap-4"
                    htmlFor="profile_picture"
                  >
                    <div className="flex h-40 w-40 items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-gray-300 bg-gray-50">
                      {field.value ? (
                        <img
                          src={
                            typeof field.value === "string"
                              ? field.value
                              : URL.createObjectURL(field.value)
                          }
                          alt="Profile preview"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="">
                          <div className="h-6 mx-auto w-6 flex justify-center">
                            <Image className="w-full h-full" />
                          </div>
                          <FormLabel>Foto Profil</FormLabel>
                        </div>
                      )}
                    </div>
                    <Input
                      type="file"
                      id="profile_picture"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => field.onChange(e.target.files[0])}
                    />
                  </label>
                </FormControl>
                <FormMessage className="text-sm text-red-500" />
              </FormItem>
            )}
          />
          <div className="flex gap-6 flex-col md:w-1/2">
            <FormField
              control={form.control}
              name="nama"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">
                    Nama Asisten
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="w-full"
                      placeholder="Masukkan nama"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-sm text-red-500" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="nim"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">NIM</FormLabel>
                  <FormControl>
                    <Input
                      className="w-full"
                      placeholder="Masukkan NIM"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-sm text-red-500" />
                </FormItem>
              )}
            />
          </div>
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">Email</FormLabel>
              <FormControl>
                <Input
                  className="w-full"
                  placeholder="Masukkan email"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-sm text-red-500" />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="angkatan"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">Angkatan</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Pilih tahun angkatan" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {[2020, 2021, 2022, 2023, 2024].map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage className="text-sm text-red-500" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="program_studi"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">
                  Program Studi
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Pilih program studi" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Sistem Informasi">
                      Sistem Informasi
                    </SelectItem>
                    <SelectItem value="Informatika">
                      Teknik Informatika
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage className="text-sm text-red-500" />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="pendidikan_terakhir"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">
                  Pendidikan Terakhir
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Pilih pendidikan terakhir" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="sma">SMA</SelectItem>
                    <SelectItem value="smk">SMK</SelectItem>
                    <SelectItem value="ma">MA</SelectItem>
                  </SelectContent>
                </Select>
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
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Pilih status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Aktif">Aktif</SelectItem>
                    <SelectItem value="Tidak Aktif">Tidak Aktif</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage className="text-sm text-red-500" />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end pt-4">
          <Button type="submit" className="px-6">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
