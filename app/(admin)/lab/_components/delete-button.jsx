"use client";

import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
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

export function DeleteButton({ slug, variant = "ghost" }) {
  const router = useRouter();
  const { toast } = useToast();

  const handleDelete = async () => {
    const supabase = createClient();
    const { data: deletedData, error } = await supabase
      .from("lab")
      .delete()
      .eq("slug", slug)
      .select();

    if (!error) {
      router.refresh();
      toast({
        title: "Berhasil Menghapus",
        description: `Laboratorium ${deletedData[0].nama} telah berhasil dihapus`,
      });
      return;
    }

    toast({
      title: "Gagal Menghapus",
      description: "Laboratorium gagal dihapus",
      variant: "destructive",
    });
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
            Penghapusan bersifat permanen. Data mengenai Laboratorium ini akan
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
