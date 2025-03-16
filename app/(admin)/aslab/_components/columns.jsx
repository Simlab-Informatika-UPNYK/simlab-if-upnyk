"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { DataTableColumnHeader } from "./data-table-column-header"
import { ActionCell } from "./action-cell"
import Link from "next/link"

export const columns = [
  
  {
    accessorKey: "nama",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nama" />
    ),
    cell: ({ row }) => {
      const user = row.original;
      const initials = user.nama
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase();

      return (
        <Link href={`/aslab/${user.nim}`} className="flex items-center gap-3">
          {user.profile_picture ? (
            <img
              src={user.profile_picture}
              alt={user.nama}
              className="h-8 w-8 rounded-full object-cover"
            />
          ) : (
            <div className="flex aspect-square h-8 w-8 items-center justify-center rounded-full bg-gray-100">
              <span className="text-sm font-medium text-gray-600">
                {initials}
              </span>
            </div>
          )}
          <span>{user.nama}</span>
        </Link >
      );
    },
  },
  {
    accessorKey: "nim",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="NIM" />
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
  },
  {
    accessorKey: "angkatan",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Angkatan" />
    ),
  },
  {
    id: "program studi",
    accessorKey: "program_studi",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Program Studi" />
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
    enableGlobalFilter: false,
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return <ActionCell row={row.original} />
    },
  },
  // {
  //   accessorKey: "amount",
  //   header: ({ column }) => (
  //     <div className="w-fit ms-auto">
  //     <DataTableColumnHeader column={column} title="Amount" />
  //     </div>
  //   ),
  //   cell: ({ row }) => {
  //     const amount = parseFloat(row.getValue("amount"))
  //     const formatted = new Intl.NumberFormat("id-ID", {
  //       style: "currency",
  //       currency: "IDR",
  //     }).format(amount)

  //     return <div className="text-right font-medium">{formatted}</div>
  //   },
  // },
]