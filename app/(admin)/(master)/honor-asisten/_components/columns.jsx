"use client";

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Edit, Trash } from "lucide-react";

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
    accessorKey: "jenis",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Jenis" />
    ),
    cell: ({ row }) => {
      const data = row.original;
      return (
        <Link href={`/honor-asisten/${data.no}`} className="hover:underline">
          {data.jenis}
        </Link>
      );
    },
  },
  {
    accessorKey: "biaya",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Biaya" />
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
          <Link href={`/honor-asisten/edit/${data.id}`}>
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
