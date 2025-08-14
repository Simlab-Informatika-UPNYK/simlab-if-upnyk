import { getOneDosen } from "../actions"
import { Button } from "@/components/ui/button"
import { Pencil, Trash2 } from "lucide-react"
import Link from "next/link"
import { DeleteButton } from "../_components/delete-button"

export default async function DosenDetailPage({ params }) {
  const dosen = await getOneDosen(params.id)

  if (!dosen) {
    return <div>Dosen tidak ditemukan</div>
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Detail Dosen</h1>
        <div className="flex gap-2">
          <Link href={`/admin/dosen-pengampu/${params.id}/edit`}>
            <Button variant="outline" size="sm">
              <Pencil className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </Link>
          <DeleteButton slug={params.id} />
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h2 className="font-semibold">Nama</h2>
          <p>{dosen.nama}</p>
        </div>
        <div>
          <h2 className="font-semibold">NIP</h2>
          <p>{dosen.nip}</p>
        </div>
        <div>
          <h2 className="font-semibold">Email</h2>
          <p>{dosen.email}</p>
        </div>
      </div>
    </div>
  )
}
