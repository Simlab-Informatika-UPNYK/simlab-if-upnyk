'use client';
import Link from 'next/link';
import { ActionCell } from './action-cell';
import { Button } from '@/components/ui/button';
import { ArrowUpDown } from 'lucide-react';

export const columns = [
  {
    accessorKey: 'no',
    header: () => 'No',
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: 'semester',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0 hover:bg-black/0"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Tahun Ajaran & Semester
          <ArrowUpDown />
        </Button>
      );
    },
    sortingFn: (rowA, rowB) => {
      const slugA = rowA.original.slug;
      const slugB = rowB.original.slug;
      return slugA.localeCompare(slugB);
    },
    cell: ({ row }) => {
      const data = row.original;
      return (
        <span className="text-foreground">
          {data.tahun_ajaran} Semester {data.semester}
        </span>
      );
    },
  },
  {
    id: 'actions',
    header: () => <div className="text-right px-4">Aksi</div>,
    enableHiding: false,
    cell: ({ row }) => <ActionCell row={row} />,
  },
];
