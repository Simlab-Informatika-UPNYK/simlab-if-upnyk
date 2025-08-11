"use client";

import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import Link from "next/link";

export const columns = [
  {
    accessorKey: "Kode Mata Kuliah",
    header: "Kode Mata Kuliah",
  },
  {
    accessorKey: "Nama",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nama
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const mk_praktikum = row.original;
      return (
        <Link href={`/admin/mk-praktikum/${mk_praktikum.slug}`}>
          <span className="text-blue-600 hover:underline cursor-pointer">
            {mk_praktikum["Nama"]}
          </span>
        </Link>
      );
    },
  },
  {
    accessorKey: "Semester",
    header: "Semester",
  },
  {
    accessorKey: "Jumlah Kelas",
    header: "Jumlah Kelas",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const mk = row.original;

      return (
        <div className="flex gap-2">
          <Link href={`/admin/mk-praktikum/${mk.slug}/edit`}>
            <Button variant="outline" size="sm">
              Edit
            </Button>
          </Link>
        </div>
      );
    },
  },
];
