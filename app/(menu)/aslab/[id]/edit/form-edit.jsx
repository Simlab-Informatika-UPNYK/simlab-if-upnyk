"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { AslabForm } from "../../_components/form-aslab";
import { updateAslab } from "../../actions";

export function FormEdit({ data }) {
  const [formError, setFormError] = useState("");
  const router = useRouter();

  async function onSubmit(values) {
    try {
      setFormError("");
      const result = await updateAslab(data.id_aslab, values);
      
      if (result?.error) {
        throw new Error(result.error);
      }

      toast({
        title: "Berhasil mengupdate data",
        description: `Data asisten ${values.nama} berhasil diperbarui`,
        variant: "success",
      });

      router.push(`/aslab`);
    } catch (error) {
      toast({
        title: "Gagal mengupdate data",
        description: error.message || "Terjadi kesalahan saat mengupdate data asisten",
        variant: "destructive",
      });
      setFormError(error.message || "Terjadi kesalahan saat menambahkan asisten baru");
    }
  }

  return (
    <AslabForm 
      onSubmit={onSubmit}
      defaultValues={{
        nama: data?.nama || "",
        nim: data?.nim || "",
        email: data?.email || "",
        angkatan: data?.angkatan || "",
        program_studi: data?.program_studi || "",
        pendidikan_terakhir: data?.pendidikan_terakhir || "",
        status: data?.status || "",
        profile_picture: data?.profile_picture || ""
      }}
    >
      <div className="flex justify-end pt-4">
        <Button type="submit" className="px-6">
          Submit
        </Button>
      </div>
    </AslabForm>
  );
}
