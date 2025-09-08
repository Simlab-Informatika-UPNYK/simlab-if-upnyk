"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Eye, Clock, CheckCircle, XCircle } from "lucide-react";

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

export const aslabColumns = [
  {
    header: "Tanggal Pengajuan",
    id: "tanggal_pengajuan",
    accessorKey: "tanggal_pengajuan",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <Link href={`/sertifikat/my/${data.id}`} className="text-blue-600 hover:underline font-medium">
          {data.tanggal_pengajuan}
        </Link>
      );
    },
  },
  {
    header: "Alasan",
    id: "alasan",
    accessorKey: "alasan",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <div className="max-w-md">
          <p className="text-sm line-clamp-2">{data.alasan || "-"}</p>
        </div>
      );
    },
  },
  {
    header: "Status",
    id: "status",
    accessorKey: "status",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <span className={`px-3 py-1 rounded-full text-sm flex items-center gap-2 w-fit ${statusColors[data.status]}`}>
          {statusIcons[data.status]}
          {data.status}
        </span>
      );
    },
  },
  {
    header: "Keterangan",
    id: "keterangan",
    accessorKey: "keterangan",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <div className="max-w-md">
          <p className="text-sm text-gray-600">{data.keterangan || "-"}</p>
        </div>
      );
    },
  },
];
