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
import { createClient } from "@/utils/supabase/client";

// Updated schema for dosen pengampu
const formSchema = z.object({
  nama: z.string().min(2, { message: "Nama minimal 2 karakter" }),
  nip: z.string().min(1, { message: "NIP harus diisi" }),
  mata_kuliah: z.string().min(2, { message: "Mata kuliah harus diisi" }),
  kelas: z.string().min(1, { message: "Kelas harus diisi" }),
});

export function FormEditDosenPengampu({ dosen }) {
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nama: dosen.nama || "",
      nip: dosen.nip || "",
      mata_kuliah: dosen.mata_kuliah || "",
      kelas: dosen.kelas || "",
    },
  });

  async function onSubmit(values) {
    setIsSubmitting(true);

    try {
      const supabase = createClient();

      const { error } = await supabase
        .from("dosen_pengampu")
        .update({
          nama: values.nama,
          nip: values.nip,
          mata_kuliah: values.mata_kuliah,
          kelas: values.kelas,
          updated_at: new Date().toISOString(),
        })
        .eq("id", dosen.id);

      if (error) throw error;

      toast({
        title: "Berhasil Mengubah",
        description: `Data dosen ${values.nama} telah berhasil diperbarui`,
      });

      router.push("/dosen-pengampu");
      router.refresh();
    } catch (error) {
      toast({
        title: "Error",
        description: `Gagal memperbarui data: ${error.message}`,
        variant: "destructive",
      });
      console.error(error);
    } finally {
      setIsSubmitting(false);
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
              <FormLabel className="text-sm font-medium">Nama</FormLabel>
              <FormControl>
                <Input className="w-full" placeholder="Nama Dosen" {...field} />
              </FormControl>
              <FormMessage className="text-sm text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="nip"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">NIP</FormLabel>
              <FormControl>
                <Input className="w-full" placeholder="NIP" {...field} />
              </FormControl>
              <FormMessage className="text-sm text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="mata_kuliah"
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
          name="kelas"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">Kelas</FormLabel>
              <FormControl>
                <Input className="w-full" placeholder="Kelas" {...field} />
              </FormControl>
              <FormMessage className="text-sm text-red-500" />
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={isSubmitting}
          >
            Batal
          </Button>
          <Button type="submit" className="px-6" disabled={isSubmitting}>
            {isSubmitting ? "Menyimpan..." : "Simpan"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
