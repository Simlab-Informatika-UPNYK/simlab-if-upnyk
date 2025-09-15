"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { DataTable } from "@/components/data-table/data-table";
import { columns } from "./_components/columns";
import HonorFilter from "./_components/honor-filter";
import { getAslabByTahunSemester, getTahunSemesterId } from "./actions";
import { Skeleton } from "@/components/ui/skeleton";
import HonorDetail from "./aslab-honor";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import * as XLSX from "xlsx";

export default function HonorClient({ initialTahunSemester }) {
  const [aslabData, setAslabData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tahunSemester, setTahunSemester] = useState(initialTahunSemester);

  const searchParams = useSearchParams();
  const router = useRouter();

  const currentTahunSemester = searchParams.get("tahunsemester") || tahunSemester[0]?.slug;

  // Fetch aslab data when tahun semester changes
  useEffect(() => {
    const fetchAslabData = async () => {
      if (!currentTahunSemester) return;

      setLoading(true);
      setError(null);

      try {
        const tahunSemesterId = await getTahunSemesterId(currentTahunSemester);
        if (tahunSemesterId) {
          const data = await getAslabByTahunSemester(tahunSemesterId);
          setAslabData(data);
        }
      } catch (err) {
        setError(err.message || "Terjadi kesalahan saat mengambil data aslab");
      } finally {
        setLoading(false);
      }
    };

    fetchAslabData();
  }, [currentTahunSemester]);

  const handleTahunSemesterChange = (value) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set("tahunsemester", value);
    } else {
      params.delete("tahunsemester");
    }

    router.push(`/honor-praktikum/?${params.toString()}`);
  };

  const exportToExcel = () => {
    if (aslabData.length === 0) return;

    // Prepare data for export (without 'no' column)
    const exportData = aslabData.map((item) => ({
      NIM: item.nim,
      "Nama Asisten": item.nama,
      "Mata Kuliah": item.mata_kuliah,
      "Jumlah Kelas": item.jumlah_kelas,
      "Jumlah Honor": item.jumlah_honor,
    }));

    // Create workbook and worksheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(exportData);

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, "Data Honor");

    // Generate file name
    const currentDate = new Date().toISOString().split("T")[0];
    const fileName = `honor-praktikum-${currentTahunSemester}-${currentDate}.xlsx`;

    // Download the file
    XLSX.writeFile(wb, fileName);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Honor Praktikum</h1>
        <p className="text-muted-foreground">
          Pilih tahun semester untuk melihat daftar asisten dan detail honor mereka
        </p>
      </div>

      {tahunSemester.length > 0 && (
        <div className="flex justify-content-between">
          <HonorFilter
            tahunSemester={tahunSemester}
            onTahunSemesterChange={handleTahunSemesterChange}
            defaultValue={currentTahunSemester}
          />
        </div>
      )}

      {loading ? (
        <div className="space-y-4">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      ) : error ? (
        <div className="text-red-600 p-4 bg-red-50 rounded-lg">
          <p>Error: {error}</p>
        </div>
      ) : aslabData.length > 0 ? (
        <div className="max-w-screen-xl mx-auto">
          <DataTable
            globalSearch={true}
            columns={columns}
            data={aslabData.map((item, index) => ({
              ...item,
              no: index + 1,
              tahun_semester: currentTahunSemester,
            }))}
            toolbar={
              <Button onClick={exportToExcel} variant="outline" size="sm" className="ml-auto">
                <Download className="mr-2 h-4 w-4" />
                Export Excel
              </Button>
            }
            pagination={true}
            emptyMessage="Tidak ada data aslab untuk periode ini"
          />
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            {currentTahunSemester
              ? "Tidak ada data aslab untuk periode yang dipilih"
              : "Pilih tahun semester untuk melihat data aslab"}
          </p>
        </div>
      )}
    </div>
  );
}
