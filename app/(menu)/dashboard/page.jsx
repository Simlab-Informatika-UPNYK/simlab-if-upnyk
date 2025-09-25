import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getServerSession } from "@/lib/auth-server";
import { getActivePengumuman, getJadwalAslab, getKalabList, getDashboardStats } from "./actions";
import { PengumumanCard } from "./_components/pengumuman-card";
import { JadwalAslabCard } from "./_components/jadwal-aslab-card";
import { KalabListCard } from "./_components/kalab-list-card";
import Link from "next/link";

export default async function Page() {
  const session = await getServerSession();
  const userRole = session?.user?.role || "Unknown";
  const aslabId = session?.user?.aslab_id;

  // Get data based on user role
  const [pengumuman, jadwalData, kalabList, stats] = await Promise.all([
    getActivePengumuman(),
    userRole === "aslab" && aslabId ? getJadwalAslab(aslabId) : Promise.resolve({ jadwal: [], tahunSemester: null }),
    getKalabList(),
    getDashboardStats(),
  ]);

  const jadwal = jadwalData.jadwal || [];
  const tahunSemester = jadwalData.tahunSemester;

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-4">
      <div className="space-y-6">
        <div className="">
          <div className="flex w-full justify-between mb-2 items-center">
            <div className="text-xl font-semibold">Pengumuman</div>
            {userRole === "admin" && (
              <Button asChild variant="outline">
                <Link href={"/admin/pengumuman"}>Kelola pengemuman</Link>
              </Button>
            )}
          </div>
          {pengumuman.length > 0 && <PengumumanCard pengumuman={pengumuman} />}
        </div>
        {userRole === "aslab" && <JadwalAslabCard jadwal={jadwal} tahunSemester={tahunSemester} />}
        <KalabListCard kalabList={kalabList} />
      </div>
    </div>
  );
}
