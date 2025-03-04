import { createClient } from "@/utils/supabase/server";
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
// import { format } from "date-fns";

async function getUser(id) {
  // Uncomment this when you're ready to fetch real data
  // const supabase = await createClient();
  // const { data, error } = await supabase
  //   .from("users")
  //   .select()
  //   .eq("id", id)
  //   .single();
  
  // if (error) {
  //   console.error("Error fetching user:", error);
  //   return null;
  // }
  
  // if (data) return data;

  // Return dummy data as fallback
  return {
    id: id,
    nama_lengkap: "John Doe",
    email: "john.doe@example.com",
    peran: "Admin",
    status: "Active",
    tgl_daftar: "2023-01-15T08:30:00Z",
    tgl_login_terakhir: "2023-06-22T14:45:00Z"
  };
}

export default async function UserDetailPage({ params }) {
  const userId = (await params).id;
  const user = await getUser(userId);
  
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
  const formattedRegDate = user.tgl_daftar ? new Date(user.tgl_daftar).toLocaleDateString('id-ID', { 
    day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' 
  }) : 'Tidak tersedia';
  
  const formattedLastLogin = user.tgl_login_terakhir ? new Date(user.tgl_login_terakhir).toLocaleDateString('id-ID', { 
    day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' 
  }) : 'Tidak tersedia';
  
  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Detail Pengguna</h1>
        <div className="flex gap-2">
          <Link href={`/user/${userId}/edit`}>
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
            <p className="font-medium">{user.nama_lengkap}</p>
          </div>
          <div>
            <h3 className="text-sm text-gray-500">Email</h3>
            <p className="font-medium">{user.email}</p>
          </div>
          <div>
            <h3 className="text-sm text-gray-500">Peran</h3>
            <p className="font-medium">{user.peran}</p>
          </div>
          <div>
            <h3 className="text-sm text-gray-500">Status</h3>
            <p className={`font-medium ${user.status === 'Active' ? 'text-green-600' : 'text-red-600'}`}>
              {user.status}
            </p>
          </div>
          <div>
            <h3 className="text-sm text-gray-500">Tanggal Pendaftaran</h3>
            <p className="font-medium">{formattedRegDate}</p>
          </div>
          <div>
            <h3 className="text-sm text-gray-500">Login Terakhir</h3>
            <p className="font-medium">{formattedLastLogin}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
