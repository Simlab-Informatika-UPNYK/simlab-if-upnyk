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

// Schema for honor asisten data
const formSchema = z.object({
  jenis: z.string().min(1, { message: "Jenis honor harus diisi" }),
  biaya: z.preprocess(
    (arg) => (arg === "" ? undefined : Number(arg)),
    z.number({ invalid_type_error: "Biaya harus berupa angka" })
      .min(1, { message: "Biaya minimal 1" })
  ),
});

export function FormEditHonorAsisten({ honor }) {
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jenis: honor.jenis || "",
      biaya: honor.biaya || "",
    },
  });

  async function onSubmit(values) {
    setIsSubmitting(true);

    try {
      const supabase = createClient();

      const { error } = await supabase
        .from("honor_asisten")
        .update({
          jenis: values.jenis,
          biaya: values.biaya,
          updated_at: new Date().toISOString(),
        })
        .eq("id", honor.id);

      if (error) throw error;

      toast({
        title: "Berhasil Mengubah",
        description: `Honor ${values.jenis} telah berhasil diperbarui`,
      });

      router.push("/honor-asisten");
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
          name="jenis"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">Jenis Honor</FormLabel>
              <FormControl>
                <Input className="w-full" placeholder="Jenis Honor" {...field} />
              </FormControl>
              <FormMessage className="text-sm text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="biaya"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">Biaya</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  className="w-full" 
                  placeholder="Biaya" 
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
