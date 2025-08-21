"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ActionCell } from "./action-cell";

export const columns = [
  {
    id: "NIM",
    header: "NIM",
    accessorKey: "nim",
  },
  {
    id: "Nama",
    header: "Nama",
    accessorKey: "nama",
    cell: ({ row }) => {
      return (
        <Link
          href={`/honor-praktikum/${row.original.tahun_semester}/${row.original.nim}`}
          className="text-blue-600 hover:text-blue-800 hover:underline"
        >
          {row.original.nama}
        </Link>
      );
    },
  },
  {
    id: "Jumlah Kelas",
    header: "Jumlah Kelas",
    accessorKey: "jumlah_kelas",
  },
  {
    id: "Status Honor",
    header: "Status Honor",
    accessorKey: "status_honor",
  },
  {
    id: "Tanggal Diambil",
    header: "Tanggal Diambil",
    accessorKey: "tanggal_diambil",
  },
  // {
  //   id: "actions",
  //   header: "Actions",
  //   cell: ({ row }) => {
  //     return (
  //       <div className="flex justify-end">
  //         <ActionCell row={row} />
  //       </div>
  //     );
  //   },
  // },
];
