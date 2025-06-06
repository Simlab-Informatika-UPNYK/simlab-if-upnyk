"use client";

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Edit, Trash } from "lucide-react";

export const columns = [
  {
    id: "Kode Matkul",
    accessorKey: "kode_mk",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Kode Matkul" />
    ),
  },
  {
    id: "mata kuliah",
    accessorKey: "nama",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Mata Kuliah" />
    ),
    cell: ({ row }) => {
      const data = row.original;
      return (
        <Link
          href={`/mk-praktikum/${data.slug}`}
          className="text-blue-600 font-medium"
        >
          {data.nama}
        </Link>
      );
    },
  },
  {
    accessorKey: "semester",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Semester" />
    ),
  },
  {
    id: "jumlah kelas",
    accessorKey: "jumlah_kelas",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Jumlah Kelas" />
    ),
  },
  {
    id: "aksi",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Aksi" />
    ),
    cell: ({ row }) => {
      const data = row.original;
      return (
        <div className="flex items-center space-x-2">
          <Link href={`/mk-praktikum/${data.slug}/edit`}>
            <Button variant="ghost" size="icon">
              <Edit className="h-4 w-4" />
            </Button>
          </Link>
          <Button variant="ghost" size="icon" className="text-red-500">
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      );
    },
  },
];
