"use client";

import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { AslabForm } from "../../_components/form-aslab";
import { updateAslab } from "../../actions";

export function FormEdit({ data }) {
  const router = useRouter();

  async function onSubmit(values) {
    try {
      console.log("value", values.nama);
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
        status: data?.status || "",
        no_hp: data?.no_hp || "",
      }}
    >
      <div className="pt-5">
        <Button type="submit">Simpan</Button>
      </div>
    </AslabForm>
  );
}
