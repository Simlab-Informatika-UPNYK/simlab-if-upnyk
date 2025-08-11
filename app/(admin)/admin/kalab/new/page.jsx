"use client";

import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { KalabForm } from "../_components/form";
import { createKalab } from "../actions";
import { useState } from "react";

export default function NewKalabPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (values) => {
    setIsSubmitting(true);
    try {
      await createKalab(values);
      toast({
        title: "Berhasil Menambahkan",
        description: "Data kepala laboratorium berhasil ditambahkan",
        variant: "success",
      });
      router.push("/admin/kalab");
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <KalabForm
      onSubmit={handleSubmit}
      defaultValues={{
        "Nama Lengkap": "",
        "NIDN/NIP": "",
        Email: "",
        "No Telepon": "",
      }}
      isSubmitting={isSubmitting}
      mode="create"
    />
  );
}
