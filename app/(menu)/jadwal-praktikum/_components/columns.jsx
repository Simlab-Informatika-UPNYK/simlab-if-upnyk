"use client";

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import Link from "next/link";
import { ActionCell } from "./action-cell";

export const columns = [
  {
    accessorKey: "no",
    header: () => "No",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "kode_mk",
  },
  {
    accessorKey: "mata_kuliah",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Mata Kuliah" />,
    enableSorting: true,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "kelas",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Kelas" />,
    // cell: ({ row }) => {
    //   const data = row.original;
    //   return (
    //     <Link href={`/jadwal-praktikum/${data.id}`} className="text-blue-600 hover:underline">
    //       {data.kelas}
    //     </Link>
    //   );
    // },
    enableSorting: true,
    enableHiding: false,
  },
  // {
  //   accessorKey: "dosen",
  //   header: ({ column }) => <DataTableColumnHeader column={column} title="Dosen" />,
  //   enableSorting: true,
  // },
  {
    accessorKey: "jadwal",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Jadwal" />,
    cell: ({ row }) => {
      const data = row.original;
      const hari = data.hari || "-";
      const waktuMulai = data.waktu_mulai || "-";
      const waktuSelesai = data.waktu_selesai || "-";
      return `${hari} ${waktuMulai} - ${waktuSelesai}`;
    },
    enableSorting: true,
    filterFn: (row, id, value) => {
      const data = row.original;
      const jadwal = `${data.hari || ""} ${data.waktu_mulai || ""}-${data.waktu_selesai || ""}`;
      return jadwal.toLowerCase().includes(value.toLowerCase());
    },
  },
  {
    accessorKey: "asisten",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Asisten" />,
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
    id: "aksi",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Aksi" />,
    cell: ({ row, table }) => {
      const data = row.original;
      // Get the refresh function from the table meta
      const onRefresh = table.options.meta?.onRefresh;
      return <ActionCell data={data} onRefresh={onRefresh} />;
    },
    enableHiding: false,
  },
];
