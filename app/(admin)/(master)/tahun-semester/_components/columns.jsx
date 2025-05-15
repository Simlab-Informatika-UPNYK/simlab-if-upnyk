"use client";

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { ActionCell } from "./action-cell";
import { Button } from "@/components/ui/button";


export const columns = [
  {
    accessorKey: "semester",
    header: () => "Semester",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <Link href={`/tahun-semester/${data.slug}`} className="text-blue-600">
          Semester {data.semester}
        </Link>
      );
    },
  },
  {
    accessorKey: "tahun_ajaran",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tahun" />
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => <ActionCell row={row} />,
  },
];
