import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Pencil } from "lucide-react";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { DeleteButton } from "../_components/delete-button.jsx";
import BackButton from "@/components/back-button";
import { deleteTahunSemester } from "../actions";
import { getTahunSemesterBySlug } from "../actions";

export default async function Page({ params }) {
  const slug = (await params).id;
  const data = await getTahunSemesterBySlug(slug);

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
          <Link href={`/admin/tahun-semester/${slug}/edit`}>
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
