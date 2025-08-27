"use client";

import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { editLab } from "../../actions";
import { FormLab } from "../../_components/form-lab";

export function FormEditLab({ lab, listKalab }) {
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function onSubmit(values) {
    setIsSubmitting(true);

    try {
      const result = await editLab(lab.id, values);

      if (result.success) {
        toast({
          title: "Berhasil Mengubah",
          description: `Laboratorium ${values.nama} telah berhasil diperbarui`,
        });
        router.push("/admin/lab");
        router.refresh();
      } else {
        toast({
          title: "Gagal Mengubah",
          description: result.error || "Terjadi kesalahan saat memperbarui data",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: `Gagal memperbarui data: ${error.message}`,
        variant: "destructive",
      });
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <FormLab
      onSubmit={onSubmit}
      defaultValues={{
        nama: lab.nama || "",
        lantai: lab.lantai || "",
        kapasitas: lab.kapasitas || "",
        kalab: lab.kalab_id,
      }}
      listKalab={listKalab}
      isSubmitting={isSubmitting}
      submitButtonText="Simpan Perubahan"
    />
  );
}
