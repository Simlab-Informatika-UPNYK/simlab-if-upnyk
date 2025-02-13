import { createClient } from "@/utils/supabase/server"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import Link from "next/link"
import { Pencil, Trash2 } from "lucide-react"

// Add these imports at the top
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Copy, UserCheck } from "lucide-react"
import useStore from "@/hooks/use-store"

async function getData(nim) {
    const supabase = await createClient();

    const { data: aslab } = await supabase
        .from("aslab")
        .select().eq("nim", nim);
    return aslab
}

export default async function Page({ params }) {
    const nim = (await params).nim
    const data = (await getData(nim))[0]
    // console.log(data)

    // Dummy data for demonstration
    // const data = {
    //     nama: "Andi Permana",
    //     nim: "123456789",
    //     email: "andi@example.com",
    //     angkatan: "2022",
    //     program_studi: "Informatika",
    //     status: "Aktif",
    //     no_hp: "081234567890",
    //     id_aslab: "8f83b528-7e08-4aec-ac2c-37f7f1b6413b"
    // }

    return (
        <div className="container mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">{data.nama}</h1>
                <div className="flex gap-2">
                    <Link href={`/aslab/${nim}/edit`}

                    >
                        <Button variant="outline" size="icon">
                            <Pencil className="h-4 w-4" />
                        </Button>
                    </Link>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline">
                                More <MoreHorizontal className="ml-2 h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                                <Copy className="mr-2 h-4 w-4" />
                                Clone Item
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <UserCheck className="mr-2 h-4 w-4" />
                                Mark as Active
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Link href="/aslab">
                        <Button variant="ghost" size="icon">
                            <X className="h-4 w-4" />
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <h3 className="text-sm text-gray-500">NIM</h3>
                            <p className="font-medium">{data.nim}</p>
                        </div>
                        <div>
                            <h3 className="text-sm text-gray-500">Email</h3>
                            <p className="font-medium">{data.email}</p>
                        </div>
                        <div>
                            <h3 className="text-sm text-gray-500">Angkatan</h3>
                            <p className="font-medium">{data.angkatan}</p>
                        </div>
                        <div>
                            <h3 className="text-sm text-gray-500">Program Studi</h3>
                            <p className="font-medium">{data.program_studi}</p>
                        </div>
                        <div>
                            <h3 className="text-sm text-gray-500">Status</h3>
                            <p className="font-medium capitalize">{data.status}</p>
                        </div>
                    </div>
                </div>

                <div className="space-y-6 ms-auto">
                    <div className="flex items-center justify-center py-4 px-12">
                        <div className="w-48 h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                            <span className="text-gray-500">No Image</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}