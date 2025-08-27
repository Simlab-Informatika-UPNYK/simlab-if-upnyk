"use client";

import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { KalabForm } from "../../_components/form";
import { editKalab, getKalabDetail } from "../../actions";
import { useState, useEffect } from "react";
import { use } from "react";

export default function EditKalabPage({ params }) {
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [data, setData] = useState(null);

  const unwrappedParams = use(params);
  const slug = unwrappedParams.id;

  useEffect(() => {
    const fetchData = async () => {
      const kalabData = await getKalabDetail(slug);
      setData(kalabData);
    };
    fetchData();
  }, [slug]);

  const handleSubmit = async (values) => {
    setIsSubmitting(true);
    try {
      await editKalab(data.slug, values);
      toast({
        title: "Berhasil Mengubah",
        description: "Data kepala laboratorium berhasil diperbarui",
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

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <KalabForm
        onSubmit={handleSubmit}
        defaultValues={{
          "Nama Lengkap": data.nama,
          "NIDN/NIP": data.nip,
          Email: data.email,
          "No Telepon": data.no_hp,
        }}
        isSubmitting={isSubmitting}
        mode="edit"
      />
    </div>
  );
}
