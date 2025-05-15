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
import { createClient } from "@/utils/supabase/server";

// Server action to get jadwal by ID
async function getJadwalDetail(slug) {
  const supabase = await createClient();

  try {
    // Get basic jadwal data
    const { data: jadwal, error } = await supabase
      .from("kelas_praktikum")
      .select(
        `
        id,
        created_at,
        kelas,
        jumlah_praktikan,
        hari,
        waktu,
        jenis_praktikan,
        slug,
        aslab:kelas_aslab(aslab(nama, nim)),
        mata_kuliah:mata_kuliah_praktikum(id, nama),
        dosen:dosen_pengampu!kelas_praktikum_id_dosen_fkey(id, nama),
        laboratorium:lab!kelas_praktikum_lab_fkey(id, nama)
      `
      )
      .eq("slug", slug)
      .single();

    console.log(jadwal);

    if (error) {
      console.error("Error fetching jadwal:", error);
      return null;
    }

    return jadwal;
  } catch (error) {
    console.error("Exception when fetching jadwal:", error);
    return null;
  }
}

export default async function JadwalDetailPage({ params }) {
  const slug = (await params).id; // params is not a Promise, no need to await
  const jadwal = await getJadwalDetail(slug);

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

  // Format dates if they exist
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
          <Link href={`/jadwal-praktikum/${jadwal.slug}/edit`}>
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
                  {jadwal.mata_kuliah?.nama || "Tidak tersedia"}
                </p>
                {jadwal.mata_kuliah?.id && (
                  <p className="text-sm text-gray-500">
                    id: {jadwal.mata_kuliah.id}
                  </p>
                )}
              </div>
              <div>
                <h3 className="text-sm text-gray-500">Dosen Pengampu</h3>
                <p className="font-medium">
                  {jadwal.dosen?.nama || "Tidak tersedia"}
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
                  {jadwal.laboratorium?.nama || "Tidak tersedia"}
                </p>
              </div>
              <div>
                <h3 className="text-sm text-gray-500">Asisten</h3>
                {jadwal.aslab && jadwal.aslab.length > 0 ? (
                  <ul className="font-medium list-disc pl-5">
                    {jadwal.aslab.map((item, index) => (
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
