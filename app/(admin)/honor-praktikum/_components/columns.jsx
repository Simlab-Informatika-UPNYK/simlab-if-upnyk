"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export const columns = [
  {
    id: "NIM",
    header: "NIM",
    accessorKey: "nim",
  },
  {
    id: "Nama Asisten",
    header: "Nama Asisten",
    accessorKey: "nama_asisten",
  },
  {
    id: "Periode",
    header: "Periode",
    accessorKey: "periode",
  },
  {
    id: "Jumlah Honor",
    header: "Jumlah Honor",
    accessorKey: "jumlah_honor",
  },
  {
    id: "Tanggal Pengambilan",
    header: "Tanggal Pengambilan",
    accessorKey: "tanggal_pengambilan",
  },
  {
    id: "aksi",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <Link href={`/honor-praktikum/${data.nim}`}>
          <Button variant="secondary">Detail</Button>
        </Link>
      );
    },
  },
];
