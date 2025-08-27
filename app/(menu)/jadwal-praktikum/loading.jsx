import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="p-6 space-y-4">
      {/* Toolbar Skeleton */}
      <div className="flex justify-between items-center">
        <Skeleton className="h-10 w-[150px]" />
        <Skeleton className="h-10 w-[100px]" />
      </div>

      {/* Table Header Skeletons */}
      <div className="flex space-x-4">
        {[...Array(6)].map((_, i) => (
          <Skeleton key={i} className="h-10 flex-1" />
        ))}
      </div>

      {/* Table Row Skeletons */}
      <div className="space-y-2">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex space-x-4">
            {[...Array(6)].map((_, j) => (
              <Skeleton key={j} className="h-12 flex-1" />
            ))}
          </div>
        ))}
      </div>

      {/* Pagination Skeleton */}
      <div className="flex justify-between items-center pt-4">
        <Skeleton className="h-8 w-[100px]" />
        <div className="flex space-x-2">
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-8" />
        </div>
      </div>
    </div>
  );
}
