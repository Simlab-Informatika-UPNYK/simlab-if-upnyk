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
    id: "Nama",
    header: "Nama",
    accessorKey: "nama",
  },
  {
    id: "Jumlah Kelas",
    header: "Jumlah Kelas",
    accessorKey: "jumlah_kelas",
  },
  {
    id: "Tanggal Diambil",
    header: "Tanggal Diambil",
    accessorKey: "tanggal_diambil",
  },
];
