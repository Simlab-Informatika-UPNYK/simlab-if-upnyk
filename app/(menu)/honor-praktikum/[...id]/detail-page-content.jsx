"use client";

import { useState, useEffect, use } from "react";
import { BelumDiambil, UpdateDialog } from "./_components/update-dialog";
import { useHonor } from "./_components/honor-context";
import { getTahunSemesterId } from "./actions";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function DetailPageContent({ params }) {
  const { data } = useHonor();
  const { id: periodeSlug } = use(params);
  const [tahunSemesterId, setTahunSemesterId] = useState(-1);

  useEffect(() => {
    const fetchTahunSemesterId = async () => {
      const idPeriode = await getTahunSemesterId(periodeSlug);
      setTahunSemesterId(idPeriode);
    };

    fetchTahunSemesterId();
  }, [periodeSlug]);

  console.log(data);

  return (
    <div className="max-w-screen-xl w-full mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Honor Praktikum</h1>
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
              <span className="text-gray-600">
                : 1 x Rp {data.honor_jenis.responsi.biaya}
              </span>
            </div>
            <div className="flex items-center">
              <span className="w-24 font-medium">Koreksi</span>
              <span className="text-gray-600">
                : Jumlah mahasiswa x Rp {data.honor_jenis.koreksi.biaya}
              </span>
            </div>
            <div className="flex items-center">
              <span className="w-24 font-medium">Honorarium</span>
              <span className="text-gray-600">
                : Jumlah hadir x Rp {data.honor_jenis.honorarium.biaya}
              </span>
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
