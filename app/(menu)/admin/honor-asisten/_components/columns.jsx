"use client";

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Button } from "@/components/ui/button";
import { Edit, Trash } from "lucide-react";
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
    id: "actions",
    header: () => <div className="text-right px-4">Aksi</div>,
    cell: ({ row }) => {
      const data = row.original;
      return (
        <div className="flex gap-2 ms-auto w-fit">
          <Link href={`/admin/honor-asisten/${data.slug}/edit`}>
            <Button variant="ghost" size="icon">
              <Edit className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      );
    },
  },
];
