"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createMk } from "../actions";

// Updated schema for Mata Kuliah inputs
const formSchema = z.object({
  // kodeMK: z.string().min(2, { message: "Kode MK minimal 2 karakter" }),
  nama: z.string().min(2, { message: "Mata Kuliah minimal 2 karakter" }),
  semester: z.string().min(1, { message: "Semester harus diisi" }),
  jumlah_kelas: z.preprocess(
    (arg) => (arg === "" ? undefined : Number(arg)),
    z
      .number({ invalid_type_error: "Jumlah Kelas harus berupa angka" })
      .min(1, { message: "Jumlah Kelas minimal 1" })
  ),
});

export function FormNewMK() {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // kodeMK: "",
      nama: "",
      semester: "",
      jumlah_kelas: "",
    },
  });

  async function onSubmit(values) {
    try {
      const result = await createMk(values);
      if (result.success) {
        toast({
          title: "Berhasil Menambahkan",
          description: `Mata Kuliah ${values.nama} telah berhasil ditambahkan`,
        });
        router.push("/mk-praktikum");
      } else {
        toast({
          title: "Gagal Menambahkan",
          description: `Mata Kuliah ${values.nama} gagal ditambahkan`,
        });
      }
    } catch (error) {
      toast({
        title: "Gagal Menambahkan",
        description: `Mata Kuliah ini gagal ditambahkan`,
      });
      console.error(error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* <FormField
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
        /> */}
        <FormField
          control={form.control}
          name="nama"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">Mata Kuliah</FormLabel>
              <FormControl>
                <Input
                  className="w-full"
                  placeholder="Mata Kuliah"
                  {...field}
                />
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
          name="jumlah_kelas"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">
                Jumlah Kelas
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  className="w-full"
                  placeholder="Jumlah Kelas"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-sm text-red-500" />
            </FormItem>
          )}
        />
        <div className="flex justify-end pt-4">
          <Button type="submit" className="px-6">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
