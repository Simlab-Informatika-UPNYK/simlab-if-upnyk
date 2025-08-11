"use client";

import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import Link from "next/link";
import { DeleteButton } from "./delete-button";

export function ActionCell({ row }) {
  const data = row.original;

  return (
    <div className="flex justify-end items-center space-x-2">
      <Link href={`/admin/tahun-semester/${data.slug}/edit`}>
        <Button variant="ghost" size="icon">
          <Edit className="h-4 w-4" />
        </Button>
      </Link>
      <DeleteButton variant="ghost" slug={data.slug} />
    </div>
  );
}
