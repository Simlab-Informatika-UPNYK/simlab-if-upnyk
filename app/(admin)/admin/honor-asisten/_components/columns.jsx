"use client";

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import Link from "next/link";
import { ActionCell } from "./action-cell";

export const columns = [
  {
    id: "no",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="No" />
    ),
    cell: ({ row }) => {
      return row.index + 1;
    },
  },
  {
    accessorKey: "jenis",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Jenis" />
    ),
    cell: ({ row }) => {
      const data = row.original;
      return (
        <Link href={`/admin/honor-asisten/${data.slug}`} className="text-blue-600">
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
      return <ActionCell data={data} />;
    },
  },
];
