import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <Skeleton className="h-8 w-72" />
        <div className="flex gap-2">
          <Skeleton className="h-10 w-10" /> {/* Edit Button */}
          <Skeleton className="h-10 w-10" /> {/* Back Button */}
        </div>
      </div>

      {/* Main Content */}
      <div className="space-y-6">
        {/* Two Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column - Informasi Kelas */}
          <div>
            <Skeleton className="h-6 w-40 mb-4" /> {/* Section Title */}
            <div className="space-y-3">
              <div>
                <Skeleton className="h-4 w-16 mb-2" /> {/* Label */}
                <Skeleton className="h-6 w-full max-w-xs" /> {/* Value */}
              </div>
              <div>
                <Skeleton className="h-4 w-24 mb-2" /> {/* Label */}
                <Skeleton className="h-6 w-full max-w-md" /> {/* Value */}
              </div>
              <div>
                <Skeleton className="h-4 w-28 mb-2" /> {/* Label */}
                <Skeleton className="h-6 w-full max-w-lg" /> {/* Value */}
              </div>
              <div>
                <Skeleton className="h-4 w-32 mb-2" /> {/* Label */}
                <Skeleton className="h-6 w-full max-w-sm" /> {/* Value */}
              </div>
            </div>
          </div>

          {/* Right Column - Jadwal & Lokasi */}
          <div>
            <Skeleton className="h-6 w-44 mb-4" /> {/* Section Title */}
            <div className="space-y-3">
              <div>
                <Skeleton className="h-4 w-12 mb-2" /> {/* Label */}
                <Skeleton className="h-6 w-full max-w-xs" /> {/* Value */}
              </div>
              <div>
                <Skeleton className="h-4 w-24 mb-2" /> {/* Label */}
                <Skeleton className="h-6 w-full max-w-sm" /> {/* Value */}
              </div>
              <div>
                <Skeleton className="h-4 w-28 mb-2" /> {/* Label */}
                <Skeleton className="h-6 w-full max-w-sm" /> {/* Value */}
              </div>
              <div>
                <Skeleton className="h-4 w-28 mb-2" /> {/* Label */}
                <Skeleton className="h-6 w-full max-w-md" /> {/* Value */}
              </div>
              <div>
                <Skeleton className="h-4 w-32 mb-2" /> {/* Label */}
                <Skeleton className="h-6 w-full max-w-lg" /> {/* Value */}
              </div>
              <div>
                <Skeleton className="h-4 w-16 mb-2" /> {/* Label */}
                <Skeleton className="h-6 w-full max-w-md" /> {/* Value */}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Created Date */}
        <div className="pt-4 border-t border-gray-200">
          <div>
            <Skeleton className="h-4 w-24 mb-2" /> {/* Label */}
            <Skeleton className="h-6 w-full max-w-md" /> {/* Value */}
          </div>
        </div>
      </div>
    </div>
  );
}