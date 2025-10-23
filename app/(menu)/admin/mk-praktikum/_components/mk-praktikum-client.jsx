"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { DataTable } from "@/components/data-table/data-table";
import { columns } from "./columns";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getAllMk } from "../actions.jsx";
import { getTahunSemester } from "../../tahun-semester/actions";
import Link from "next/link";
import TahunSemesterFilter from "./tahun-semester-filter";
import { Skeleton } from "@/components/ui/skeleton";

const filters = [];

export default function MKPraktikumClient() {
  const [data, setData] = useState([]);
  const [tahunSemester, setTahunSemester] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const searchParams = useSearchParams();
  const router = useRouter();

  const currentYearId = searchParams.get("year_id");

  const handleRefresh = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        // Fetch tahun semester options
        const tahunSemesterData = await getTahunSemester();
        setTahunSemester(tahunSemesterData);

        // Get the year_id from URL or use first item as default
        const yearId = currentYearId ? parseInt(currentYearId) : tahunSemesterData[0]?.id || 1;

        // Fetch MK data with year filter
        const mkData = await getAllMk(yearId);
        setData(mkData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentYearId, refreshTrigger]);

  const handleTahunSemesterChange = (value) => {
    const params = new URLSearchParams(searchParams);

    if (value) {
      params.set("year_id", value);
    } else {
      params.delete("year_id");
    }

    router.push(`/admin/mk-praktikum/?${params.toString()}`);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-2">
      <h1 className="text-3xl font-bold">Mata Kuliah Praktikum</h1>
      <p className="text-gray-500 mb-4">
        Daftar mata kuliah praktikum laboratorium informatika
      </p>

      <div className="md:hidden">
        {tahunSemester.length > 0 && (
          <TahunSemesterFilter
            tahunSemester={tahunSemester}
            onTahunSemesterChange={handleTahunSemesterChange}
            defaultValue={currentYearId || tahunSemester[0]?.id?.toString()}
          />
        )}
      </div>

      {loading ? (
        <div className="space-y-4">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>
      ) : (
        <DataTable
          toolbar={(<div className="flex space-x-2">
            <div className="hidden md:flex">
              {tahunSemester.length > 0 && (
                <TahunSemesterFilter
                  tahunSemester={tahunSemester}
                  onTahunSemesterChange={handleTahunSemesterChange}
                  defaultValue={currentYearId || tahunSemester[0]?.id?.toString()}
                />
              )}
            </div>
            <div className="flex gap-2">
              <Link href="/admin/mk-praktikum/new">
                <Button>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Data
                </Button>
              </Link>
            </div>
          </div>)}
          viewOptions={true}
          globalSearch={true}
          filters={filters}
          pagination={true}
          columns={columns}
          data={data}
          meta={{ onRefresh: handleRefresh }}
        />
      )}
    </div>
  );
}