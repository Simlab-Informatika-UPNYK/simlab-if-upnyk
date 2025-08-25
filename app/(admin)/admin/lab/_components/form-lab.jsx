"use client";

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
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { labFormSchema } from "./form-schema";

export function FormLab({
  onSubmit,
  defaultValues,
  listKalab,
  isSubmitting = false,
  submitButtonText = "Submit",
}) {
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(labFormSchema),
    defaultValues: {
      nama: "",
      lantai: "",
      kapasitas: "",
      kalab: undefined,
      ...defaultValues,
    },
  });

  async function handleSubmit(values) {
    try {
      await onSubmit(values);
    } catch (error) {
      toast({
        title: "Error",
        description: "Terjadi kesalahan tak terduga",
        variant: "destructive",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
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
              <Select
                onValueChange={field.onChange}
                value={field.value?.toString() || ""}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Silahkan pilih kepala lab" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {listKalab &&
                    listKalab.map((kalab) => (
                      <SelectItem key={kalab.id} value={kalab.id.toString()}>
                        {kalab.nama}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <FormMessage className="text-sm text-red-500" />
            </FormItem>
          )}
        />
        <div className="flex justify-end pt-4">
          <Button type="submit" className="px-6" disabled={isSubmitting}>
            {isSubmitting ? "Menyimpan..." : submitButtonText}
          </Button>
        </div>
      </form>
    </Form>
  );
}
