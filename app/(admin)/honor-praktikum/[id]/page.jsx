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
import { getOneHonor } from "../actions";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function DetailPage({ params }) {
  const nim = (await params).id;
  const data = await getOneHonor(nim);

  // Dummy data
  const dummyData = {
    asisten: {
      id: "001",
      nim: "124200023",
      nama: "Cantika Amalia",
      periode: "Gasal 2024/2025",
      jumlah_honor: "Rp. 2,500,000",
      tanggal_pengambilan: "-",
    },
    honorarium: {
      records: [
        {
          semester_kelas: "B",
          mata_kuliah: "Manajemen Proses Bisnis",
          responsi: 35000,
          jumlah_mahasiswa: 25,
          honorarium: 400000,
          koreksi: 75000,
          naskah: 38000,
          jumlah_total: 513000,
        },
        {
          semester_kelas: "D",
          mata_kuliah: "Pemrograman Web",
          responsi: 35000,
          jumlah_mahasiswa: 26,
          honorarium: 400000,
          koreksi: 78000,
          naskah: 38000,
          jumlah_total: 516000,
        },
        {
          semester_kelas: "A",
          mata_kuliah: "Algoritma Pemrograman",
          responsi: 35000,
          jumlah_mahasiswa: 25,
          honorarium: 400000,
          koreksi: 75000,
          naskah: 38000,
          jumlah_total: 513000,
        },
      ],
      total: {
        responsi: 105000,
        honorarium: 1200000,
        koreksi: 228000,
        naskah: 114000,
        jumlah_total: 1647000,
      },
    },
  };

  return (
    <div className="max-w-screen-xl w-full mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Detail Honor Praktikum</h1>
        <div className="flex gap-2">
          <Link href={`/honor-praktikum/${nim}/edit`}>
            <Button variant="outline" size="icon">
              <Pencil className="h-4 w-4" />
            </Button>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                More <MoreHorizontal className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="text-red-600">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <BackButton />
        </div>
      </div>

      <div className="space-y-6">
        {/* Asisten Information */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Informasi Asisten</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">NIM</p>
              <p>{dummyData.asisten.nim}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Nama</p>
              <p>{dummyData.asisten.nama}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Periode</p>
              <p>{dummyData.asisten.periode}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Jumlah Honor</p>
              <p>{dummyData.asisten.jumlah_honor}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Tanggal Pengambilan</p>
              <p>{dummyData.asisten.tanggal_pengambilan}</p>
            </div>
          </div>
        </div>

        {/* Honorarium Table */}
        <div className="relative w-[0] min-w-full overflow-x-auto">
          <h2 className="text-xl font-semibold mb-4">Detail Honorarium</h2>
          <Table className="w-full">
            <TableHeader>
              <TableRow>
                <TableHead>Mata Kuliah</TableHead>
                <TableHead>Kelas</TableHead>
                <TableHead className="text-right">Responsi</TableHead>
                <TableHead className="text-right">Jumlah Mahasiswa</TableHead>
                <TableHead className="text-right">Honorarium</TableHead>
                <TableHead className="text-right">Koreksi</TableHead>
                <TableHead className="text-right">Naskah</TableHead>
                <TableHead className="text-right">Jumlah Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dummyData.honorarium.records.map((record, index) => (
                <TableRow key={index}>
                  <TableCell>{record.mata_kuliah}</TableCell>
                  <TableCell>{record.semester_kelas}</TableCell>
                  <TableCell className="text-right">
                    Rp. {record.responsi.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    {record.jumlah_mahasiswa}
                  </TableCell>
                  <TableCell className="text-right">
                    Rp. {record.honorarium.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    Rp. {record.koreksi.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    Rp. {record.naskah.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right">
                    Rp. {record.jumlah_total.toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={2}>Total</TableCell>
                <TableCell className="text-right">
                  Rp. {dummyData.honorarium.total.responsi.toLocaleString()}
                </TableCell>
                <TableCell className="text-right">-</TableCell>
                <TableCell className="text-right">
                  Rp. {dummyData.honorarium.total.honorarium.toLocaleString()}
                </TableCell>
                <TableCell className="text-right">
                  Rp. {dummyData.honorarium.total.koreksi.toLocaleString()}
                </TableCell>
                <TableCell className="text-right">
                  Rp. {dummyData.honorarium.total.naskah.toLocaleString()}
                </TableCell>
                <TableCell className="text-right font-bold">
                  Rp. {dummyData.honorarium.total.jumlah_total.toLocaleString()}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </div>
    </div>
  );
}
