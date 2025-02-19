"use client"

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import DataTablePagination from "./data-table-pagination"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import React from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Check, CheckCircle2, PlusCircle, XCircle } from "lucide-react"
import Link from "next/link"
import { DataTableFacetedFilter } from "./data-table-faceted-filter"
import { DataTableViewOptions } from "./data-table-view-options.jsx"
import { useRouter } from "next/navigation"

export function DataTable({
  columns,
  data,
}) {
  const [sorting, setSorting] = React.useState([])
  const [globalFilter, setGlobalFilter] = React.useState([])
  const [rowSelection, setRowSelection] = React.useState({})

  const statuses = [
    {
      value: "Aktif",
      label: "Aktif",
      icon: CheckCircle2,
    },
    {
      value: "Tidak Aktif",
      label: "Tidak Aktif",
      icon: XCircle,
    },
  ]

  const prodi = [{
    value: "Informatika",
    label: "Informatika",
  }, {
    value: "Sistem Informasi",
    label: "Sistem Informasi"
  }]


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
  })

  return (
    <>
      <div className="flex items-center justify-between py-4">
        <div className="flex gap-2">
          <Input
            value={(table.getState().globalFilter) ?? ""}
            onChange={e => table.setGlobalFilter(String(e.target.value))}
            placeholder="Search..."
            className="max-w-sm"
          />
          {table.getColumn("status") && (
            <DataTableFacetedFilter
              column={table.getColumn("status")}
              title="Status"
              options={statuses}
            />
          )}
          {table.getColumn("program studi") && (
            <DataTableFacetedFilter
              column={table.getColumn("program studi")}
              title="Program Studi"
              options={prodi}
            />
          )}
        </div>
        <div className="flex gap-2">
          <Link href="/aslab/new">
            <Button><PlusCircle />Add Data</Button>
          </Link>
          <DataTableViewOptions table={table} />
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
                  )
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
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="h-4"></div>
      <DataTablePagination table={table} />
    </>
  )
}
