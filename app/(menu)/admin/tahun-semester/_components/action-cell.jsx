"use client";

import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import Link from "next/link";
import { DeleteButton } from "./delete-button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export function ActionCell({ row }) {
  const data = row.original;
  const isUsed = data.isUsed;

  return (
    <div className="flex justify-end items-center">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href={isUsed ? "#" : `/admin/tahun-semester/${data.slug}/edit`}
              onClick={(e) => isUsed && e.preventDefault()}
            >
              <Button
                variant="ghost"
                size="icon"
                disabled={isUsed}
                className={isUsed ? "opacity-50 cursor-not-allowed" : ""}
              >
                <Edit className="h-4 w-4" />
              </Button>
            </Link>
          </TooltipTrigger>
          {isUsed && (
            <TooltipContent>
              <p>Tidak dapat diedit karena sedang digunakan</p>
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <span>
              <DeleteButton variant="ghost" slug={data.slug} disabled={isUsed} />
            </span>
          </TooltipTrigger>
          {isUsed && (
            <TooltipContent>
              <p>Tidak dapat dihapus karena sedang digunakan</p>
            </TooltipContent>
          )}
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
