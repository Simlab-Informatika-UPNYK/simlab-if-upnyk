"use client";

import { Button } from "@/components/ui/button";
import { Edit, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { DeleteButton } from "./delete-button";
import { togglePengumumanStatus } from "../actions";

export function ActionCell({ row }) {
  const data = row.original;

  const handleToggleStatus = async () => {
    try {
      await togglePengumumanStatus(data.id, !data.active);
      // Refresh the page after status change
      window.location.reload();
    } catch (error) {
      console.error("Error toggling pengumuman status:", error);
      alert("Gagal mengubah status pengumuman");
    }
  };

  return (
    <div className="flex justify-end items-center gap-2">
      {/* Edit Button */}
      <Link href={`/admin/pengumuman/${data.id}/edit`}>
        <Button variant="ghost" size="icon">
          <Edit className="h-4 w-4" />
        </Button>
      </Link>

      {/* Toggle Status Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={handleToggleStatus}
        title={data.active ? "Nonaktifkan" : "Aktifkan"}
      >
        {data.active ? (
          <EyeOff className="h-4 w-4" />
        ) : (
          <Eye className="h-4 w-4" />
        )}
      </Button>

      {/* Delete Button */}
      <DeleteButton variant="ghost" id={data.id} />
    </div>
  );
}
