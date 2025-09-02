"use client";

import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { deleteAslab } from "../../actions";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
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
import { useRouter } from "next/navigation";
import Link from "next/link";

export function ActionCell({ row }) {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const handleDelete = async () => {
    try {
      const deletedAslab = await deleteAslab(row.id_aslab);
      router.refresh();
      toast({
        title: `Berhasil Menghapus`,
        description: `Data ${deletedAslab.nama} telah berhasil dihapus`,
        variant: "success",
      });
    } catch (error) {
      toast({
        title: `Gagal Menghapus`,
        description: `Gagal menghapus data: ${error.message || "Terjadi kesalahan"}`,
        variant: "destructive",
      });
    }
  };

  return (
    <div>
      {!open && (
        <DropdownMenu modal>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={`/aslab/${row.nim}/edit`}>Edit Data</Link>
            </DropdownMenuItem>
            <DropdownMenuItem onSelect={() => setOpen(true)}>Hapus</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Hapus Asisten</AlertDialogTitle>
            <AlertDialogDescription>Apakah anda yakin ingin menghapus {row.nama}?</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Hapus</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
