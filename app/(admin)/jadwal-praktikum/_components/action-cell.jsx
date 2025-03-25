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
import { createClient } from "@/utils/supabase/client";

export const ActionCell = ({ data }) => {
  const { toast } = useToast();
  const router = useRouter();
  const supabase = createClient();
  const handleDelete = async () => {
    try {
      const { dataKelas, error } = await supabase
        .from("kelas_praktikum")
        .delete()
        .eq("id", data.id)
        .select();
      if (!error) {
        router.refresh();

        toast({
          title: `Berhasil Menghapus`,
          description: `Data telah berhasil dihapus`,
        });
      } else {
        toast({
          title: `Gagal Menghapus`,
          description: "Terjadi kesalahan",
        });
      }
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
      <Link href={`/jadwal-praktikum/${data.slug}/edit`}>
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
