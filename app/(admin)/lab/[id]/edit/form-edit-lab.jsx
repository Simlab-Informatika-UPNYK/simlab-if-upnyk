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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { editLab } from "../../actions";

// Same schema as create form
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
    z.number({ invalid_type_error: "Kalab harus diisi" })
  ),
});

export function FormEditLab({ lab, listKalab }) {
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nama: lab.nama || "",
      lantai: lab.lantai || "",
      kapasitas: lab.kapasitas || "",
      kalab: lab.kalab_id,
    },
  });

  async function onSubmit(values) {
    setIsSubmitting(true);

    try {
      const result = await editLab(lab.id, values);

      if (result.success) {
        toast({
          title: "Berhasil Mengubah",
          description: "Data kepala laboratorium berhasil diperbarui",
          variant: "default",
        });
        router.push("/lab");
      } else {
        toast({
          title: "Gagal Mengubah",
          description:
            result.error || "Terjadi kesalahan saat memperbarui data",
          variant: "destructive",
        });
      }
      toast({
        title: "Berhasil Mengubah",
        description: `Laboratorium ${values.nama} telah berhasil diperbarui`,
      });

      router.push("/lab");
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Silahkan pilih kepala lab" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {listKalab &&
                    listKalab.map((kalab) => (
                      <SelectItem key={kalab.id} value={kalab.id}>
                        {kalab.nama}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
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
