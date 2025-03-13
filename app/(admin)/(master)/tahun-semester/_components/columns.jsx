"use client";

import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { ActionCell } from "./action-cell";
import { Button } from "@/components/ui/button";


export const columns = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  // {
  //   accessorKey: "id",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="ID" />
  //   ),
  // },

  {
    accessorKey: "semester",
    header: () => "Semester",
    cell: ({ row }) => {
      const data = row.original;
      return (
        <Link href={`/tahun-semester/${data.slug}`} className="hover:underline">
          Semester {data.semester}
        </Link>
      );
    },
  },
  // {
  //   accessorKey: "update_date",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Update Date" />
  //   ),
  // },
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
