"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { Button } from "./ui/button";

export default function BackButton() {
  const pathname = usePathname();
  const parentPath = pathname.split("/").slice(0, -1).join("/") || "/";

  return (
    <Link href={parentPath}>
      <Button type="button" variant="ghost" size="icon">
        <X className="h-4 w-4" />
      </Button>
    </Link>
  );
}
