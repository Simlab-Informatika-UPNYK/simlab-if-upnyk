"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useParams, useRouter } from "next/navigation";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { addInventaris, updateInventaris } from "../../actions";
import { getLabIdBySlug } from "../actions";

const formSchema = z.object({
  nama: z.string().nonempty(),
  tahun: z.coerce.number(),
  kondisi: z.string(),
  keterangan: z.string().optional(),
});

export default function InventoryForm({ mode = "add", initialData = {}, onSuccess }) {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues:
      mode === "edit"
        ? {
            nama: initialData.nama || "",
            tahun: initialData.tahun || new Date().getFullYear(),
            kondisi: initialData.kondisi || "",
            keterangan: initialData.keterangan || "",
          }
        : {
            nama: "",
            tahun: new Date().getFullYear(),
            kondisi: "",
            keterangan: "",
          },
  });

  async function onSubmit(values) {
    setIsSubmitting(true);

    try {
      const labResult = await getLabIdBySlug(params.id);
      if (!labResult.success) throw new Error(labResult.error);

      const payload = {
        ...values,
        labId: labResult.data,
      };

      if (mode === "add") {
        const result = await addInventaris(payload);
        if (!result.success) throw new Error(result.error);
        toast({
          title: "Berhasil Menambahkan",
          description: `Inventaris baru berhasil ditambahkan`,
        });
      } else {
        const result = await updateInventaris(initialData.id, payload);
        if (!result.success) throw new Error(result.error);
        toast({
          title: "Berhasil Mengubah",
          description: `Inventaris berhasil diperbarui`,
        });
      }

      onSuccess?.();
      router.push(`/admin/inventaris-lab/${params.id}`);
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">{mode === "add" ? "Tambah Inventaris Baru" : "Edit Inventaris"}</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="nama"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tahun"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tahun</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="kondisi"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Kondisi</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="keterangan"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Keterangan</FormLabel>
                <FormControl>
                  <Input placeholder="Keterangan" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push(`/admin/inventaris-lab/${params.id}`)}
              disabled={isSubmitting}
            >
              Batal
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Menyimpan..." : mode === "add" ? "Tambah" : "Simpan"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
