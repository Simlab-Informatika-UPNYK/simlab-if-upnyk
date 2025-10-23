"use client";

import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import Link from "next/link";
import { DeleteButton } from "./delete-button";
import { Edit } from "lucide-react";

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
    header: () => <div className="text-right px-4">Aksi</div>,
    cell: ({ row }) => {
      const mk = row.original;

      return (
        <div className="flex gap-2 ms-auto w-fit">
          <Link href={`/admin/mk-praktikum/${mk.slug}/edit`}>
            <Button
              variant="ghost"
              size="icon"
            >
              <Edit className="h-4 w-4" />
            </Button>
          </Link>

          <DeleteButton id={mk.id} />
        </div>
      );
    },
  },
];
