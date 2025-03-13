"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Edit, Trash } from "lucide-react";
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
import { deleteUser } from "../actions";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export const ActionCell = ({ data }) => {
  const { toast } = useToast();
  const router = useRouter();
  const handleDelete = async () => {
    try {
      deleteUser(data.id);
      router.refresh();

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
    <div className="flex items-center space-x-2">
      <Link href={`/user/${data.slug}/edit`}>
        <Button variant="ghost" size="icon">
          <Edit className="h-4 w-4" />
        </Button>
      </Link>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="ghost" size="icon" className="text-red-500">
            <Trash className="h-4 w-4" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Apakah anda yakin?</AlertDialogTitle>
            <AlertDialogDescription>
              Penghapusan bersifat permanen. Data mengenai Tahun Semester ini
              akan terhapus.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Hapus</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
