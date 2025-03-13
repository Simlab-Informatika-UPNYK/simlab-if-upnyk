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

export function Delete({
  slug,
  variant = "outline",
  children = null,
  setDeleteDialogOpen,
}) {
  const router = useRouter();
  const { toast } = useToast();

  const handleDelete = async () => {
    const supabase = createClient();
    const { data: deletedData, error } = await supabase
      .from("kalab")
      .delete()
      .eq("slug", slug)
      .select();

    if (!error) {
      router.refresh();
      toast({
        title: "Berhasil Menghapus",
        description: `Semester ${deletedData[0].slug} telah berhasil dihapus`,
      });
      setDeleteDialogOpen(false);
      return;
    }

    toast({
      title: "Gagal Menghapus",
      description: "Kepala lab gagal dihapus",
      variant: "destructive",
    });
    setDeleteDialogOpen(false);
  };

  return <AlertDialogAction onClick={handleDelete}>Hapus</AlertDialogAction>;
}
