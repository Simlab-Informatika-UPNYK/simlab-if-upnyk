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
import { useState, useEffect } from "react";
import { createLab, getAllKalab } from "../actions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Updated schema for Laboratorium inputs
const formSchema = z.object({
  nama: z.string().min(2, { message: "Nama Laboratorium minimal 2 karakter" }),
  lantai: z.string().min(1, { message: "Lantai harus diisi" }),
  kapasitas: z.preprocess(
    (arg) => (arg === "" ? undefined : Number(arg)),
    z
      .number({ invalid_type_error: "Kapasitas harus berupa angka" })
      .min(1, { message: "Kapasitas minimal 1" })
  ),
  kalab: z.preprocess(
    (arg) => (arg === "" ? undefined : Number(arg)),
    z.number({ invalid_type_error: "Kalab harus diisi" }).optional()
  ),
});

export function FormNewLab({ listKalab }) {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { nama: "", lantai: "", kapasitas: "", kalab: "" },
  });

  async function onSubmit(values) {
    try {
      const result = await createLab(values);

      if (result.success) {
        toast({
          title: "Berhasil Menambahkan",
          description: `Laboratorium ${values.nama} telah berhasil ditambahkan`,
        });
        router.push("/admin/lab"); // Change this route as needed
      } else {
        toast({
          title: "Gagal Menambahkan",
          description: result.error || "Terjadi kesalahan",
          variant: "desctructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Terjadi kesalahan tak terduga",
        variant: "destructive",
      });
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
              <FormLabel className="text-sm font-medium">
                Nama Laboratorium
              </FormLabel>
              <FormControl>
                <Input
                  className="w-full"
                  placeholder="Nama Laboratorium"
                  {...field}
                />
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
                <Input
                  type="number"
                  className="w-full"
                  placeholder="Kapasitas"
                  {...field}
                />
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
              <Select
                onValueChange={field.onChange}
                value={field.value?.toString() || ""}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Silahkan pilih kepala lab" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {listKalab &&
                    listKalab.map((kalab) => (
                      <SelectItem key={kalab.id} value={kalab.id.toString()}>
                        {kalab.nama}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
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
