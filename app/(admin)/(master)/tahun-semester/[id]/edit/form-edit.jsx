"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
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
import { createClient } from "@/utils/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  tahun_ajaran: z
    .string()
    .min(4, { message: "Tahun harus diisi minimal 4 karakter" }),
  semester: z.string().min(1, { message: "Semester harus diisi" }),
});

export function FormEdit({ data }) {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tahun_ajaran: data.tahun_ajaran,
      semester: data.semester,
    },
  });

  async function onSubmit(values) {
    try {
      const supabase = createClient();

      const result = await supabase
        .from("tahun_semester")
        .update(values)
        .eq("id", data.id);

      if (result.error)
        throw toast({
          title: "Gagal Mengubah",
          description:
            result.error || "Terjadi kesalahan saat memperbarui data",
          variant: "destructive",
        });

      toast({
        title: "Berhasil mengupdate",
        description: "Data Tahun Semester berhaisl diperbarui",
        variant: "default",
      });
      router.push("/tahun-semester");
      router.refresh();
    } catch (error) {
      toast({
        title: "Error",
        description: `Gagal memperbarui data: ${error.message}`,
        variant: "destructive",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="tahun_ajaran"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">Tahun</FormLabel>
                <FormControl>
                  <Input
                    className="w-full"
                    placeholder="Masukkan tahun"
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
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
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
        </div>

        <div className="flex justify-end pt-4">
          <Button type="submit" className="px-6">
            Simpan Perubahan
          </Button>
        </div>
      </form>
    </Form>
  );
}
