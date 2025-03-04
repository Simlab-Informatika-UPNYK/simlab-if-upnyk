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

async function getDosen(id) {
  //   const supabase = await createClient();
  //   const { data, error } = await supabase
  //     .from("mk_praktikum")
  //     .select()
  //     .eq("id", id)
  //     .single();

  //   if (error) {
  //     console.error("Error fetching MK:", error);
  //     return null;
  //   }

  // // Return the actual data if available
  // if (data) return data;

  // Return dummy data as fallback
  return {
    nama: "Rina Wulandari, M.Kom.",
    nip: "10111213",
    mata_kuliah: "Praktikum Desain Grafis",
    kelas: "TI-E",
  };
}

export default async function EditDosenPengampu({ params }) {
  const nip = (await params).id;
  const dataDosen = await getDosen(nip);

  /* nama: "Rina Wulandari, M.Kom.",
      nip: "10111213",
      mata_kuliah: "Praktikum Desain Grafis",
      kelas: "TI-E", */

  if (!dataDosen) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center p-12">
          <h2 className="text-xl font-semibold">
            Mata Kuliah Praktikum tidak ditemukan
          </h2>
          <BackButton className="mt-4" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{dataDosen.nama}</h1>
        <div className="flex gap-2">
          <Link href={`/dosen-pengampu/${nip}/edit`}>
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
              <h3 className="text-sm text-gray-500">NIP</h3>
              <p className="font-medium">{dataDosen.nip}</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-500">Nama</h3>
              <p className="font-medium">{dataDosen.nama}</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-500">Mata Kuliah</h3>
              <p className="font-medium">{dataDosen.mata_kuliah}</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-500">Kelas</h3>
              <p className="font-medium">{dataDosen.kelas}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
