"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Eye, Printer, Clock, CheckCircle, XCircle } from "lucide-react";

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

export const columns = [
  {
    header: "NIM",
    id: "NIM",
    accessorKey: "nim",
  },
  {
    header: "Nama",
    id: "Nama",
    accessorKey: "nama",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <Link
          href={`/sertifikat/${data.nim}`}
          className="text-blue-600 hover:underline"
        >
          {data.nama}
        </Link>
      );
    },
  },
  {
    header: "Program Studi",
    id: "Program Studi",
    accessorKey: "program_studi",
  },
  {
    header: "Status",
    id: "Status",
    accessorKey: "status",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <span
          className={`px-3 py-1 rounded-full text-sm flex items-center gap-2 w-fit ${statusColors[data.status] || "bg-gray-100 text-gray-800"}`}
        >
          {statusIcons[data.status]}
          {data.status}
        </span>
      );
    },
  },
  {
    header: "Jumlah Kelas",
    id: "Jumlah Kelas",
    accessorKey: "total_courses",
    cell: ({ row }) => {
      const data = row.original;
      return <span className="font-medium">{data.total_courses} kelas</span>;
    },
  },
  /*   {
    header: "Aksi",
    id: "Aksi",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <div className="flex gap-2">
          <Link href={`/sertifikat/${data.nim}`}>
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4 mr-1" />
              Detail
            </Button>
          </Link>
          { <Button size="sm">
            <Printer className="h-4 w-4 mr-1" />
            Cetak
          </Button> *
        </div>
      );
    },
  }, */
];
