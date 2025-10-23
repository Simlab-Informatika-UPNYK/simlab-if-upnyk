"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { DataTable } from "@/components/data-table/data-table";
import { columns } from "./_components/columns";
import { PlusCircle, Download } from "lucide-react";
import * as XLSX from "xlsx";
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
              console.log("jadwalData", jadwalData);
            } else if (userRole === "aslab" && aslabId) {
              jadwalData = await findAllJadwalByAslabAndTahunSemester(aslabId, tahunSemesterItem.id);
            }
          }
        } else {
          // No filter selected, get all data
          if (userRole === "admin") {
            jadwalData = await findAllJadwalByTahunSemester(tahunSemesterData[0].id);
          } else if (userRole === "aslab" && aslabId) {
            jadwalData = await findAllJadwalByAslabAndTahunSemester(aslabId, tahunSemesterData[0].id);
          } else {
            jadwalData = [];
          }
        }

        const formattedData = jadwalData.map((item) => ({
          ...item,
          kelas: item.kelas,
          kode_mk: item.mataKuliah.kode_mk,
          mata_kuliah: item.mataKuliah?.nama || "-",
          dosen: item.dosenPengampu?.nama || "-",
          jumlah_praktikan: item.jumlah_praktikan,
          hari: item.hari,
          waktu_mulai: item.waktu_mulai,
          waktu_selesai: item.waktu_selesai,
          lab: item.lab?.nama || "-",
          asisten: item.kelasAslab?.map((a) => a.aslab?.user?.name) || [],
          asisten_nim: item.kelasAslab?.map((a) => a.aslab?.nim) || [],
        }));
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

  const exportToExcel = () => {
    if (data.length === 0) return;

    // Prepare data for export
    const exportData = data.map((item) => ({
      "Kode MK": item.kode_mk || "-",
      "Mata Kuliah": item.mata_kuliah || "-",
      "Kelas": item.kelas || "-",
      "Dosen": item.dosen || "-",
      "Hari": item.hari || "-",
      "Waktu Mulai": item.waktu_mulai || "-",
      "Waktu Selesai": item.waktu_selesai || "-",
      "Asisten": Array.isArray(item.asisten) && item.asisten.length > 0 ? item.asisten.join(", ") : "-",
      "Jumlah Praktikan": item.jumlah_praktikan || 0,
      "Lab": item.lab || "-",
    }));

    // Create workbook and worksheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(exportData);

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, "Jadwal Praktikum");

    // Generate file name
    const currentDate = new Date().toISOString().split("T")[0];
    const fileName = `jadwal-praktikum-${currentTahunSemester || "all"}-${currentDate}.xlsx`;

    // Download the file
    XLSX.writeFile(wb, fileName);
  };

  if (status) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-2">
      <h1 className="text-3xl font-bold">Jadwal Praktikum</h1>
      <p className="text-gray-500 mb-4">
        Daftar jadwal praktikum laboratorium informatika
      </p>

      <div className="flex items-center justify-between py-4">
        <div className="flex space-x-2 w-full">
          {tahunSemester.length > 0 && (
            <JadwalFilter
              tahunSemester={tahunSemester}
              onTahunSemesterChange={handleTahunSemesterChange}
              defaultValue={currentTahunSemester || tahunSemester[0].slug}
            />
          )}
          <div className="flex gap-2 ms-auto">
            <Link href={`/jadwal-praktikum/new${currentTahunSemester ? `?tahunsemester=${currentTahunSemester}` : ""}`}>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Tambah Jadwal
              </Button>
            </Link>
          </div>
          <Button onClick={exportToExcel} variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Excel
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="space-y-4">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      ) : (
        <DataTable
          globalSearch={true}
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
