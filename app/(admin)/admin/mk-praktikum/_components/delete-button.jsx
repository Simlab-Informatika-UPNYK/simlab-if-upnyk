"use client";

import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { deleteMk } from "../actions";
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

export function DeleteButton({ id, variant = "outline" }) {
  const router = useRouter();
  const { toast } = useToast();

  const handleDelete = async () => {
    try {
      const { success, error } = await deleteMk(id);
      if (success) {
        toast({
          title: "Berhasil Menghapus",
          description: "Mata Kuliah Praktikum berhasil dihapus",
          variant: "success",
        });
        router.refresh();
      } else {
        throw new Error(error);
      }
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
        <Button variant={variant} size="sm" className="text-red-500">
          <Trash className="h-4 w-4 mr-2" />
          Hapus
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Apakah anda yakin?</AlertDialogTitle>
          <AlertDialogDescription>
            Penghapusan bersifat permanen. Data Mata Kuliah Praktikum ini akan terhapus.
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
