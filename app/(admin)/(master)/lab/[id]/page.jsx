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
import { getOneLab } from "../actions.jsx";

export default async function LabDetailPage({ params }) {
  const slug = (await params).id;
  const lab = await getOneLab(slug);
  
  if (!lab) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center p-12">
          <h2 className="text-xl font-semibold">Laboratorium tidak ditemukan</h2>
          <BackButton className="mt-4" />
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{lab.nama}</h1>
        <div className="flex gap-2">
          <Link href={`/lab/${lab.slug}/edit`}>
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
              <h3 className="text-sm text-gray-500">Nama Laboratorium</h3>
              <p className="font-medium">{lab.nama}</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-500">Lantai</h3>
              <p className="font-medium">{lab.lantai}</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-500">Kapasitas</h3>
              <p className="font-medium">{lab.kapasitas}</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-500">Kepala Laboratorium</h3>
              <p className="font-medium">{lab.kalab}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
