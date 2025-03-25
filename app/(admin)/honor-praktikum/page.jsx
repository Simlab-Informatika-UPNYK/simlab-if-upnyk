"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { getAllData, getAllPeriode } from "./actions";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";

export default function HonorPraktikumPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPeriod = searchParams.get("periode");

  const [data, setData] = useState([]);
  const [periodeOptions, setPeriodeOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tableLoading, setTableLoading] = useState(true);

  // Fetch period options only once
  useEffect(() => {
    const fetchPeriodes = async () => {
      try {
        const periode = await getAllPeriode();
        const options = periode.map((p) => ({
          value: p.slug,
          label: p.tahun_ajaran + " " + p.semester,
        }));
        setPeriodeOptions(options);

        // If no period is selected yet, select the first one
        if (!currentPeriod && options.length > 0) {
          const params = new URLSearchParams(searchParams.toString());
          params.set("periode", options[0].value);
          router.replace(`?${params.toString()}`);
        }
      } catch (error) {
        console.error("Error fetching periods:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPeriodes();
  }, []);

  // Fetch table data whenever the period changes
  useEffect(() => {
    const fetchTableData = async () => {
      if (!currentPeriod) return;

      setTableLoading(true);
      try {
        const honorData = await getAllData(currentPeriod);
        setData(honorData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setTableLoading(false);
      }
    };

    fetchTableData();
  }, [currentPeriod]);

  // Handle period change
  const handlePeriodeChange = (value) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("periode", value);
    router.replace(`?${params.toString()}`);
  };

  return (
    <div className="max-w-screen-xl mx-auto">
      {loading ? (
        <div>Loading periods...</div>
      ) : (
        <>
          <DataTable
            periodeOptions={periodeOptions}
            columns={columns}
            defaultValue={currentPeriod}
            data={data}
            isLoading={tableLoading}
            onPeriodeChange={handlePeriodeChange}
          />
        </>
      )}
    </div>
  );
}
