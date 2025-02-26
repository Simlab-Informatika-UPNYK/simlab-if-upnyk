"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client.js";
import { useSearchParams } from "next/navigation";
import { columns } from "./_components/columns.jsx";
import { DataTable } from "./_components/data-table";
import { ServerPagination } from "./_components/server-pagination";

// Remove searchParams from function params and use useSearchParams() hook
export default function Page() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleSearchParamsChange = () => {
      const newPage = parseInt(searchParams.get("p")) || 1;
      const newPageSize = parseInt(searchParams.get("s")) || 10;
      setPage(newPage);
      setPageSize(newPageSize);
    };

    handleSearchParamsChange();
  }, [searchParams]);

  const initialPage = parseInt(searchParams.get("p")) || 1;
  const initialPageSize = parseInt(searchParams.get("s")) || 10;

  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);

  useEffect(() => {
    const fetchData = async () => {
      const start = (page - 1) * pageSize;
      const end = start + pageSize - 1;

      const supabase = await createClient();
      let query = supabase.from("aslab").select("*", { count: "exact" });
      if (searchQuery) {
        query = query.ilike("nama", `%${searchQuery}%`);
      }
      query = query.range(start, end);
      const { data, count } = await query;

      setData(data);
      setCount(count);
    };

    const debounceFetch = setTimeout(fetchData, 300); // Debounce the fetch by 300ms

    return () => clearTimeout(debounceFetch);
  }, [searchQuery, page, pageSize]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="container mx-auto p-4">
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search..."
        className="mb-4 p-2 border border-gray-300 rounded"
      />
      <DataTable columns={columns} data={data} />
      <ServerPagination
        totalCount={count}
        currentPage={page}
        pageSize={pageSize}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
      />
    </div>
  );
}
