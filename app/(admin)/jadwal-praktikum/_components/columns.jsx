"use client";

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Checkbox } from "@/components/ui/checkbox";
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
      return <Link href={`jadwal-praktikum/${data.slug}`}>{data.kelas}</Link>;
    },
  },
  {
    accessorKey: "mata_kuliah",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="mata_kuliah" />
    ),
  },
  {
    accessorKey: "dosen",
    // header: ({ column }) => (
    //   <DataTableColumnHeader column={column} title="Role" />
    // ),
  },
  {
    accessorKey: "jumlah_praktikan",
    // header: ({ column }) => (
    //   <DataTableColumnHeader column={column} title="Created At" />
    // ),
  },
  {
    accessorKey: "hari",
  },
  {
    accessorKey: "waktu",
  },
  {
    accessorKey: "lab",
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
          {Array.isArray(data.asisten) ? (
            data.asisten.map((asisten, index) => (
              <li key={index}>{asisten}</li>
            ))
          ) : (
            <li>{data.asisten}</li>
          )}
        </ul>
      );
    },
  },
  {
    accessorKey: "jenis_praktikan",
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
