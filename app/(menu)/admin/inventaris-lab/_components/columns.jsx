"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Pencil } from "lucide-react";
import { DeleteButton } from "./delete-button";
import { Edit } from "lucide-react";

export const columns = [
  {
    accessorKey: "no",
    header: "No",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "nama",
    header: "Nama Lab",
    cell: ({ row }) => {
      const lab = row.original;
      return (
        <Link href={`/admin/inventaris-lab/${lab.slug}`}>
          <span className="text-blue-600 hover:underline cursor-pointer">
            {lab.nama}
          </span>
        </Link>
      );
    },
  },
  {
    accessorKey: "lantai",
    header: "Lantai",
  },
  {
    accessorKey: "kapasitas",
    header: "Kapasitas",
  },
  {
    accessorKey: "kalab",
    header: "Kepala Lab",
  },
  {
    id: "actions",
    header: () => <div className="text-right px-4">Aksi</div>,
    cell: ({ row }) => {
      const lab = row.original;
      return (
        <div className="flex gap-2 ms-auto w-fit">
          <Link href={`/admin/inventaris-lab/${lab.slug}/edit`}>
            <Button variant="ghost" size="icon">
              <Edit className="h-4 w-4" />
            </Button>
          </Link>
          <DeleteButton id={lab.id} labId={lab.id} />
        </div>
      );
    },
  },
];
