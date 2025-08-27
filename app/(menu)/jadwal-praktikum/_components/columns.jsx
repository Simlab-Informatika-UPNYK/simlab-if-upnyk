"use client";

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import Link from "next/link";
import { ActionCell } from "./action-cell";

export const columns = [
  {
    accessorKey: "kelas",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Kelas" />
    ),
    cell: ({ row }) => {
      const data = row.original;
      return (
        <Link
          href={`/jadwal-praktikum/${data.id}`}
          className="text-blue-600 hover:underline"
        >
          {data.kelas}
        </Link>
      );
    },
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "mata_kuliah",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Mata Kuliah" />
    ),
    enableSorting: true,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "dosen",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Dosen" />
    ),
    enableSorting: true,
  },
  {
    accessorKey: "jumlah_praktikan",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Jumlah Praktikan" />
    ),
    enableSorting: true,
  },
  {
    accessorKey: "hari",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Hari" />
    ),
    enableSorting: true,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "waktu",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Waktu" />
    ),
    enableSorting: true,
  },
  {
    accessorKey: "lab",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Lab" />
    ),
    enableSorting: true,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "asisten",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Asisten" />
    ),
    cell: ({ row }) => {
      const data = row.original;
      return (
        <ul className="list-disc pl-4">
          {Array.isArray(data.asisten) && data.asisten.length > 0 ? (
            data.asisten.map((asisten, index) => <li key={index}>{asisten}</li>)
          ) : (
            <li>-</li>
          )}
        </ul>
      );
    },
  },
  {
    accessorKey: "jenis_praktikan",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Jenis Praktikan" />
    ),
    enableSorting: true,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
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
    enableHiding: false,
  },
];
