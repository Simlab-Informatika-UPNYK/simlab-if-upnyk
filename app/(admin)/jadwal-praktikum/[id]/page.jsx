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
import { deleteJadwal, findOneById } from "../actions";
import { redirect } from "next/navigation";

export default async function JadwalDetailPage({ params }) {
  const id = params.id;
  const jadwal = await findOneById(id);

  if (!jadwal) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center p-12">
          <h2 className="text-xl font-semibold">
            Jadwal praktikum tidak ditemukan
          </h2>
          <BackButton className="mt-4" />
        </div>
      </div>
    );
  }

  const formattedCreatedAt = jadwal.created_at
    ? new Date(jadwal.created_at).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "Tidak tersedia";

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6"></div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Detail Jadwal Praktikum</h1>
        <div className="flex gap-2">
          <Link href={`/admin/jadwal-praktikum/${jadwal.id}/edit`}>
            <Button variant="outline" size="icon">
              <Pencil className="h-4 w-4" />
            </Button>
          </Link>
          <BackButton />
        </div>
      </div>
      <div className="">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-lg font-semibold mb-4">Informasi Kelas</h2>
            <div className="space-y-3">
              <div>
                <h3 className="text-sm text-gray-500">Kelas</h3>
                <p className="font-medium">{jadwal.kelas}</p>
              </div>
              <div>
                <h3 className="text-sm text-gray-500">Mata Kuliah</h3>
                <p className="font-medium">
                  {jadwal.mataKuliah?.nama || "Tidak tersedia"}
                </p>
                {jadwal.mataKuliah?.id && (
                  <p className="text-sm text-gray-500">
                    id: {jadwal.mata_kuliah.id}
                  </p>
                )}
              </div>
              <div>
                <h3 className="text-sm text-gray-500">Dosen Pengampu</h3>
                <p className="font-medium">
                  {jadwal.dosenPengampu?.nama || "Tidak tersedia"}
                </p>
              </div>
              <div>
                <h3 className="text-sm text-gray-500">Jumlah Praktikan</h3>
                <p className="font-medium">{jadwal.jumlah_praktikan} orang</p>
              </div>
              <div>
                <h3 className="text-sm text-gray-500">Jenis Praktikan</h3>
                <p className="font-medium">{jadwal.jenis_praktikan}</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4">Jadwal & Lokasi</h2>
            <div className="space-y-3">
              <div>
                <h3 className="text-sm text-gray-500">Hari</h3>
                <p className="font-medium">{jadwal.hari}</p>
              </div>
              <div>
                <h3 className="text-sm text-gray-500">Waktu</h3>
                <p className="font-medium">{jadwal.waktu}</p>
              </div>
              <div>
                <h3 className="text-sm text-gray-500">Laboratorium</h3>
                <p className="font-medium">
                  {jadwal.lab?.nama || "Tidak tersedia"}
                </p>
              </div>
              <div>
                <h3 className="text-sm text-gray-500">Asisten</h3>
                {jadwal.kelasAslab && jadwal.kelasAslab.length > 0 ? (
                  <ul className="font-medium list-disc pl-5">
                    {jadwal.kelasAslab.map((item, index) => (
                      <li key={index}>
                        {item.aslab?.nama || "Tidak tersedia"}
                        {item.aslab?.nim && ` (${item.aslab.nim})`}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="font-medium">Tidak ditentukan</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-200">
          <div>
            <h3 className="text-sm text-gray-500">Dibuat Pada</h3>
            <p className="font-medium">{formattedCreatedAt}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
