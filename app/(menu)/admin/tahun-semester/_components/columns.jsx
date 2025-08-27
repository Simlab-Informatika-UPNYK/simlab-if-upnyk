"use client";
import Link from "next/link";
import { ActionCell } from "./action-cell";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

export const columns = [
  {
    accessorKey: "no",
    header: () => "No",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "semester",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0 hover:bg-black/0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tahun Ajaran & Semester
          <ArrowUpDown />
        </Button>
      );
    },
    sortingFn: (rowA, rowB) => {
      const tahunA = rowA.original.tahun_ajaran;
      const tahunB = rowB.original.tahun_ajaran;
      const semesterA = rowA.original.semester;
      const semesterB = rowB.original.semester;
      
      // Urutkan berdasarkan tahun ajaran dulu, lalu semester
      if (tahunA !== tahunB) {
        return tahunA.localeCompare(tahunB);
      }
      return semesterA.localeCompare(semesterB);
    },
    cell: ({ row }) => {
      const data = row.original;
      return (
        <Link href={`/admin/tahun-semester/${data.slug}`} className="text-blue-600">
          {data.tahun_ajaran} Semester {data.semester}
        </Link>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="text-right px-4">Aksi</div>,
    enableHiding: false,
    cell: ({ row }) => <ActionCell row={row} />,
  },
];
