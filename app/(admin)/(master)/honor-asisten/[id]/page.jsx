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

async function getHonorAsisten(id) {
  //   const supabase = await createClient();
  //   const { data, error } = await supabase
  //     .from("honor_asisten")
  //     .select()
  //     .eq("id", id)
  //     .single();

  //   if (error) {
  //     console.error("Error fetching Honor Asisten:", error);
  //     return null;
  //   }

  // // Return the actual data if available
  // if (data) return data;

  // Return dummy data as fallback
  return {
    id: "1",
    jenis: "Praktikum Reguler",
    biaya: 25000,
  };
}

export default async function HonorAsistenDetail({ params }) {
  const id = (await params).id;
  const dataHonor = await getHonorAsisten(id);

  if (!dataHonor) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center p-12">
          <h2 className="text-xl font-semibold">
            Honor Asisten tidak ditemukan
          </h2>
          <BackButton className="mt-4" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          Honor Asisten - {dataHonor.jenis}
        </h1>
        <div className="flex gap-2">
          <Link href={`/honor-asisten/${id}/edit`}>
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
              <p className="font-medium">{dataHonor.id}</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-500">Jenis</h3>
              <p className="font-medium">{dataHonor.jenis}</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-500">Biaya</h3>
              <p className="font-medium">
                Rp {dataHonor.biaya.toLocaleString("id-ID")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
