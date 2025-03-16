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
import { createHonorJenis } from "../actions";

const formSchema = z.object({
  jenis: z.string().min(1, { message: "Jenis minimal 1 karakter" }),
  biaya: z.string().min(1, { message: "Biaya minimal 1" }),
});

export function FormNewHonorAsisten() {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { jenis: "", biaya: "" },
  });

  async function onSubmit(values) {
    try {
      await createHonorJenis({ jenis: values.jenis, biaya: values.biaya });
      toast({
        title: "Berhasil Menambahkan",
        description: `Data honor asisten telah berhasil ditambahkan`,
      });
      router.push("/honor-asisten"); // Change this route as needed
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Gagal Menambahkan",
        description: `${error.message}`,
      });
      console.error(error);
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
              <FormLabel className="text-sm font-medium">Jenis</FormLabel>
              <FormControl>
                <Input className="w-full" placeholder="Jenis" {...field} />
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
        <div className="flex justify-end pt-4">
          <Button type="submit" className="px-6">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
