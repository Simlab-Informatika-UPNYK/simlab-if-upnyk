"use client";

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Edit } from "lucide-react";
import { DeleteButton } from "./delete-button";

export const columns = [
  
  {
    accessorKey: "nama", // Updated accessorKey
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nama Laboratorium" /> // Updated title
    ),
    cell: ({ row }) => {
      const data = row.original;
      return (
        <div className="flex items-center">
          <Link
            href={`/lab/${data.slug}`}
            className="text-blue-600 font-medium"
          >
            {data.nama}
          </Link>
        </div>
      );
    },
  },
  {
    accessorKey: "lantai", // Updated accessorKey
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Lantai" /> // Updated title
    ),
  },
  {
    accessorKey: "kapasitas", // Updated accessorKey
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Kapasitas" /> // Updated title
    ),
  },
  {
    id: "kalab",
    accessorKey: "kalab", // Updated accessorKey
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Kalab" /> // Updated title
    ),
  },
  {
    id: "Aksi", // Updated id
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Aksi" /> // Updated title
    ),
    cell: ({ row }) => {
      const data = row.original;
      return (
        <div className="flex items-center space-x-2">
          <Link href={`/lab/${data.slug}/edit`}>
            <Button variant="ghost" size="icon">
              <Edit className="h-4 w-4" />
            </Button>
          </Link>
          <DeleteButton slug={data.slug} />
        </div>
      );
    },
  },
];
