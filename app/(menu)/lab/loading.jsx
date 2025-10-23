import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-2">
      {/* Header */}
      <div className="mb-6">
        <Skeleton className="h-10 w-48 mb-2" />
        <Skeleton className="h-4 w-80" />
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-40" /> {/* CardTitle */}
            <Skeleton className="h-4 w-32" /> {/* CardDescription */}
          </CardHeader>
          <CardContent>
            <Skeleton className="h-10 w-16" /> {/* Number */}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-36" /> {/* CardTitle */}
            <Skeleton className="h-4 w-48" /> {/* CardDescription */}
          </CardHeader>
          <CardContent>
            <Skeleton className="h-10 w-16" /> {/* Number */}
          </CardContent>
        </Card>
      </div>

      {/* DataTable Skeleton */}
      <div className="rounded-md border">
        {/* Table Header with Search and Toolbar */}
        <div className="border-b p-4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-9 w-64" /> {/* Search */}
            <div className="flex gap-2">
              <Skeleton className="h-9 w-32" /> {/* Add Data Button */}
              <Skeleton className="h-9 w-10" /> {/* Column visibility */}
              <Skeleton className="h-9 w-10" /> {/* View options */}
            </div>
          </div>
        </div>

        {/* Table Rows */}
        <div className="divide-y">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center p-4">
              <Skeleton className="h-4 w-12 mr-4" /> {/* No */}
              <Skeleton className="h-4 w-32 mr-4" /> {/* Kode Lab */}
              <Skeleton className="h-4 w-48 mr-4" /> {/* Nama Lab */}
              <Skeleton className="h-4 w-24 mr-4" /> {/* Kapasitas */}
              <Skeleton className="h-4 w-48 mr-4" /> {/* Deskripsi */}
              <div className="flex gap-1 ml-auto">
                <Skeleton className="h-8 w-8" /> {/* View */}
                <Skeleton className="h-8 w-8" /> {/* Edit */}
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
  );
}
