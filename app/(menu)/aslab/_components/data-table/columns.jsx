"use client";

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { ActionCell } from "./action-cell";
import Link from "next/link";

export const columns = [
  {
    accessorKey: "no",
    header: () => "No",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "nama",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Nama" />,
    /* cell: ({ row }) => {
      const user = row.original;

      return (
        <Link href={`/aslab/${user.nim}`} className="flex items-center gap-3">
          <span className="text-blue-600">{user.nama}</span>
        </Link>
      );
    }, */
  },
  {
    accessorKey: "nim",
    header: ({ column }) => <DataTableColumnHeader column={column} title="NIM" />,
  },
  {
    accessorKey: "email",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />,
  },
  {
    accessorKey: "angkatan",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Angkatan" />,
  },
  {
    id: "program studi",
    accessorKey: "program_studi",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Program Studi" />,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
    enableGlobalFilter: false,
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return <ActionCell row={row.original} />;
    },
  },
];
