import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <Skeleton className="h-10 w-48 mb-2" />
        <Skeleton className="h-4 w-96" />
      </div>

      {/* Filter Section */}
      <div className="mb-6">
        <Skeleton className="h-10 w-64" /> {/* Tahun Semester Filter */}
      </div>

      {/* DataTable Skeleton */}
      <div className="max-w-screen-xl mx-auto">
        <div className="rounded-md border">
          {/* Table Header with Search and Toolbar */}
          <div className="border-b p-4">
            <div className="flex items-center justify-between">
              <Skeleton className="h-9 w-64" /> {/* Search */}
              <div className="flex gap-2">
                <Skeleton className="h-9 w-32" /> {/* Export Excel Button */}
                <Skeleton className="h-9 w-10" /> {/* Column visibility */}
                <Skeleton className="h-9 w-10" /> {/* View options */}
              </div>
            </div>
          </div>

          {/* Table Rows */}
          <div className="divide-y">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex items-center p-4">
                <Skeleton className="h-4 w-12 mr-4" /> {/* No */}
                <Skeleton className="h-4 w-24 mr-4" /> {/* NIM */}
                <Skeleton className="h-4 w-48 mr-4" /> {/* Nama Asisten */}
                <Skeleton className="h-4 w-64 mr-4" /> {/* Mata Kuliah */}
                <Skeleton className="h-4 w-24 mr-4" /> {/* Jumlah Kelas */}
                <Skeleton className="h-4 w-32 mr-4" /> {/* Jumlah Honor */}
                <div className="flex gap-1 ml-auto">
                  <Skeleton className="h-8 w-8" /> {/* View Detail */}
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
                <Skeleton className="h-8 w-8" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
