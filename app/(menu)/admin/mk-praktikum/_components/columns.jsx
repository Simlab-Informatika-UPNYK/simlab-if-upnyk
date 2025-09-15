"use client";

import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import Link from "next/link";
import { DeleteButton } from "./delete-button";

export const columns = [
  {
    accessorKey: "kode_mk",
    header: "Kode Mata Kuliah",
  },
  {
    accessorKey: "nama",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Nama
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "jumlah_kelas",
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
          <DeleteButton id={mk.id} />
        </div>
      );
    },
  },
];
