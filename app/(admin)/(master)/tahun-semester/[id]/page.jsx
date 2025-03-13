import { createClient } from "@/utils/supabase/server";
import { Button } from "@/components/ui/button";
import { Trash, X } from "lucide-react";
import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { DeleteButton } from "../_components/delete-button.jsx";
// Add these imports at the top
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Copy, UserCheck } from "lucide-react";
import { FormNewTahunSemester } from "@/app/(admin)/(master)/tahun-semester/new/form-new-tahun-semester.jsx";
import BackButton from "@/components/back-button";

async function getDetail(slug) {
  const supabase = await createClient();

  const { data: tahun_semester } = await supabase
    .from("tahun_semester")
    .select()
    .eq("slug", slug);
  return tahun_semester;
}

async function deleteTahunSemester(formData) {
  "use server";

  const slug = formData.get("slug");

  try {
    const supabase = await createClient();

    const { error } = await supabase
      .from("tahun_semester")
      .delete()
      .eq("slug", slug);

    if (error) {
      console.error("Error deleting tahun semester:", error);
      throw new Error("Failed to delete tahun semester");
    }
  } catch (error) {
    console.error("Error:", error);
    throw new Error("Something went wrong");
  }

  // These need to be outside the try/catch to ensure they execute
  revalidatePath("/tahun-semester");
  return redirect("/tahun-semester");
}

export default async function Page({ params }) {
  const slug = (await params).id;
  const data = (await getDetail(slug))[0];

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between mb-6">
        {/* <h1 className="text-2xl font-bold">Data Tahun</h1> */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <h3 className="text-sm text-gray-500">Tahun</h3>
                <p className="font-medium">{data.tahun_ajaran}</p>
              </div>
              <div>
                <h3 className="text-sm text-gray-500">Semester</h3>
                <p className="font-medium">{data.semester}</p>
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
          <DeleteButton slug={slug} />
          <BackButton />
        </div>
      </div>
    </div>
  );
}
