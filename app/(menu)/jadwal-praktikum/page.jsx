"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { DataTable } from "@/components/data-table/data-table";
import { columns } from "./_components/columns";
import { PlusCircle } from "lucide-react";
import {
  findAllJadwalByAslab,
  findAllJadwalByTahunSemester,
  findAllJadwalByAslabAndTahunSemester,
  getTahunSemester,
} from "./actions";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { createAuthClient } from "better-auth/react";
import JadwalFilter from "./_components/jadwal-filter";
import { Skeleton } from "@/components/ui/skeleton";

const { useSession } = createAuthClient();

export default function Page() {
  const [data, setData] = useState([]);
  const [tahunSemester, setTahunSemester] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const searchParams = useSearchParams();
  const router = useRouter();
  const { data: session, isPending: status } = useSession();

  const currentTahunSemester = searchParams.get("tahunsemester");

  const handleRefresh = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  const filters = [];

  useEffect(() => {
    const fetchData = async () => {
      if (!session) return;

      setLoading(true);
      setError(null);

      try {
        // Fetch tahun semester options
        const tahunSemesterData = await getTahunSemester();
        setTahunSemester(tahunSemesterData);

        const userRole = session.user?.role;
        const aslabId = session.user?.aslab_id;

        let jadwalData;

        if (currentTahunSemester) {
          // Get tahun semester ID from slug
          const tahunSemesterItem = tahunSemesterData.find((item) => item.slug === currentTahunSemester);

          if (tahunSemesterItem) {
            if (userRole === "admin") {
              jadwalData = await findAllJadwalByTahunSemester(tahunSemesterItem.id);
            } else if (userRole === "aslab" && aslabId) {
              jadwalData = await findAllJadwalByAslabAndTahunSemester(aslabId, tahunSemesterItem.id);
            }
          }
        } else {
          // No filter selected, get all data
          if (userRole === "admin") {
            jadwalData = await findAllJadwalByTahunSemester(tahunSemesterData[0].id);
          } else if (userRole === "aslab" && aslabId) {
            jadwalData = await findAllJadwalByAslab(aslabId);
          } else {
            jadwalData = [];
          }
        }

        const formattedData = jadwalData.map((item) => ({
          ...item,
          kelas: item.kelas,
          mata_kuliah: item.mataKuliah?.nama || "-",
          dosen: item.dosenPengampu?.nama || "-",
          jumlah_praktikan: item.jumlah_praktikan,
          hari: item.hari,
          waktu: item.waktu,
          lab: item.lab?.nama || "-",
          jenis_praktikan: item.jenis_praktikan,
          asisten: item.kelasAslab?.map((a) => a.aslab?.nama).filter(Boolean) || [],
          asisten_nim: item.kelasAslab?.map((a) => a.aslab?.nim) || [],
        }));

        console.log("jadwal data", jadwalData);
        console.log("format data", formattedData);

        setData(formattedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [session, currentTahunSemester, refreshTrigger]);

  const handleTahunSemesterChange = (value) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set("tahunsemester", value);
    } else {
      params.delete("tahunsemester");
    }

    router.push(`/jadwal-praktikum/?${params.toString()}`);
  };

  if (status) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between py-4">
        <div className="flex gap-2">
          {tahunSemester.length > 0 && (
            <JadwalFilter
              tahunSemester={tahunSemester}
              onTahunSemesterChange={handleTahunSemesterChange}
              defaultValue={currentTahunSemester || tahunSemester[0].slug}
            />
          )}
        </div>
        <div className="flex gap-2">
          <Link href="/jadwal-praktikum/new">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Tambah Jadwal
            </Button>
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="space-y-4">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      ) : (
        <DataTable
          filters={filters}
          pagination={true}
          columns={columns}
          data={data}
          emptyMessage="Data jadwal praktikum tidak ditemukan"
          meta={{ onRefresh: handleRefresh }}
        />
      )}
    </div>
  );
}
