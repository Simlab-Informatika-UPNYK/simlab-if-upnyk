"use client";

import { MoreHorizontal, Edit, Trash2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { useConfirmDialog } from "@/hooks/use-form-submission";
import { useFormSubmission } from "@/hooks/use-form-submission";
import { deleteAslab } from "@/lib/actions/aslab-actions";
import { formatDate } from "@/lib/utils/form-helpers";
import Link from "next/link";

function ActionCell({ row }) {
  const aslab = row.original;
  const { isOpen, dialogData, openDialog, closeDialog, handleConfirm } = useConfirmDialog();
  const { handleSubmit } = useFormSubmission();

  const handleDelete = () => {
    openDialog(
      "Hapus Asisten Laboratorium",
      `Apakah Anda yakin ingin menghapus ${aslab.nama}? Tindakan ini tidak dapat dibatalkan.`,
      () => {
        handleSubmit(
          () => deleteAslab(aslab.id_aslab),
          "Asisten laboratorium berhasil dihapus"
        );
      }
    );
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Aksi</DropdownMenuLabel>
          <DropdownMenuSeparator />
          
          <DropdownMenuItem asChild>
            <Link href={`/admin/aslab/${aslab.id_aslab}`}>
              <Eye className="h-4 w-4 mr-2" />
              Lihat Detail
            </Link>
          </DropdownMenuItem>
          
          <DropdownMenuItem asChild>
            <Link href={`/admin/aslab/${aslab.id_aslab}/edit`}>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Link>
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />
          
          <DropdownMenuItem
            className="text-red-600 focus:text-red-600"
            onClick={handleDelete}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Hapus
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ConfirmDialog
        isOpen={isOpen}
        onClose={closeDialog}
        onConfirm={handleConfirm}
        title={dialogData?.title}
        description={dialogData?.description}
        confirmText="Hapus"
        variant="destructive"
      />
    </>
  );
}

function StatusBadge({ status }) {
  const variant = status === "Aktif" ? "default" : "secondary";
  const className = status === "Aktif" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800";
  
  return (
    <Badge variant={variant} className={className}>
      {status}
    </Badge>
  );
}

export const aslabColumns = [
  {
    accessorKey: "nama",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nama" />
    ),
    cell: ({ row }) => {
      const nama = row.getValue("nama");
      return (
        <div className="font-medium">
          {nama}
        </div>
      );
    },
  },
  {
    accessorKey: "nim",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="NIM" />
    ),
    cell: ({ row }) => {
      return (
        <div className="font-mono">
          {row.getValue("nim")}
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Email" />
    ),
    cell: ({ row }) => {
      return (
        <div className="text-sm text-gray-600">
          {row.getValue("email")}
        </div>
      );
    },
  },
  {
    accessorKey: "program_studi",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Program Studi" />
    ),
    cell: ({ row }) => {
      const programStudi = row.getValue("program_studi");
      return (
        <div className="text-sm">
          {programStudi}
        </div>
      );
    },
  },
  {
    accessorKey: "angkatan",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Angkatan" />
    ),
    cell: ({ row }) => {
      return (
        <div className="text-center">
          {row.getValue("angkatan")}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      return <StatusBadge status={row.getValue("status")} />;
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Dibuat" />
    ),
    cell: ({ row }) => {
      const date = row.getValue("created_at");
      return (
        <div className="text-sm text-gray-500">
          {date ? formatDate(date) : "-"}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: "Aksi",
    cell: ActionCell,
    enableSorting: false,
    enableHiding: false,
  },
];
