"use client";

import { useState, useEffect } from "react";
import { DataTable } from "@/components/data-table/data-table";
import { columns } from "./_components/columns";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getKalabData } from "./actions";

export default function Page() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const fetchedData = await getKalabData();
      setData(fetchedData);
    }
    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-2">
      <h1 className="text-3xl font-bold">Data Kepala Laboratorium</h1>
      <p className="text-gray-500 mb-4">
        Daftar Kepala Laboratorium Informatika UPNYK
      </p>

      <DataTable
        toolbar={
          <Link href="/kalab/new">
            <Button>
              <PlusCircle className="h-4 w-4 mr-2" />
              Tambah Kalab
            </Button>
          </Link>
        }
        globalSearch={true}
        pagination={true}
        columns={columns}
        data={data}
      />
    </div>
  );
}
