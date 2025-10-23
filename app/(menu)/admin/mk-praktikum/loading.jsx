import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-2">
      {/* Header */}
      <div className="mb-6">
        <Skeleton className="h-10 w-80 mb-2" />
        <Skeleton className="h-4 w-96" />
      </div>

      {/* Mobile Filter */}
      <div className="md:hidden mb-4">
        <Skeleton className="h-10 w-48" />
      </div>

      {/* Toolbar */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex gap-2">
            <Skeleton className="h-10 w-48" />
            <Skeleton className="h-10 w-32" />
          </div>
          <Skeleton className="h-10 w-32" />
        </div>
      </div>

      {/* DataTable Skeleton */}
      <div className="rounded-md border">
        {/* Table Header */}
        <div className="border-b p-4">
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <Skeleton className="h-9 w-32" />
              <Skeleton className="h-9 w-32" />
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-9 w-10" />
              <Skeleton className="h-9 w-10" />
            </div>
          </div>
        </div>

        {/* Table Rows */}
        <div className="divide-y">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="flex items-center p-4">
              <Skeleton className="h-4 w-12 mr-4" /> {/* No */}
              <Skeleton className="h-4 w-48 mr-4" /> {/* Kode MK */}
              <Skeleton className="h-4 w-80 mr-4" /> {/* Nama MK */}
              <Skeleton className="h-4 w-32 mr-4" /> {/* Semester */}
              <Skeleton className="h-4 w-20 mr-4" /> {/* SKS */}
              <Skeleton className="h-4 w-28 mr-4" /> {/* Tahun Semester */}
              <div className="flex gap-1 ml-auto">
                <Skeleton className="h-8 w-8" /> {/* Edit */}
                <Skeleton className="h-8 w-8" /> {/* Delete */}
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="border-t p-4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-48" />
            <div className="flex gap-1">
              <Skeleton className="h-8 w-8" />
              <Skeleton className="h-8 w-8" />
              <Skeleton className="h-8 w-8" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
