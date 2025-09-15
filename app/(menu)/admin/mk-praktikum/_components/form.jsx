"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { mkPraktikumSchema } from "./form-schema";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";

export default function MkPraktikumForm({ initialData, onSubmit, isEditing = false }) {
  const form = useForm({
    resolver: zodResolver(mkPraktikumSchema),
    defaultValues: initialData || {
      kode_mk: 0,
      nama: "",
    },
  });

  const router = useRouter();

  const handleSubmit = async (data) => {
    try {
      await onSubmit(data);
      router.push("/admin/mk-praktikum");
    } catch (error) {
      throw new Error("Terjadi kesalahan");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="kode_mk"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">Kode Mata Kuliah</FormLabel>
              <FormControl>
                <Input className="w-full" placeholder="Kode mata kuliah" {...field} />
              </FormControl>
              <FormMessage className="text-sm text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="nama"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">Nama</FormLabel>
              <FormControl>
                <Input className="w-full" placeholder="Nama mata kuliah" {...field} />
              </FormControl>
              <FormMessage className="text-sm text-red-500" />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Menyimpan..." : "Simpan"}
        </Button>
      </form>
    </Form>
  );
}
