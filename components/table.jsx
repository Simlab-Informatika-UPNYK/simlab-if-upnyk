'use client'

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import React from 'react'

const AppTable = ({ table = {} }) => {
    return (
        <Table>
            <TableCaption>{table.caption}</TableCaption>
            <TableHeader>
                <TableRow>
                    {table?.headers?.map((header, index) => (
                        <TableHead key={`header-${index}`}>{header.label}</TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {table?.data?.map((row, index) => (
                    <TableRow key={`row-${index}`}>
                        {row?.map((cell, index) => (
                            <TableCell key={`cell-${index}`}>{cell}</TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>

    )
}

export default AppTable