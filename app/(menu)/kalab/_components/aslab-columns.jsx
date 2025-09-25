"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Pencil } from "lucide-react";
import { DeleteButton } from "./delete-button";

export const aslabColumn = [
  {
    accessorKey: "no",
    header: "No",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "Nama Lengkap",
    header: "Nama Lengkap",
  },
  {
    accessorKey: "NIDN/NIP",
    header: "NIDN/NIP",
  },
  {
    accessorKey: "Email",
    header: "Email",
  },
  {
    accessorKey: "no_hp",
    header: "No. Telepon",
  },
];
