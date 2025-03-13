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
import { DeleteButton } from "./delete-button";

export function ActionCell({ row }) {
  const router = useRouter();
  const { toast } = useToast();
  const data = row.original;

  const handleDelete = async () => {
    const supabase = createClient();
    const { data: deletedData, error } = await supabase
      .from("tahun_semester")
      .delete()
      .eq("id", data.id)
      .select();

    if (!error) {
      router.refresh();
      toast({
        title: "Berhasil Menghapus",
        description: `Tahun Semester ${deletedData[0].nama} telah berhasil dihapus`,
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
    <div className="flex justify-end items-center space-x-2">
      <Link href={`/tahun-semester/${data.slug}/edit`}>
        <Button variant="ghost" size="icon">
          <Edit className="h-4 w-4" />
        </Button>
      </Link>
      <DeleteButton variant="ghost" slug={data.slug} />
    </div>
  );
}
