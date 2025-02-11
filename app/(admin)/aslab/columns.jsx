"use client"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowUpDown } from "lucide-react"
import {DataTableColumnHeader} from "./data-table-column-header"

export const columns = [
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
  },
{
    accessorKey: "nama",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nama" />
    ),
  },
  {
    accessorKey: "nim",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="NIM" />
    ),
  },
  {
    accessorKey: "no_hp",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="No HP" />
    ),
  },
  {
    accessorKey: "angkatan",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Angkatan" />
    ),
  },
  {
    accessorKey: "jurusan",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Jurusan" />
    ),
  }
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