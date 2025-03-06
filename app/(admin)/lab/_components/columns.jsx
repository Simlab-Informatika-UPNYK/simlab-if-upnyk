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
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
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
            className="hover:underline font-medium"
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
