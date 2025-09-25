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
      <div className="container mx-auto p-6 space-y-6">
        <div className="mb-6">
          <div className="flex justify-between">
            <div>
              <h1 className="text-2xl font-bold">Kelola Permintaan Sertifikat</h1>
              <p className="text-gray-600 mt-1">
                Kelola semua permintaan sertifikat dari asisten laboratorium
              </p>
            </div>
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
      <div className="container mx-auto p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold text-sm text-gray-600">Nama</h3>
            <p className="text-lg mt-1">{kajur?.nama || "Belum diatur"}</p>
          </div>
          <div>
            <h3 className="font-semibold text-sm text-gray-600">NIP</h3>
            <p className="text-lg mt-1">{kajur?.nip || "Belum diatur"}</p>
          </div>
        </div>
        <AslabCertificateList aslabId={user.aslab_id} />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="text-center p-6">
        <h1 className="text-2xl font-bold mb-4">Akses Ditolak</h1>
        <p className="text-gray-600">Anda tidak memiliki izin untuk mengakses halaman ini.</p>
      </div>
    </div>
  );
}
