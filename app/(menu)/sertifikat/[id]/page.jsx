"use client";

import { useState, useEffect } from "react";
import React from "react";
import { Button } from "@/components/ui/button";
import { Printer } from "lucide-react";
import BackButton from "@/components/back-button";
import { getAslabDetailByNim } from "../actions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import SertifikatPDF from "../_components/sertifikat-pdf";

export default function AslabDetail({ params }) {
  const { toast } = useToast();

  // Unwrap params with React.use()
  const unwrappedParams = React.use(params);
  const nim = unwrappedParams.id;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [printing, setPrinting] = useState(false);

  // Fetch data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const aslabData = await getAslabDetailByNim(nim);
        setData(aslabData);
      } catch (error) {
        toast({
          title: "Error",
          description: "Terjadi kesalahan saat mengambil data mahasiswa",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [nim, toast]);

  // Handle certificate printing
  const handlePrintCertificate = async () => {
    setPrinting(true);
    try {
      // Dynamically import PDF renderer
      const { pdf } = await import('@react-pdf/renderer');
      
      // Create PDF blob
      const blob = await pdf(<SertifikatPDF data={data} />).toBlob();
      
      // Create download link
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Sertifikat_${data.nim}_${data.nama.replace(/\s+/g, '_')}.pdf`;
      document.body.appendChild(link);
      link.click();
      
      // Clean up
      setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }, 100);
      
      toast({
        title: "Berhasil",
        description: "Sertifikat berhasil diunduh. Silakan buka file untuk mencetak.",
        variant: "success",
      });
      
    } catch (error) {
      toast({
        title: "Error",
        description: "Terjadi kesalahan saat membuat sertifikat",
        variant: "destructive",
      });
    } finally {
      setPrinting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">Loading...</div>
    );
  }

  if (!data) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Detail Mahasiswa</h1>
          <BackButton />
        </div>
        <div className="text-center p-6">
          <p>Data mahasiswa tidak ditemukan</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Detail Mahasiswa</h1>
        <div className="flex gap-2">
          <BackButton />
          <Button 
            onClick={handlePrintCertificate} 
            disabled={printing || data.courses.length < 1}
            className="flex items-center gap-2"
          >
            <Printer size={16} />
            {printing ? "Mencetak..." : "Cetak Sertifikat"}
          </Button>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <h3 className="text-sm text-gray-500">Nama Mahasiswa</h3>
          <p className="font-medium">{data.nama}</p>
        </div>
        <div>
          <h3 className="text-sm text-gray-500">NIM</h3>
          <p className="font-medium">{data.nim}</p>
        </div>
        <div>
          <h3 className="text-sm text-gray-500">Program Studi</h3>
          <p className="font-medium">{data.program_studi}</p>
        </div>
        <div>
          <h3 className="text-sm text-gray-500">Angkatan</h3>
          <p className="font-medium">{data.angkatan}</p>
        </div>
        <div>
          <h3 className="text-sm text-gray-500">Email</h3>
          <p className="font-medium">{data.email}</p>
        </div>
        <div>
          <h3 className="text-sm text-gray-500">No. HP</h3>
          <p className="font-medium">{data.no_hp}</p>
        </div>
        <div>
          <h3 className="text-sm text-gray-500">Status</h3>
          <p className="font-medium">{data.status}</p>
        </div>
      </div>

      <div className="mb-4">
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
            <p className="text-gray-500">Mahasiswa belum mengajar kelas praktikum</p>
          </div>
        )}
      </div>
    </div>
  );
}
