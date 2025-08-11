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
import { editKalab } from "../../actions";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Loader2 } from "lucide-react";

// Schema with keys matching the required fields
const formSchema = z.object({
  "Nama Lengkap": z.string().min(1, { message: "Harap isi Nama Lengkap" }),
  "NIDN/NIP": z.string().min(1, { message: "Harap isi NIDN/NIP" }),
  Email: z.string().email({ message: "Email tidak valid" }),
  "No Telepon": z.string().min(1, { message: "Harap isi No Telepon" }),
});

export function FormEdit({ data }) {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      "Nama Lengkap": data.nama,
      "NIDN/NIP": data.nip,
      Email: data.email,
      "No Telepon": data.no_hp,
    },
  });

  async function onSubmit(values) {
    setIsLoading(true);
    try {
      const result = await editKalab(data.slug, values);

      if (result.success) {
        toast({
          title: "Berhasil Mengubah",
          description: "Data kepala laboratorium berhasil diperbarui",
          variant: "default",
        });
        router.push("/kalab");
      } else {
        toast({
          title: "Gagal Mengubah",
          description:
            result.error || "Terjadi kesalahan saat memperbarui data",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Terjadi kesalahan tak terduga",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {Object.keys(formSchema.shape).map((key) => (
          <FormField
            key={key}
            control={form.control}
            name={key}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">{key}</FormLabel>
                <FormControl>
                  <Input
                    className="w-full"
                    placeholder={key}
                    {...field}
                    type={key === "Email" ? "email" : "text"}
                  />
                </FormControl>
                <FormMessage className="text-sm text-red-500" />
              </FormItem>
            )}
          />
        ))}
        <div className="flex justify-end gap-2 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/kalab")}
            disabled={isLoading}
          >
            Batal
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Menyimpan...
              </>
            ) : (
              "Simpan Perubahan"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
