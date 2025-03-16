"use client";

import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import Link from "next/link";
import { DeleteButton } from "./delete-button";

export const ActionCell = ({ data }) => {
  return (
    <div className="flex items-center space-x-2">
      <Link href={`/honor-asisten/${data.jenis}/edit`}>
        <Button variant="ghost" size="icon">
          <Edit className="h-4 w-4" />
        </Button>
      </Link>

      <DeleteButton id={data.id} />
    </div>
  );
};
