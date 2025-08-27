import { getHonorJenisByJenis } from "../actions";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Pencil } from "lucide-react";
import BackButton from "@/components/back-button";

export default async function HonorAsistenDetail({ params }) {
  const slug = (await params).id;
  const dataHonor = await getHonorJenisByJenis(slug);

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
          <Link href={`/admin/honor-asisten/${dataHonor.slug}/edit`}>
            <Button variant="outline" size="icon">
              <Pencil className="h-4 w-4" />
            </Button>
          </Link>
          {/* <DeleteButton variant="outline" id={dataHonor.id} /> */}
          <BackButton />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
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
