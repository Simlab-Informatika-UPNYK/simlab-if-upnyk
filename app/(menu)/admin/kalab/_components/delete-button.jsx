"use client";

import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { deleteKalab } from "../actions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export function DeleteButton({ slug, variant = "outline" }) {
  const router = useRouter();
  const { toast } = useToast();

  const handleDelete = async () => {
    try {
      const deletedData = await deleteKalab(slug);
      router.replace("/admin/kalab");
      toast({
        title: "Berhasil Menghapus",
        description: `Kepala Lab ${deletedData.nama} telah berhasil dihapus`,
        variant: "success",
      });
    } catch (error) {
      toast({
        title: "Gagal Menghapus",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={variant} size="icon" className="text-red-500 border-0">
          <Trash className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Apakah anda yakin?</AlertDialogTitle>
          <AlertDialogDescription>
            Penghapusan bersifat permanen. Data mengenai Kepala Lab ini akan
            terhapus.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Hapus</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
