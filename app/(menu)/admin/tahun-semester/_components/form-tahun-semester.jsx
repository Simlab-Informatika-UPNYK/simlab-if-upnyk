"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { tahunSemesterSchema, defaultValues } from "./form-schema";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";

export function FormTahunSemester({ initialData, onSubmitHandler, successMessage, successRedirect }) {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(tahunSemesterSchema),
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="tahun_ajaran"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tahun Ajaran</FormLabel>
                <FormControl>
                  <Input placeholder="Pastikan format penulisan benar" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="semester"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Semester</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih semester" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Gasal">Gasal</SelectItem>
                    <SelectItem value="Genap">Genap</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end pt-4">
          <Button type="submit">Simpan</Button>
        </div>
      </form>
    </Form>
  );
}
