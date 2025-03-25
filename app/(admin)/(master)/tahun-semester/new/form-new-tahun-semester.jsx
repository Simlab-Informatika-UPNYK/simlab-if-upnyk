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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import slugify from "react-slugify";

// Updated schema for input data tahun semester
const formSchema = z.object({
  semester: z.enum(["Gasal", "Genap"]),
  tahun_ajaran: z.string().regex(/^\d{4}\/\d{4}$/, {
    message: "Format tahun harus seperti 2022/2023",
  }),
});

export function FormNewTahunSemester() {
  const { toast } = useToast();
  const router = useRouter();
  const [formError, setFormError] = useState("");

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { semester: "Gasal", tahun_ajaran: "" },
  });

  async function onSubmit(values) {
    try {
      setFormError(""); // Reset error message
      const supabase = createClient();

      const slugTahun = slugify(`${values.tahun_ajaran}-${values.semester}`);

      // Check if the tahun_semester with the same slug already exists
      const { data: existingData, error: checkError } = await supabase
        .from("tahun_semester")
        .select("slug")
        .eq("slug", slugTahun)
        .single();

      if (checkError && checkError.code !== "PGRST116") {
        // PGRST116 means no rows returned, which is what we want
        throw checkError;
      }

      if (existingData) {
        setFormError(
          "Tahun semester dengan kombinasi semester dan tahun ajaran ini sudah ada"
        );
        toast({
          variant: "destructive",
          title: "Gagal Menambahkan",
          description:
            "Tahun semester dengan kombinasi yang sama sudah ada di database",
        });
        return;
      }

      // Insert data into database
      const { error: insertError } = await supabase
        .from("tahun_semester")
        .insert({
          ...values,
          slug: slugTahun,
        });

      if (insertError) throw insertError;

      console.log("Successfully uploaded and saved!");

      toast({
        title: "Berhasil Menambahkan",
        description: `Semester ${values.semester} tahun ${values.tahun_ajaran} telah berhasil ditambahkan`,
      });
      router.push("/tahun-semester"); // Change this route as needed
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
          <FormField
            control={form.control}
            name="tahun_ajaran"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium">
                  Tahun Akademik
                </FormLabel>
                <FormControl>
                  <Input
                    className="w-full"
                    placeholder="Contoh 2022/2023"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-sm text-red-500" />
              </FormItem>
            )}
          />
        </div>
        <div className="flex justify-end pt-4">
          <Button type="submit" className="px-6">
            Tambahkan
          </Button>
        </div>
      </form>
    </Form>
  );
}
