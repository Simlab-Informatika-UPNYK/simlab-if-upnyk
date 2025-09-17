import React from "react";

export default function Loading() {
  return (
    <div className="space-y-4 p-4">
      <div className="flex justify-between items-center">
        <div className="h-10 w-64 bg-gray-200 rounded animate-pulse" />
        <div className="h-10 w-32 bg-gray-200 rounded animate-pulse" />
      </div>
      <div className="border rounded-lg p-4">
        <div className="h-12 bg-gray-100 rounded animate-pulse mb-4" />
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 bg-gray-100 rounded animate-pulse" />
          ))}
        </div>
        <div className="flex justify-between items-center mt-4">
          <div className="h-8 w-24 bg-gray-200 rounded animate-pulse" />
          <div className="flex space-x-2">
            <div className="h-8 w-8 bg-gray-200 rounded animate-pulse" />
            <div className="h-8 w-8 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
