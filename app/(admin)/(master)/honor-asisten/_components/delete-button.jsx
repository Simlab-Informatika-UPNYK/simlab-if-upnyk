"use client";

import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
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
import { deleteHonorJenis } from "../actions";
import { useToast } from "@/hooks/use-toast";

export const DeleteButton = ({ id, variant = "ghost" }) => {
  const { toast } = useToast();

  const handleDelete = async () => {
    try {
      await deleteHonorJenis(id);

      toast({
        title: `Berhasil Menghapus`,
        description: `Data telah berhasil dihapus`,
      });
    } catch (error) {
      toast({
        title: `Gagal Menghapus`,
        description: `Gagal menghapus data: ${
          error?.message || "Terjadi kesalahan"
        }`,
      });
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={variant} size="icon" className="text-red-500">
          <Trash className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Apakah anda yakin?</AlertDialogTitle>
          <AlertDialogDescription>
            Penghapusan bersifat permanen. Data mengenai Honor ini akan
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
};
