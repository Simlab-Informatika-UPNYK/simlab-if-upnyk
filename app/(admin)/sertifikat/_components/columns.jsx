"use client";

import Link from "next/link";

// import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
// import Link from "next/link";
// import { ActionCell } from "./action-cell";

/* 
table

sertifikat
id_aslab
tanggal_pengajuan
status

*/

export const columns = [
  /*   {
    accessorKey: "jenis",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Jenis" />
    ),
    cell: ({ row }) => {
      const data = row.original;
      return (
        <Link href={`/honor-asisten/${data.jenis}`} className="hover:underline">
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
  }, */

  { header: "NIM", id: "NIM", accessorKey: "nim" },
  {
    header: "Nama",
    id: "Nama",
    accessorKey: "nama_asisten",
    cell: ({ row }) => {
      const data = row.original;
      return <span className="text-blue-600">{data.nama_asisten}</span>;
    },
  },
  {
    header: "Tanggal Pengajuan",
    id: "Tanggal Pengajuan",
    accessorKey: "tanggal_pengajuan",
  },
  { header: "Status", id: "Status", accessorKey: "status" },
];
