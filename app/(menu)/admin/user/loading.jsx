import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function Loading() {
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-10 w-32" />
      </div>
      
      <div className="rounded-md border">
        <div className="p-4 grid grid-cols-5 gap-4 border-b">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-6" />
          ))}
        </div>
        
        {Array.from({ length: 5 }).map((_, rowIndex) => (
          <div key={rowIndex} className="p-4 grid grid-cols-5 gap-4 border-b">
            {Array.from({ length: 5 }).map((_, colIndex) => (
              <Skeleton key={colIndex} className="h-6" />
            ))}
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mt-4">
        <Skeleton className="h-8 w-32" />
        <div className="flex gap-2">
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-8" />
          <Skeleton className="h-8 w-8" />
        </div>
      </div>
    </div>
  );
}
