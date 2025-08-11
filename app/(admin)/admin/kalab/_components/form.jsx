"use client";

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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { kalabFormSchema } from "./form-schema";
import Link from "next/link";
import { Loader2 } from "lucide-react";

export function KalabForm({
  onSubmit,
  defaultValues,
  isSubmitting,
  mode = "create"
}) {
  const form = useForm({
    resolver: zodResolver(kalabFormSchema),
    defaultValues
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {Object.keys(kalabFormSchema.shape).map((key) => (
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
          <Link href="/admin/kalab" passHref legacyBehavior>
            <Button type="button" variant="outline" as="a" disabled={isSubmitting}>
              Batal
            </Button>
          </Link>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {mode === "create" ? "Memproses..." : "Menyimpan..."}
              </>
            ) : (
              mode === "create" ? "Submit" : "Simpan Perubahan"
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
