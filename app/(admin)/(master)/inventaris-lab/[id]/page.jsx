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

async function getInventaris(id) {
//   const supabase = await createClient();
//   const { data, error } = await supabase
//     .from("inventaris")
//     .select()
//     .eq("id", id)
//     .single();
  
//   if (error) {
//     console.error("Error fetching inventaris:", error);
//     return null;
//   }
  
// // Return the actual data if available
// if (data) return data;

// Return dummy data as fallback
return {
    id: id,
    nama: "Komputer PC",
    jumlah: "15",
    tahun: "2022",
    kondisi: "Baik"
};
}

export default async function InventarisDetailPage({ params }) {
  const inventarisId = (await params).id;
  const inventaris = await getInventaris(inventarisId);
  
  if (!inventaris) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center p-12">
          <h2 className="text-xl font-semibold">Inventaris tidak ditemukan</h2>
          <BackButton className="mt-4" />
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{inventaris.nama}</h1>
        <div className="flex gap-2">
          <Link href={`/inventaris-lab/${inventarisId}/edit`}>
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <h3 className="text-sm text-gray-500">ID</h3>
              <p className="font-medium">{inventaris.id}</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-500">Nama</h3>
              <p className="font-medium">{inventaris.nama}</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-500">Jumlah</h3>
              <p className="font-medium">{inventaris.jumlah}</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-500">Tahun</h3>
              <p className="font-medium">{inventaris.tahun}</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-500">Kondisi</h3>
              <p className="font-medium">{inventaris.kondisi}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
