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

// Schema for MK Praktikum
const formSchema = z.object({
  kode_mk: z.string().min(2, { message: "Kode MK minimal 2 karakter" }),
  mata_kuliah: z.string().min(2, { message: "Mata Kuliah minimal 2 karakter" }),
  semester: z.string().min(1, { message: "Semester harus diisi" }),
  jumlah_kelas: z.preprocess(
    (arg) => (arg === "" ? undefined : Number(arg)),
    z
      .number({ invalid_type_error: "Jumlah Kelas harus berupa angka" })
      .min(1, { message: "Jumlah Kelas minimal 1" })
  ),
});

export function FormEditMK({ mk }) {
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      kode_mk: mk.kode_mk || "",
      mata_kuliah: mk.mata_kuliah || "",
      semester: mk.semester || "",
      jumlah_kelas: mk.jumlah_kelas || "",
    },
  });

  async function onSubmit(values) {
    setIsSubmitting(true);

    try {
      const supabase = createClient();

      const { error } = await supabase
        .from("mk_praktikum")
        .update({
          kode_mk: values.kode_mk,
          mata_kuliah: values.mata_kuliah,
          semester: values.semester,
          jumlah_kelas: values.jumlah_kelas,
          updated_at: new Date().toISOString(),
        })
        .eq("id", mk.id);

      if (error) throw error;

      toast({
        title: "Berhasil Mengubah",
        description: `Mata Kuliah ${values.mata_kuliah} telah berhasil diperbarui`,
      });

      router.push("/mk-praktikum");
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
          name="kode_mk"
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
          name="jumlah_kelas"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">Jumlah Kelas</FormLabel>
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
