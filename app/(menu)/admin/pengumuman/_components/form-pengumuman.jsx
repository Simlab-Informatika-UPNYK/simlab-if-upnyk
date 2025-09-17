"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { pengumumanSchema, defaultValues } from "./form-schema";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

export function FormPengumuman({ initialData, onSubmitHandler, successMessage, successRedirect }) {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(pengumumanSchema),
    defaultValues: initialData || defaultValues,
  });

  async function onSubmit(values) {
    try {
      await onSubmitHandler(values);

      toast({
        title: "Berhasil",
        description: successMessage,
        variant: "success",
      });

      if (successRedirect) {
        router.push(successRedirect);
        router.refresh();
      }
    } catch (error) {
      toast({
        title: "Gagal",
        description: error.message,
        variant: "destructive",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-8">
        <FormField
          control={form.control}
          name="judul"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Judul Pengumuman</FormLabel>
              <FormControl>
                <Input placeholder="Masukkan judul pengumuman" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isi"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Isi Pengumuman</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Tulis isi pengumuman di sini..." 
                  className="min-h-32"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="active"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  Aktifkan Pengumuman
                </FormLabel>
                <p className="text-sm text-muted-foreground">
                  Pengumuman akan ditampilkan di dashboard jika aktif
                </p>
              </div>
            </FormItem>
          )}
        />

        <div className="flex justify-end pt-4">
          <Button type="submit">Simpan</Button>
        </div>
      </form>
    </Form>
  );
}
