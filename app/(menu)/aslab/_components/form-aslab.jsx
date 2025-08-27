"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { aslabFormSchema } from "./form-schema";

export function AslabForm({ onSubmit, children, defaultValues }) {
  const form = useForm({
    resolver: zodResolver(aslabFormSchema),
    defaultValues: defaultValues || {
      nama: "",
      nim: "",
      email: "",
      angkatan: "",
      program_studi: "",
      pendidikan_terakhir: "SMA",
      status: "Aktif",
      no_hp: "",
      profile_picture: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:flex md:flex-row-reverse gap-6">
          <FormField
            control={form.control}
            name="profile_picture"
            render={({ field }) => (
              <FormItem className="flex flex-col md:w-1/2 items-center justify-center">
                <FormControl>
                  <div className="flex flex-col gap-2 w-full">
                    <Input
                      type="url"
                      placeholder="Masukkan URL gambar profil"
                      {...field}
                    />
                    {field.value && (
                      <div className="flex h-40 w-40 items-center justify-center overflow-hidden rounded-full border-2 border-gray-300 bg-gray-50">
                        <img
                          src={field.value}
                          alt="Profile preview"
                          className="h-full w-full object-cover"
                        />
                      </div>
                    )}
                  </div>
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
                      minLength={9}
                      maxLength={9}
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
                    <SelectItem value="Informatika">Informatika</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage className="text-sm text-red-500" />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* <FormField
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
          /> */}

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

        {children}
      </form>
    </Form>
  );
}
