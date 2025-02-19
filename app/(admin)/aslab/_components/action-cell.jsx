"use client"

import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import { useState } from "react"
import { createClient } from "@/utils/supabase/client"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { useRouter } from "next/navigation"
import Link from "next/link"

export function ActionCell({ row }) {
    const router = useRouter();

    const [open, setOpen] = useState(false)
    const { toast } = useToast()

    const handleDelete = async () => {
        const supabase = createClient()
        const { data, error } = await supabase
            .from('aslab')
            .delete()
            .eq('id_aslab', row.id_aslab)
            .select()

        if (!error) {
            router.refresh()
            toast({
                title: `Berhasil Menghapus`,
                description: `Data ${data[0].nama} telah berhasil dihapus`,
                // action: <ToastAction altText="Undo">Undo</ToastAction>,
            })

        }
    }

    return (
        <div>
            {!open && <DropdownMenu modal>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem><Link href={`/aslab/${row.nim}/edit`}>Edit Data</Link></DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => setOpen(true)}>
                        Hapus
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>}

            <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className="font-bold text-2xl text-center">
                            Hapus Asisten
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-center text-md">
                            Apakah anda yakin ingin menghapus {row.nama}?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="mx-auto">
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete}>
                            Hapus
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}