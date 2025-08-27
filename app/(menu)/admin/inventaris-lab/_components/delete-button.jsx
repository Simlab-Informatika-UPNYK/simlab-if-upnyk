"use client";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { deleteInventaris } from "../actions";
import { useToast } from "@/hooks/use-toast";

export function DeleteButton({ id, labId }) {
  const router = useRouter();
  const { toast } = useToast();

  const handleDelete = async () => {
    try {
      const result = await deleteInventaris(id, labId);
      if (result.success) {
        toast({
          title: "Berhasil",
          description: "Inventaris berhasil dihapus",
        });
        router.refresh();
      } else {
        toast({
          title: "Gagal",
          description: result.error || "Gagal menghapus inventaris",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Terjadi kesalahan saat menghapus",
        variant: "destructive",
      });
    }
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={handleDelete}
      className="text-red-600 hover:text-red-800 hover:bg-red-50"
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  );
}
