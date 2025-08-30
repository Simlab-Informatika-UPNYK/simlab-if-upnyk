'use client';

import * as React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { getOneHonor } from './[...id]/actions';

const HonorDetail = ({
  tahunSemester,
  nim,
  initialTahunSemester,
  initialNim,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [honorData, setHonorData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Get parameters from URL path or query params
  const pathTahunSemester = initialTahunSemester;
  const pathNim = initialNim;

  const currentTahunSemester =
    pathTahunSemester ||
    searchParams.get('tahunsemester') ||
    (tahunSemester && tahunSemester.length > 0 ? tahunSemester[0]?.slug : '');
  const currentNim = pathNim || searchParams.get('nim') || nim;

  // Fetch honor data when parameters change
  useEffect(() => {
    const fetchHonorData = async () => {
      if (!currentNim || !currentTahunSemester) return;

      setLoading(true);
      setError(null);

      try {
        const data = await getOneHonor(currentNim, currentTahunSemester);
        if (data.error) {
          setError(data.error);
        } else {
          setHonorData(data);
        }
      } catch (err) {
        setError(err.message || 'Terjadi kesalahan saat mengambil data honor');
      } finally {
        setLoading(false);
      }
    };

    fetchHonorData();
  }, [currentTahunSemester, currentNim]);

  const handleTahunSemesterChange = (value) => {
    setLoading(true);
    const params = new URLSearchParams(searchParams);
    params.set('tahunsemester', value);
    params.set('nim', currentNim);

    // Navigate to the selected tahun semester page with query parameters
    router.push(`/honor-praktikum/?${params.toString()}`);
  };

  return (
    <div className="p-5 space-y-6">
      <div>
        <Select
          onValueChange={handleTahunSemesterChange}
          defaultValue={tahunSemester[0]?.slug}
        >
          <SelectTrigger className="w-[250px]">
            <SelectValue placeholder="Pilih Tahun Semester" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Tahun Semester</SelectLabel>
              {tahunSemester.map((item) => (
                <SelectItem key={item.id} value={item.slug}>
                  {item.tahun_ajaran} {item.semester}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Honor Detail Section */}
      {loading && (
        <div className="max-w-screen-xl w-full mx-auto">
          <div className="flex justify-between items-center mb-6">
            <Skeleton className="h-8 w-48" />
          </div>

          <div className="space-y-6">
            {/* Asisten Information Skeleton */}
            <div>
              <Skeleton className="h-6 w-40 mb-4" />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Skeleton className="h-4 w-8 mb-2" />
                  <Skeleton className="h-5 w-24" />
                </div>
                <div>
                  <Skeleton className="h-4 w-12 mb-2" />
                  <Skeleton className="h-5 w-32" />
                </div>
                <div>
                  <Skeleton className="h-4 w-20 mb-2" />
                  <Skeleton className="h-5 w-28" />
                </div>
                <div>
                  <Skeleton className="h-4 w-24 mb-2" />
                  <Skeleton className="h-5 w-16" />
                </div>
              </div>
            </div>

            {/* Honor Calculation Info Skeleton */}
            <div className="bg-white rounded-lg border p-6 shadow-sm">
              <Skeleton className="h-6 w-24 mb-4" />
              <div className="space-y-2">
                <div className="flex items-center">
                  <Skeleton className="h-4 w-16 mr-4" />
                  <Skeleton className="h-4 w-40" />
                </div>
                <div className="flex items-center">
                  <Skeleton className="h-4 w-16 mr-4" />
                  <Skeleton className="h-4 w-48" />
                </div>
                <div className="flex items-center">
                  <Skeleton className="h-4 w-16 mr-4" />
                  <Skeleton className="h-4 w-44" />
                </div>
              </div>
            </div>

            {/* Honor Detail Table Skeleton */}
            <div className="relative w-[0] min-w-full overflow-x-auto">
              <Skeleton className="h-6 w-36 mb-4" />
              <div className="border rounded-lg">
                {/* Table Header Skeleton */}
                <div className="grid grid-cols-8 gap-4 p-4 border-b bg-gray-50">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-12" />
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-14" />
                  <Skeleton className="h-4 w-12" />
                  <Skeleton className="h-4 w-18" />
                  <Skeleton className="h-4 w-12" />
                </div>
                {/* Table Body Skeleton */}
                {[1, 2, 3].map((row) => (
                  <div
                    key={row}
                    className="grid grid-cols-8 gap-4 p-4 border-b"
                  >
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-8" />
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-6" />
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                ))}
                {/* Table Footer Skeleton */}
                <div className="grid grid-cols-8 gap-4 p-4 bg-gray-50">
                  <div className="col-span-7">
                    <Skeleton className="h-4 w-10" />
                  </div>
                  <Skeleton className="h-4 w-20" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="text-red-600 p-4 bg-red-50 rounded-lg">
          <p>Error: {error}</p>
        </div>
      )}

      {honorData && !loading && !error && (
        <div className="max-w-screen-xl w-full mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Honor Praktikum</h1>
          </div>

          <div className="space-y-6">
            {/* Asisten Information */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Informasi Asisten</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">NIM</p>
                  <p>{honorData.asisten?.nim}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Nama</p>
                  <p>{honorData.asisten?.nama}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Jumlah Honor</p>
                  <p>{honorData.formatted_honor ?? 0}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Tanggal Pengambilan</p>
                  <p>{honorData.tanggal_diambil ?? '-'}</p>
                </div>
              </div>
            </div>

            {/* Honor Calculation Info */}
            <div className="bg-white rounded-lg border p-6 shadow-sm">
              <h2 className="text-lg font-semibold mb-4 border-b pb-2">
                Perhitungan
              </h2>
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <span className="w-24 font-medium">Responsi</span>
                  <span className="text-gray-600">
                    : 1 x Rp{' '}
                    {honorData.honor_jenis.responsi?.biaya?.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="w-24 font-medium">Koreksi</span>
                  <span className="text-gray-600">
                    : Jumlah mahasiswa x Rp{' '}
                    {honorData.honor_jenis.koreksi?.biaya?.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="w-24 font-medium">Honorarium</span>
                  <span className="text-gray-600">
                    : Jumlah hadir x Rp{' '}
                    {honorData.honor_jenis.honorarium?.biaya?.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Honor Detail Table */}
            {honorData.kelas && honorData.kelas.length > 0 && (
              <div className="relative w-[0] min-w-full overflow-x-auto">
                <h2 className="text-xl font-semibold mb-4">
                  Detail Honorarium
                </h2>
                <Table className="w-full">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Mata Kuliah</TableHead>
                      <TableHead>Kelas</TableHead>
                      <TableHead className="text-right">Responsi</TableHead>
                      <TableHead className="text-right">
                        Jumlah Mahasiswa
                      </TableHead>
                      <TableHead className="text-right">Koreksi</TableHead>
                      <TableHead className="text-right">Naskah</TableHead>
                      <TableHead className="text-right">Honorarium</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {honorData.kelas.map((kelas, index) => (
                      <TableRow key={index}>
                        <TableCell>{kelas.mata_kuliah?.nama}</TableCell>
                        <TableCell>{kelas.kelas}</TableCell>
                        <TableCell className="text-right">
                          Rp.{' '}
                          {kelas.honor_breakdown?.responsi?.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-right">
                          {kelas.jumlah_praktikan}
                        </TableCell>
                        <TableCell className="text-right">
                          Rp. {kelas.honor_breakdown?.koreksi?.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-right">
                          Rp. {kelas.honor_breakdown?.naskah?.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-right">
                          Rp.{' '}
                          {kelas.honor_breakdown?.honorarium?.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-right font-bold">
                          Rp. {kelas.honor_kelas?.toLocaleString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TableCell colSpan={7}>Total</TableCell>
                      <TableCell className="text-right font-bold">
                        {honorData.formatted_honor}
                      </TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
              </div>
            )}

            {(!honorData.kelas || honorData.kelas.length === 0) && (
              <div className="text-center py-8 text-gray-500">
                <p>Tidak ada data kelas untuk periode ini</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default HonorDetail;
