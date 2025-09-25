"use client";

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import Link from "next/link";

export const aslabColumn = [
  {
    accessorKey: "no",
    header: () => "No",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "nama", // Updated accessorKey
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nama Laboratorium" /> // Updated title
    ),
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
];
