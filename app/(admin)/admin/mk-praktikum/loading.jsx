import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container mx-auto p-4 space-y-4">
      <div className="flex justify-between items-center">
        <Skeleton className="h-10 w-[150px]" />
        <Skeleton className="h-10 w-[100px]" />
      </div>
      
      <div className="rounded-md border">
        <div className="flex items-center justify-between p-4 border-b">
          <Skeleton className="h-8 w-[200px]" />
          <Skeleton className="h-8 w-[100px]" />
        </div>
        
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center p-4 border-b">
            <Skeleton className="h-4 w-[100px] mr-4" />
            <Skeleton className="h-4 w-[200px] mr-4" />
            <Skeleton className="h-4 w-[80px] mr-4" />
            <Skeleton className="h-4 w-[80px] mr-4" />
            <Skeleton className="h-8 w-[60px] ml-auto" />
          </div>
        ))}
      </div>
    </div>
  )
}
