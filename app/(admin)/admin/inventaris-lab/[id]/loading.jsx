"use client"

import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <Skeleton className="h-9 w-24 mb-2" />
          <Skeleton className="h-8 w-64" />
        </div>
        <Skeleton className="h-9 w-36" />
      </div>

      <div className="rounded-md border w-full overflow-x-auto">
        <div className="w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&_tr]:border-b">
              <tr className="border-b">
                {[...Array(13)].map((_, i) => (
                  <th key={i} className="h-10 px-2">
                    <Skeleton className="h-4 w-16" />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">
              {[...Array(5)].map((_, i) => (
                <tr key={i} className="border-b">
                  {[...Array(13)].map((_, j) => (
                    <td key={j} className="px-2 py-2">
                      <Skeleton className="h-4 w-full" />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
