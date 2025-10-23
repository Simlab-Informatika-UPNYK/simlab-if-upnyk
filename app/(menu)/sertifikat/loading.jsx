import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function Loading() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-4">
      <div className="space-y-6">
        {/* Header */}
        <div className="mb-6">
          <Skeleton className="h-10 w-80 mb-2" />
          <Skeleton className="h-4 w-96" />
        </div>

        {/* Admin Section - Management Tools */}
        <div className="bg-orange-200 border-l-2 border-black/50 p-4 rounded-md">
          <div className="flex justify-between mb-3 items-center">
            <Skeleton className="h-6 w-48" /> {/* Kelola Kepala Jurusan */}
            <Skeleton className="h-9 w-36" /> {/* Button */}
          </div>
          <div className="mb-2">
            <Skeleton className="h-4 w-32" /> {/* Kepala Jurusan label */}
            <Skeleton className="h-5 w-64 mt-1" /> {/* Kepala Jurusan name */}
          </div>
        </div>

        {/* Kajur Info Cards (for aslab view) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <Skeleton className="h-4 w-40" /> {/* Nama Kepala Jurusan */}
            </CardHeader>
            <CardContent>
              <Skeleton className="h-6 w-64" /> {/* Kajur name */}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <Skeleton className="h-4 w-36" /> {/* NIP Kepala Jurusan */}
            </CardHeader>
            <CardContent>
              <Skeleton className="h-6 w-48" /> {/* Kajur NIP */}
            </CardContent>
          </Card>
        </div>

        {/* Certificate List */}
        <div className="space-y-3">
          <Skeleton className="h-6 w-48 mb-4" /> {/* Certificate List Title */}

          {/* Certificate Cards */}
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-5 w-48" /> {/* Certificate Title */}
                    <Skeleton className="h-3 w-full max-w-md" /> {/* Description */}
                    <Skeleton className="h-3 w-3/4" /> {/* Additional info */}
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Skeleton className="h-8 w-20" /> {/* Download Button */}
                    <Skeleton className="h-8 w-16" /> {/* View Button */}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Footer Link */}
        <div className="mt-6">
          <Skeleton className="h-4 w-32" /> {/* Footer link */}
        </div>
      </div>
    </div>
  );
}
