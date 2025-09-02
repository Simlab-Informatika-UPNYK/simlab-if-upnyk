"use client";

import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import Link from "next/link";
import { DeleteButton } from "./delete-button";
import { deleteJadwal } from "../actions";

export const ActionCell = ({ data, onRefresh }) => {
  return (
    <div className="flex items-center space-x-2">
      <Link href={`/jadwal-praktikum/${data.id}/edit`}>
        <Button variant="ghost" size="icon">
          <Edit className="h-4 w-4" />
        </Button>
      </Link>

      <DeleteButton
        id={data.id}
        aslab={data.asisten_nim}
        onDelete={deleteJadwal}
        onSuccess={onRefresh}
        description="Penghapusan bersifat permanen. Data jadwal praktikum ini akan terhapus."
      />
    </div>
  );
};
