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
import { getOneMk } from "../actions.jsx";

export default async function MkDetailPage({ params }) {
  const slug = (await params).id;
  const mk = await getOneMk(slug);

  if (!mk) {
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
        <h1 className="text-2xl font-bold">{mk.nama}</h1>
        <div className="flex gap-2">
          <Link href={`/mk-praktikum/${slug}/edit`}>
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
              <h3 className="text-sm text-gray-500">Mata Kuliah</h3>
              <p className="font-medium">{mk.nama}</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-500">Kode Mata Kuliah</h3>
              <p className="font-medium">{mk.kode_mk}</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-500">Semester</h3>
              <p className="font-medium">{mk.semester}</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-500">Jumlah Kelas</h3>
              <p className="font-medium">{mk.jumlah_kelas}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
