"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import React from "react"; // Add this import for React.use()
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
import { getOneHonor, getTahunSemesterId } from "../actions";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BelumDiambil, UpdateDialog } from "../_components/update-dialog";
import { HonorProvider, useHonor } from "../_components/honor-context";

function DetailPageContent() {
  const { data } = useHonor();
  const searchParams = useSearchParams();
  const periodeSlug = searchParams.get("periode");
  const [tahunSemesterId, setTahunSemesterId] = useState(-1);

  useEffect(() => {
    const fetchTahunSemesterId = async () => {
      const idPeriode = await getTahunSemesterId(periodeSlug);
      setTahunSemesterId(idPeriode);
    };

    fetchTahunSemesterId();
  }, [periodeSlug]);

  return (
    <div className="max-w-screen-xl w-full mx-auto">
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          Honor Praktikum
          {/* - {periodeSlug && <span className="text-primary">{periodeSlug}</span>} */}
        </h1>
        <div className="flex gap-2">
          {data.kelas &&
            data.kelas.length > 0 &&
            (data.tanggal_diambil ? (
              <BelumDiambil
                idAslabHonor={data.id_aslab_honor}
                aslabId={data.asisten?.id_aslab}
                tahunSemesterId={tahunSemesterId}
              />
            ) : (
              <UpdateDialog
                idAslabHonor={data.id_aslab_honor}
                aslabId={data.asisten?.id_aslab}
                tahunSemesterId={tahunSemesterId}
              />
            ))}
        </div>
      </div>
      <div className="space-y-6">
        {/* Asisten Information */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Informasi Asisten</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">NIM</p>
              <p>{data.asisten?.nim}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Nama</p>
              <p>{data.asisten?.nama}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Jumlah Honor</p>
              <p>{data.formatted_honor}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Tanggal Pengambilan</p>
              <p>{data.tanggal_diambil ?? "-"}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border p-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-4 border-b pb-2">
            Perhitungan
          </h2>
          <div className="space-y-2 text-sm">
            <div className="flex items-center">
              <span className="w-24 font-medium">Responsi</span>
              <span className="text-gray-600">: 1 × Rp 35.000</span>
            </div>
            <div className="flex items-center">
              <span className="w-24 font-medium">Koreksi</span>
              <span className="text-gray-600">
                : Jumlah mahasiswa × Rp 6.000
              </span>
            </div>
            <div className="flex items-center">
              <span className="w-24 font-medium">Honorarium</span>
              <span className="text-gray-600">: Jumlah hadir × Rp 40.000</span>
            </div>
          </div>
        </div>

        <div className="relative w-[0] min-w-full overflow-x-auto">
          <h2 className="text-xl font-semibold mb-4">Detail Honorarium</h2>
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead>Mata Kuliah</TableHead>
                <TableHead>Kelas</TableHead>
                <TableHead className="text-right">Responsi</TableHead>
                <TableHead className="text-right">Jumlah Mahasiswa</TableHead>
                <TableHead className="text-right">Koreksi</TableHead>
                <TableHead className="text-right">Naskah</TableHead>
                <TableHead className="text-right">Honorarium</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.kelas?.map((kelas, index) => (
                <TableRow key={index}>
                  <TableCell>{kelas.mata_kuliah.nama}</TableCell>
                  <TableCell>{kelas.kelas}</TableCell>
                  <TableCell className="text-right">
                    Rp. {kelas.honor_breakdown.responsi.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    {kelas.jumlah_praktikan}
                  </TableCell>
                  <TableCell className="text-right">
                    Rp. {kelas.honor_breakdown.koreksi.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    Rp. {kelas.honor_breakdown.naskah.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    Rp. {kelas.honor_breakdown.honorarium.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right font-bold">
                    Rp. {kelas.honor_kelas.toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={7}>Total</TableCell>
                <TableCell className="text-right font-bold">
                  {data.formatted_honor}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default function DetailPage({ params }) {
  // Unwrap params using React.use()
  const unwrappedParams = React.use(params);
  const nim = unwrappedParams.id;

  const searchParams = useSearchParams();
  const periodeSlug = searchParams.get("periode");

  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initial data fetch logic...
    const fetchData = async () => {
      try {
        const tahunSemesterId = await getTahunSemesterId(periodeSlug);
        const honorData = await getOneHonor(nim, tahunSemesterId);
        setInitialData(honorData);
        console.log("honor data", honorData);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [nim, periodeSlug]);

  if (loading) return <div>Loading...</div>;
  if (!initialData) return <div>Honor not found</div>;

  return (
    <HonorProvider initialData={initialData}>
      <DetailPageContent />
    </HonorProvider>
  );
}
