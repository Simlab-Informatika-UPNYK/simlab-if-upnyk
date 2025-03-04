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
import { createClient } from "@/utils/supabase/client";

const formSchema = z.object({
  nama_lengkap: z
    .string()
    .min(2, { message: "Nama lengkap minimal 2 karakter" }),
  email: z.string().email({ message: "Email tidak valid" }),
  peran: z.string().min(1, { message: "Peran harus diisi" }),
  status: z.string().min(1, { message: "Status harus diisi" }),
  tgl_daftar: z.string().optional(),
  tgl_login_terakhir: z.string().optional(),
});

export function FormEditUser({ user }) {
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nama_lengkap: user.nama_lengkap || "",
      email: user.email || "",
      peran: user.peran || "",
      status: user.status || "",
      tgl_daftar: user.tgl_daftar || "",
      tgl_login_terakhir: user.tgl_login_terakhir || "",
    },
  });

  async function onSubmit(values) {
    setIsSubmitting(true);

    try {
      const supabase = createClient();

      const { error } = await supabase
        .from("users")
        .update({
          nama_lengkap: values.nama_lengkap,
          email: values.email,
          peran: values.peran,
          status: values.status,
          tgl_daftar: values.tgl_daftar,
          tgl_login_terakhir: values.tgl_login_terakhir,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id);

      if (error) throw error;

      toast({
        title: "Berhasil Mengubah",
        description: `Data pengguna ${values.nama_lengkap} telah berhasil diperbarui`,
      });

      router.push("/user");
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
          name="nama_lengkap"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">
                Nama Lengkap
              </FormLabel>
              <FormControl>
                <Input
                  className="w-full"
                  placeholder="Nama Lengkap"
                  {...field}
                />
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
                <Input
                  className="w-full"
                  placeholder="Email"
                  type="email"
                  {...field}
                />
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
              <FormLabel className="text-sm font-medium">
                Tanggal Daftar
              </FormLabel>
              <FormControl>
                <Input className="w-full" type="date" {...field} />
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
              <FormLabel className="text-sm font-medium">
                Tanggal Login Terakhir
              </FormLabel>
              <FormControl>
                <Input className="w-full" type="date" {...field} />
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
