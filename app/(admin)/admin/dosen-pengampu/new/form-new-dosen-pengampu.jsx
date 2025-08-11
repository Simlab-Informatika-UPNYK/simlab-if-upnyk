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
import { createDosen } from "../actions";

// Updated schema for Dosen Pengampu inputs
const formSchema = z.object({
  nama: z.string().min(2, { message: "Nama minimal 2 karakter" }),
  nip: z.string().min(2, { message: "NIP minimal 2 karakter" }),
  email: z.string().min(2, { message: "Mata Kuliah minimal 2 karakter" }),
});

export function FormNewDosenPengampu() {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { nama: "", nip: "", email: "", kelas: "" },
  });

  async function onSubmit(values) {
    try {
      const result = await createDosen(values);
      if (result.success) {
        toast({
          title: "Berhasil Menambahkan",
          description: `Dosen Pengampu ${values.nama} telah berhasil ditambahkan`,
        });
        router.push("/dosen-pengampu"); // Change this route as needed
      } else {
        toast({
          title: "Gagal Menambahkan",
          description: `Dosen Pengampu gagal ditambahkan`,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: `Dosen Pengampu gagal ditambahkan`,
      });
      console.error(error);
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
                <Input className="w-full" placeholder="Nama" {...field} />
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">Email</FormLabel>
              <FormControl>
                <Input
                  className="w-full"
                  placeholder="Email"
                  {...field}
                />
              </FormControl>
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
