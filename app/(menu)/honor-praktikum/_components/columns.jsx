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
        <Link href={`/honor-praktikum/${data.tahun_semester}/${data.nim}`} className="text-blue-600 hover:underline">
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
    accessorKey: "mata_kuliah",
    header: "Mata Kuliah",
    cell: ({ row }) => {
      const mataKuliah = row.getValue("mata_kuliah");
      if (mataKuliah.length < 1) return "-";
      const mataKuliahList = mataKuliah.split("|").map((item) => item.trim());
      return (
        <ul className="list-disc list-inside">
          {mataKuliahList.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      );
    },
  },
  {
    accessorKey: "jumlah_honor",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0 hover:bg-black/0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Jumlah Honor
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      const jumlahHonor = row.getValue("jumlah_honor");
      return <span>{jumlahHonor > 0 ? `Rp. ${jumlahHonor.toLocaleString("id-ID")}` : "-"}</span>;
    },
  },
];
