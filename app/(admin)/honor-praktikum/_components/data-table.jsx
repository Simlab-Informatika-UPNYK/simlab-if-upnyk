"use client";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import { Input } from "@/components/ui/input";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import { PeriodeSelector } from "./periode-selector";
import { useRouter } from "next/navigation";

export function DataTable({
  columns,
  data,
  pagination,
  periodeOptions,
  onPeriodeChange,
  defaultValue,
  isLoading = false,
}) {
  const [sorting, setSorting] = React.useState([]);
  const [globalFilter, setGlobalFilter] = React.useState([]);
  const [rowSelection, setRowSelection] = React.useState({});
  const router = useRouter();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      globalFilter,
      rowSelection,
    },
  });

  // Use the passed in handler instead of pushing to a new route
  const handlePeriodeChange = (selectedValue) => {
    if (onPeriodeChange) {
      onPeriodeChange(selectedValue);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between py-4">
        <div className="flex gap-2">
          <Input
            value={table.getState().globalFilter ?? ""}
            onChange={(e) => table.setGlobalFilter(String(e.target.value))}
            placeholder="Search..."
            className="max-w-sm"
          />
          <PeriodeSelector
            options={periodeOptions}
            defaultValue={defaultValue}
            onPeriodeChange={handlePeriodeChange}
          />
        </div>
      </div>
      <div className="rounded-md border relative w-[0] min-w-full overflow-x-auto">
        {isLoading ? (
          <div className="flex items-center justify-center h-[300px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    onClick={() =>
                      router.push(`/honor-praktikum/${row.original.nim}?periode=${defaultValue}`)
                    }
                    key={row.id}
                    className="cursor-pointer"
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </div>
      <div className="mt-4">
        <DataTablePagination table={table} />
      </div>
    </>
  );
}
