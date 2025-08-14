"use client";

import { DosenForm } from "../_components/form";
import { createDosen } from "../actions";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export default function NewDosenPage() {
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async (data) => {
    try {
      const result = await createDosen(data);
      if (!result.success) throw new Error(result.error);

      toast({
        title: "Success",
        description: "Dosen berhasil ditambahkan",
      });
      router.push("/admin/dosen-pengampu");
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return <DosenForm onSubmit={handleSubmit} />;
}
