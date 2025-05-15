"use client";

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { ActionCell } from "./action-cell";

export const columns = [  
  {
    accessorKey: "nama",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nama" />
    ),
    cell: ({ row }) => {
      const data = row.original;
      return <Link href={`user/${data.slug}`} className="text-blue-600">{data.nama}</Link>;
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
  },
  {
    accessorKey: "role",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Role" />
    ),
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
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
