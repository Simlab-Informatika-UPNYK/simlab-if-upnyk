"use client";

import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

export function ServerPagination({
  totalCount,
  currentPage,
  pageSize,
  onPageSizeChange,
}) {
  const router = useRouter();
  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));
  const paginationSize = [5, 10, 25, 50, 100];

  return (
    <div className="flex mt-4 items-center justify-between px-2">
      <div className="flex-1 text-sm text-muted-foreground">
        Page {currentPage} of {totalPages}
      </div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            value={`${pageSize}`}
            onValueChange={(value) => {
              const url = new URL(window.location);
              url.searchParams.set("s", value);
              window.history.pushState({}, "", url);
              // onPageSizeChange(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {paginationSize.map((size) => (
                <SelectItem key={size} value={`${size}`}>
                  <Link href={`?p=${currentPage}&s=${size}`}>{size}</Link>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            href={`?p=1&s=${pageSize}`}
            disabled={currentPage === 1}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeft />
          </Button>
          <Button
            onClick={() => router.push(`?p=${currentPage - 1}&s=${pageSize}`)}
            variant="outline"
            className="h-8 w-8 p-0"
            disabled={currentPage === 1}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft />
          </Button>
          <Button
            onClick={() => router.push(`?p=${currentPage + 1}&s=${pageSize}`)}
            variant="outline"
            className="h-8 w-8 p-0"
            disabled={currentPage === totalPages}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRight />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            href={`?p=${totalPages}&s=${pageSize}`}
            disabled={currentPage === totalPages}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRight />
          </Button>
        </div>
      </div>
    </div>
  );
}
