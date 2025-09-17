'use client';
import { ActionCell } from './action-cell';
import { Button } from '@/components/ui/button';
import { ArrowUpDown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const columns = [
  {
    accessorKey: 'no',
    header: () => 'No',
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: 'judul',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0 hover:bg-black/0"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Judul Pengumuman
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const judul = row.getValue('judul');
      return <span className="font-medium">{judul}</span>;
    },
  },
  {
    accessorKey: 'isi',
    header: 'Isi',
    cell: ({ row }) => {
      const isi = row.getValue('isi');
      return (
        <span className="text-muted-foreground line-clamp-2">
          {isi}
        </span>
      );
    },
  },
  {
    accessorKey: 'active',
    header: 'Status',
    cell: ({ row }) => {
      const active = row.getValue('active');
      return (
        <Badge variant={active ? 'default' : 'secondary'}>
          {active ? 'Aktif' : 'Nonaktif'}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'created_at',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0 hover:bg-black/0"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Dibuat Pada
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue('created_at'));
      return date.toLocaleDateString('id-ID');
    },
  },
  {
    id: 'actions',
    header: () => <div className="text-right px-4">Aksi</div>,
    enableHiding: false,
    cell: ({ row }) => <ActionCell row={row} />,
  },
];
