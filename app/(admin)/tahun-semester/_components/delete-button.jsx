"use client";

import { Button } from "@/components/ui/button";
import { Edit, Trash, MoreHorizontal } from "lucide-react";
import { useState } from "react";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { DialogTrigger } from "@/components/ui/dialog";

export function DeleteButton({ slug, variant = "outline" }) {
  const router = useRouter();
  const { toast } = useToast();

  const handleDelete = async () => {
    const supabase = createClient();
    const { data: deletedData, error } = await supabase
      .from("tahun_semester")
      .delete()
      .eq("slug", slug)
      .select();

    if (!error) {
      router.replace("/tahun-semester");
      toast({
        title: "Berhasil Menghapus",
        description: `Semester ${deletedData[0].slug} telah berhasil dihapus`,
      });
      return;
    }

    toast({
      title: "Gagal Menghapus",
      description: "Tahun Semester gagal dihapus",
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
            Penghapusan bersifat permanen. Data mengenai Tahun Semester ini akan
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
