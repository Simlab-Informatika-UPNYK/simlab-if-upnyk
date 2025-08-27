"use client";

import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { createLab } from "../actions";
import { FormLab } from "../_components/form-lab";

export function FormNewLab({ listKalab }) {
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function onSubmit(values) {
    setIsSubmitting(true);
    
    try {
      const result = await createLab(values);

      if (result.success) {
        toast({
          title: "Berhasil Menambahkan",
          description: `Laboratorium ${values.nama} telah berhasil ditambahkan`,
        });
        router.push("/admin/lab");
      } else {
        toast({
          title: "Gagal Menambahkan",
          description: result.error || "Terjadi kesalahan",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Terjadi kesalahan tak terduga",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <FormLab
      onSubmit={onSubmit}
      listKalab={listKalab}
      isSubmitting={isSubmitting}
      submitButtonText="Tambah Laboratorium"
    />
  );
}
