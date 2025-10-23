import AdminCertificateView from "./_components/admin-certificate-view";
import AslabCertificateList from "./_components/aslab-certificate-list";
import Link from "next/link";
import { getServerSession } from "@/lib/auth-server";
import { getKajurPublic } from "./kajur/actions";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MoveUpRight } from "lucide-react";

export default async function CertificatePage() {
  const { user } = await getServerSession();
  const kajur = await getKajurPublic();

  if (user?.role === "admin") {
    return (
      <div className="container mx-auto px-4 py-2">
        <h1 className="text-3xl font-bold">Kelola Permintaan Sertifikat</h1>
        <p className="text-gray-500 mb-4">
          Kelola semua permintaan sertifikat dari asisten laboratorium
        </p>

        <div className="mb-6">
          <div className="flex justify-between">
            <div className="space-y-2">
              <Button asChild>
                <Link href="/sertifikat/kajur" className="inline-flex items-center px-4 py-2">
                  Kelola Kepala Jurusan
                </Link>
              </Button>
              <p className="text-sm">Kepala Jurusan: <br /> {kajur?.nama ?? "Belum diatur"}</p>
            </div>
          </div>
        </div>

        <AdminCertificateView />

        <div>
          <Link href="/sertifikat/cetak" className="text-blue-600 underline flex items-center ">
            Semua Mahasiswa
            <MoveUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    );
  }

  if (user?.role === "aslab") {
    return (
      <div className="container mx-auto px-4 py-2">
        <h1 className="text-3xl font-bold">Sertifikat Saya</h1>
        <p className="text-gray-500 mb-4">
          Daftar sertifikat yang dapat Anda unduh
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <h3 className="font-semibold text-sm text-gray-600">Nama Kepala Jurusan</h3>
            <p className="text-lg mt-1">{kajur?.nama || "Belum diatur"}</p>
          </div>
          <div>
            <h3 className="font-semibold text-sm text-gray-600">NIP Kepala Jurusan</h3>
            <p className="text-lg mt-1">{kajur?.nip || "Belum diatur"}</p>
          </div>
        </div>
        <AslabCertificateList aslabId={user.aslab_id} />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-2">
      <div className="text-center p-6">
        <h1 className="text-3xl font-bold mb-4">Akses Ditolak</h1>
        <p className="text-gray-500">Anda tidak memiliki izin untuk mengakses halaman ini.</p>
      </div>
    </div>
  );
}
