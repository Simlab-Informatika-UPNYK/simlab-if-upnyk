"use client";

import { createMk } from "../actions.jsx";
import MkPraktikumForm from "../_components/form.jsx";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast.js";

export default function Page() {
  const router = useRouter();

  const handleSubmit = async (data) => {
    try {
      const result = await createMk(data);
      if (result?.success) {
        toast({
          title: "Berhasil",
          description: "Mata kuliah berhasil ditambahkan",
        });
        router.push("/admin/mk-praktikum");
      } else {
        console.log(result);
        toast({
          title: "gagal",
          description: "Mata kuliah gagal ditambahkan",
        });
      }
      return result;
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    }
  };

  return (
    <div className="container mx-auto p-4">
      <MkPraktikumForm onSubmit={handleSubmit} />
    </div>
  );
}
