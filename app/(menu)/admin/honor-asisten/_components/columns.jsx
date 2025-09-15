"use client";

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { PencilIcon } from "lucide-react";
import { Pencil } from "lucide-react";
import Link from "next/link";

export const columns = [
  {
    id: "no",
    header: ({ column }) => <DataTableColumnHeader column={column} title="No" />,
    cell: ({ row }) => {
      return row.index + 1;
    },
  },
  {
    accessorKey: "jenis",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Jenis" />,
  },
  {
    accessorKey: "biaya",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Biaya" />,
  },
  {
    header: "Aksi",
    id: "Aksi",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <Link href={`/admin/honor-asisten/${data.slug}/edit`}>
          <Button variant="ghost" size="sm">
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </Button>
        </Link>
      );
    },
  },
];
