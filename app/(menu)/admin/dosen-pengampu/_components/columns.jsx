"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal, Pencil } from "lucide-react";
import Link from "next/link";
import { DeleteButton } from "./delete-button";
import { Edit } from "lucide-react";

export const columns = [
  {
    accessorKey: "nama",
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
  },
  {
    accessorKey: "nip",
    header: "NIP",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    id: "actions",
    header: () => <div className="text-right px-4">Aksi</div>,
    cell: ({ row }) => {
      const dosen = row.original;

      return (
        <div className="flex gap-2 ms-auto w-fit">
          <Link href={`/admin/dosen-pengampu/${dosen.slug}/edit`}>
            <Button variant="ghost" size="icon">
              <Edit className="h-4 w-4" />
            </Button>
          </Link>
          <DeleteButton slug={dosen.slug} />
        </div>
      );
    },
  },
];
