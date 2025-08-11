"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Pencil } from "lucide-react";
import { DeleteButton } from "./delete-button";

export const columns = [
  {
    accessorKey: "no",
    header: "No",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "Nama Lengkap",
    header: "Nama Lengkap",
    cell: ({ row }) => {
      const kalab = row.original;
      return (
        <Link href={`/admin/kalab/${kalab.slug}`}>
          <span className="text-blue-600 hover:underline cursor-pointer">
            {kalab["Nama Lengkap"]}
          </span>
        </Link>
      );
    },
  },
  {
    accessorKey: "NIDN/NIP",
    header: "NIDN/NIP",
  },
  {
    accessorKey: "Email",
    header: "Email",
  },
  {
    accessorKey: "no_hp",
    header: "No. Telepon",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const kalab = row.original;

      return (
        <div className="flex gap-2">
          <Link href={`/admin/kalab/${kalab.slug}/edit`}>
            <Button variant="ghost" size="sm">
              <Pencil className="h-4 w-4" />
            </Button>
          </Link>
          <DeleteButton slug={kalab.slug} />
        </div>
      );
    },
  },
];
