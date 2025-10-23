import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <Skeleton className="h-8 w-56" />
        <div className="flex gap-2">
          <Skeleton className="h-10 w-10" /> {/* Edit Button */}
          <Skeleton className="h-10 w-24" /> {/* More Button */}
          <Skeleton className="h-10 w-10" /> {/* Back Button */}
        </div>
      </div>

      {/* Main Content Card */}
      <div className="bg-white p-6 rounded-lg border">
        {/* Basic Information Section */}
        <div className="mb-6">
          <Skeleton className="h-6 w-48 mb-4" /> {/* Section Title */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Skeleton className="h-4 w-20 mb-2" /> {/* Label */}
                <Skeleton className="h-6 w-full max-w-md" /> {/* Value */}
              </div>
              <div>
                <Skeleton className="h-4 w-32 mb-2" /> {/* Label */}
                <Skeleton className="h-6 w-full max-w-lg" /> {/* Value */}
              </div>
              <div>
                <Skeleton className="h-4 w-28 mb-2" /> {/* Label */}
                <Skeleton className="h-6 w-full max-w-sm" /> {/* Value */}
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <Skeleton className="h-4 w-24 mb-2" /> {/* Label */}
                <Skeleton className="h-6 w-full max-w-lg" /> {/* Value */}
              </div>
              <div>
                <Skeleton className="h-4 w-20 mb-2" /> {/* Label */}
                <Skeleton className="h-6 w-full max-w-sm" /> {/* Value */}
              </div>
              <div>
                <Skeleton className="h-4 w-36 mb-2" /> {/* Label */}
                <Skeleton className="h-6 w-full max-w-md" /> {/* Value */}
              </div>
            </div>
          </div>
        </div>

        {/* Additional Details Section */}
        <div className="border-t pt-6">
          <Skeleton className="h-6 w-40 mb-4" /> {/* Section Title */}
          <div className="space-y-4">
            <div>
              <Skeleton className="h-4 w-24 mb-2" /> {/* Label */}
              <Skeleton className="h-6 w-full max-w-2xl" /> {/* Value */}
            </div>
            <div>
              <Skeleton className="h-4 w-32 mb-2" /> {/* Label */}
              <Skeleton className="h-6 w-full max-w-xl" /> {/* Value */}
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="bg-gray-50 p-4 rounded-lg border">
          <Skeleton className="h-4 w-20 mb-2" />
          <Skeleton className="h-8 w-16" />
        </div>
        <div className="bg-gray-50 p-4 rounded-lg border">
          <Skeleton className="h-4 w-24 mb-2" />
          <Skeleton className="h-8 w-16" />
        </div>
        <div className="bg-gray-50 p-4 rounded-lg border">
          <Skeleton className="h-4 w-28 mb-2" />
          <Skeleton className="h-8 w-16" />
        </div>
      </div>
    </div>
  );
}