import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Pencil, Trash2, MoreHorizontal } from "lucide-react";
import BackButton from "@/components/back-button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getOneUser } from "../actions";
import { Edit } from "lucide-react";

export default async function UserDetailPage({ params }) {
  const slug = (await params).id;
  const user = await getOneUser(slug);

  if (!user) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center p-12">
          <h2 className="text-xl font-semibold">Pengguna tidak ditemukan</h2>
          <BackButton className="mt-4" />
        </div>
      </div>
    );
  }

  // Format dates if they exist
  const formattedRegDate = user.created_at
    ? new Date(user.created_at).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "Tidak tersedia";

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Detail Pengguna</h1>
        <div className="flex gap-2">
          <Link href={`/user/${user.slug}/edit`}>
            <Button variant="outline" size="icon">
              <Edit className="h-4 w-4" />
            </Button>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                More <MoreHorizontal className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="text-red-600">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <BackButton />
        </div>
      </div>

      <div className="bg-white">
        <div className="grid grid-cols-1 gap-4">
          <div>
            <h3 className="text-sm text-gray-500">Nama Lengkap</h3>
            <p className="font-medium">{user.nama}</p>
          </div>
          <div>
            <h3 className="text-sm text-gray-500">Email</h3>
            <p className="font-medium">{user.email}</p>
          </div>
          <div>
            <h3 className="text-sm text-gray-500">Peran</h3>
            <p className="font-medium">{user.role}</p>
          </div>
          <div>
            <h3 className="text-sm text-gray-500">Tanggal Pendaftaran</h3>
            <p className="font-medium">{formattedRegDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
