"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

export const columns = [
  {
    accessorKey: "no",
    header: () => "No",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "nim",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0 hover:bg-black/0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          NIM
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      const data = row.original;
      return (
        <Link
          href={`/honor-praktikum/${data.tahun_semester}/${data.nim}`}
          className="text-blue-600 hover:underline"
        >
          {data.nim}
        </Link>
      );
    },
  },
  {
    accessorKey: "nama",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0 hover:bg-black/0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nama Asisten
          <ArrowUpDown />
        </Button>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "jumlah_kelas",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0 hover:bg-black/0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Jumlah Kelas
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      const jumlahKelas = row.getValue("jumlah_kelas");
      return (
        <span className={jumlahKelas > 0 ? "text-green-600 font-medium" : "text-gray-400"}>
          {jumlahKelas} kelas
        </span>
      );
    },
  },
];
