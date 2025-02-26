"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
import { DataTablePagination } from "./data-table-pagination";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { Input } from "../ui/input";
import { DataTableViewOptions } from "./data-table-view-options";

export function DataTable({
  columns,
  data,
  globalSearch,
  viewOptions,
  toolbar,
  filters = [],
  pagination,
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Get current page from URL or default to 0
  const pageIndex = Number(searchParams.get("p")) || 0;
  const pageSize = Number(searchParams.get("s")) || 10;
  
  const [sorting, setSorting] = React.useState([]);
  const [globalFilter, setGlobalFilter] = React.useState([]);
  const [rowSelection, setRowSelection] = React.useState({});
  const [paginationState, setPaginationState] = React.useState({
    pageIndex,
    pageSize,
  });

  // Update URL when pagination changes
  useEffect(() => {
    if (pagination) {
      const params = new URLSearchParams(searchParams);
      params.set("p", paginationState.pageIndex.toString());
      params.set("s", paginationState.pageSize.toString());
      router.push(`?${params.toString()}`, { scroll: false });
    }
  }, [paginationState, pagination, router]);

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
    autoResetPageIndex: false,
    state: {
      sorting,
      globalFilter,
      rowSelection,
      pagination: paginationState,
    },
    onPaginationChange: setPaginationState,
  });

  return (
    <>
      <div className="flex items-center justify-between py-4">
        <div className="flex gap-2">
          {globalSearch && (
            <Input
              value={table.getState().globalFilter ?? ""}
              onChange={(e) => table.setGlobalFilter(String(e.target.value))}
              placeholder="Search..."
              className="max-w-sm"
            />
          )}
          {filters.map((filter) => {
            const column = table.getColumn(filter.id);
            if (!column) return null;

            return (
              <DataTableFacetedFilter
                key={filter.id}
                column={column}
                title={filter.title}
                options={filter.options}
              />
            );
          })}
        </div>
        <div className="flex gap-2">
          {toolbar ?? ""}
          {viewOptions && <DataTableViewOptions table={table} />}
        </div>
      </div>
      <div className="rounded-md border">
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
                  key={row.id}
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
      </div>
      {pagination === true && (
        <div className="mt-4">
          <DataTablePagination table={table} />
        </div>
      )}
    </>
  );
}
