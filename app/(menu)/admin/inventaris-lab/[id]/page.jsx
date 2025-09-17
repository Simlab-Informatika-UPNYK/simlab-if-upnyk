"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, Pencil, ChevronLeft } from "lucide-react";
import Link from "next/link";
import DeleteInventoryButton from "./_components/delete-inventory-button";
import { useParams } from "next/navigation";
import { getInventarisByLabId } from "../actions";
import { getLabDetail } from "./actions";
import { DataTable } from "@/components/data-table/data-table";

const Page = () => {
  const params = useParams();
  const labSlug = params.id;
  const [isLoading, setIsLoading] = useState(true);
  const [inventarisData, setInventarisData] = useState([]);
  const [refreshFlag, setRefreshFlag] = useState(0);
  const [labDetail, setLabDetail] = useState(null);

  // Function to trigger refresh of data
  const refreshData = () => {
    setRefreshFlag((prev) => prev + 1);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        // Fetch lab details
        const labResult = await getLabDetail(labSlug);
        if (!labResult.success) {
          setLabDetail(null);
          return;
        }

        setLabDetail(labResult.data);

        // Fetch inventaris items using the slug from URL params
        const result = await getInventarisByLabId(labResult.data.id);

        if (result.success && result.data && result.data.length > 0) {
          // Data sudah ditransform ke camelCase oleh actions.jsx
          // Hanya perlu transformasi untuk field UPS
          setInventarisData(result.data);
        } else {
          // Fallback to dummy data if no data from database
          // setInventarisData(dummyData);
        }
      } catch (error) {
        setLabDetail(null);
        setInventarisData([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [labSlug, refreshFlag]);

  return (
    <>
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <Link href={"/admin/inventaris-lab"}>
              <Button variant="outline" size="sm" className="mb-2">
                <ChevronLeft />
                Kembali
              </Button>
            </Link>

            <h1 className="text-2xl font-bold">Detail Inventaris</h1>
            {labDetail && (
              <p className="text-gray-500">
                Laboratorium: {labDetail.nama} {labDetail.lantai ? `- Lantai ${labDetail.lantai}` : ""}
              </p>
            )}
          </div>
          <Link href={`/admin/inventaris-lab/${labSlug}/new`}>
            <Button>
              <PlusCircle className="h-4 w-4 mr-2" />
              Tambah Inventaris
            </Button>
          </Link>
        </div>

        {isLoading ? (
          <div className="text-center p-6">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary m-auto"></div>
            <p className="mt-2">Memuat data inventaris...</p>
          </div>
        ) : (
          <DataTable
            globalSearch={true}
            pagination={true}
            columns={[
              {
                accessorKey: "no",
                header: "No",
                cell: ({ row }) => row.index + 1,
              },
              {
                accessorKey: "nama",
                header: "Nama",
              },
              {
                accessorKey: "tahun",
              },
              {
                accessorKey: "kondisi",
              },
              {
                accessorKey: "keterangan",
              },
              {
                id: "actions",
                cell: ({ row }) => {
                  const item = row.original;
                  return (
                    <div className="flex">
                      <Link href={`/admin/inventaris-lab/${labSlug}/${item.id}`}>
                        <Button size="icon" variant="ghost">
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </Link>
                      <DeleteInventoryButton
                        inventoryId={item.id}
                        inventoryName={item.merekModel}
                        onSuccess={refreshData}
                      />
                    </div>
                  );
                },
              },
            ]}
            data={inventarisData}
          />
        )}
      </div>
    </>
  );
};

export default Page;
