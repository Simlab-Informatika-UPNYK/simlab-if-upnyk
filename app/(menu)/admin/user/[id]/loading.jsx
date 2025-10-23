import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <Skeleton className="h-8 w-48" />
        <div className="flex gap-2">
          <Skeleton className="h-10 w-10" /> {/* Edit Button */}
          <Skeleton className="h-10 w-24" /> {/* More Button */}
          <Skeleton className="h-10 w-10" /> {/* Back Button */}
        </div>
      </div>

      {/* User Details Card */}
      <div className="bg-white p-6 rounded-lg border">
        <div className="grid grid-cols-1 gap-4">
          {/* Field Row 1 */}
          <div>
            <Skeleton className="h-4 w-32 mb-2" /> {/* Label */}
            <Skeleton className="h-6 w-full max-w-md" /> {/* Value */}
          </div>

          {/* Field Row 2 */}
          <div>
            <Skeleton className="h-4 w-24 mb-2" /> {/* Label */}
            <Skeleton className="h-6 w-full max-w-lg" /> {/* Value */}
          </div>

          {/* Field Row 3 */}
          <div>
            <Skeleton className="h-4 w-20 mb-2" /> {/* Label */}
            <Skeleton className="h-6 w-full max-w-xs" /> {/* Value */}
          </div>

          {/* Field Row 4 */}
          <div>
            <Skeleton className="h-4 w-36 mb-2" /> {/* Label */}
            <Skeleton className="h-6 w-full max-w-2xl" /> {/* Value */}
          </div>
        </div>
      </div>

      {/* Additional Info Section */}
      <div className="mt-6 p-6 bg-gray-50 rounded-lg border">
        <Skeleton className="h-6 w-48 mb-4" /> {/* Section Title */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Skeleton className="h-4 w-24 mb-2" />
            <Skeleton className="h-6 w-full max-w-md" />
          </div>
          <div>
            <Skeleton className="h-4 w-32 mb-2" />
            <Skeleton className="h-6 w-full max-w-md" />
          </div>
        </div>
      </div>
    </div>
  );
}