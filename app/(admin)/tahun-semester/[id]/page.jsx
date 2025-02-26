import { createClient } from "@/utils/supabase/server";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";

// Add these imports at the top
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Copy, UserCheck } from "lucide-react";
import { FormNewTahunSemester } from "@/app/(admin)/tahun-semester/new/form-new-tahun-semester";
import BackButton from "@/components/back-button";

export default async function Page({ params }) {
  const slug = (await params).id;
  //   const data = await getData(slug);

  // const data = await getData(slug);
  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between mb-6">
        {/* <h1 className="text-2xl font-bold">Data Tahun</h1> */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <h3 className="text-sm text-gray-500">Tahun</h3>
                <p className="font-medium">2022/2024</p>
              </div>
              <div>
                <h3 className="text-sm text-gray-500">Semester</h3>
                <p className="font-medium">Genap</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-2 ms-auto">
          <Link href={`/tahun-semester/${slug}/edit`}>
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
    </div>
  );
}
