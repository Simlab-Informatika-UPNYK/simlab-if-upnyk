"use client";

import { useState, useEffect } from "react";
import { getCertificateRequestByIdForAslab } from "../../actions";
import BackButton from "@/components/back-button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Clock, CheckCircle, XCircle } from "lucide-react";

const statusIcons = {
  Pending: <Clock className="h-4 w-4 text-yellow-600" />,
  Disetujui: <CheckCircle className="h-4 w-4 text-green-600" />,
  Ditolak: <XCircle className="h-4 w-4 text-red-600" />,
};

const statusColors = {
  Pending: "bg-yellow-100 text-yellow-800",
  Disetujui: "bg-green-100 text-green-800",
  Ditolak: "bg-red-100 text-red-800",
};

export default function AslabCertificateDetail({ requestId }) {
  const { toast } = useToast();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const certificateData = await getCertificateRequestByIdForAslab(parseInt(requestId));
        setData(certificateData);
      } catch (error) {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [requestId, toast]);

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex justify-center items-center h-64">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Detail Permintaan Sertifikat</h1>
          <BackButton />
        </div>
        <div className="text-center p-6">
          <p>Data permintaan sertifikat tidak ditemukan</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Detail Permintaan Sertifikat</h1>
        <BackButton />
      </div>

      <div className="bg-white rounded-lg border p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Status Permintaan</h3>
          <span
            className={`px-3 py-1 rounded-full text-sm flex items-center gap-2 ${statusColors[data.status]}`}
          >
            {statusIcons[data.status]}
            {data.status}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="text-sm text-gray-500">Nama Asisten</label>
            <p className="font-medium">{data.nama_asisten}</p>
          </div>
          <div>
            <label className="text-sm text-gray-500">NIM</label>
            <p className="font-medium">{data.nim}</p>
          </div>
          <div>
            <label className="text-sm text-gray-500">Email</label>
            <p className="font-medium">{data.email}</p>
          </div>
          <div>
            <label className="text-sm text-gray-500">No. HP</label>
            <p className="font-medium">{data.no_hp || "-"}</p>
          </div>
          <div>
            <label className="text-sm text-gray-500">Program Studi</label>
            <p className="font-medium">{data.program_studi}</p>
          </div>
          <div>
            <label className="text-sm text-gray-500">Angkatan</label>
            <p className="font-medium">{data.angkatan}</p>
          </div>
          <div>
            <label className="text-sm text-gray-500">Tanggal Pengajuan</label>
            <p className="font-medium">{data.tanggal_pengajuan}</p>
          </div>
          <div>
            <label className="text-sm text-gray-500">Status Aslab</label>
            <p className="font-medium">{data.status_aslab}</p>
          </div>
        </div>

        {data.alasan && (
          <div className="mb-4">
            <label className="text-sm text-gray-500">Alasan Pengajuan</label>
            <p className="font-medium mt-1 p-3 bg-gray-50 rounded-md">{data.alasan}</p>
          </div>
        )}

        {data.keterangan && (
          <div className="mb-4">
            <label className="text-sm text-gray-500">Keterangan</label>
            <p className="font-medium text-red-600 mt-1 p-3 bg-red-50 rounded-md">{data.keterangan}</p>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg border p-6">
        <h2 className="text-xl font-semibold mb-4">Kelas yang Diajar</h2>
        {data.courses && data.courses.length > 0 ? (
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead>No.</TableHead>
                <TableHead>Mata Kuliah</TableHead>
                <TableHead>Kelas</TableHead>
                <TableHead>Semester</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.courses.map((course, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{course.mata_kuliah}</TableCell>
                  <TableCell>{course.kelas}</TableCell>
                  <TableCell>{course.semester}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="text-center p-6 border rounded-lg">
            <p className="text-gray-500">Belum mengajar kelas praktikum</p>
          </div>
        )}
      </div>
    </div>
  );
}
