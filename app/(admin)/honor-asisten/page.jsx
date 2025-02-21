import { DataTable } from "@/components/data-table/data-table";
import { columns } from "./_components/columns";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

async function getData() {
  // Fetch data from your API here.
  return [
    {
      no: 1,
      jenis: "Responsi",
      biaya: 2500000,
    },
    {
      no: 2,
      jenis: "Honorarium",
      biaya: 45000,
    },
    {
      no: 3,
      jenis: "Koreksi",
      biaya: 2500000,
    },
    {
      no: 4,
      jenis: "Naskah",
      biaya: 2500000,
    },
    {
      no: 5,
      jenis: "Laporan",
      biaya: 1500000,
    },
    {
      no: 6,
      jenis: "Pengujian",
      biaya: 3000000,
    },
    {
      no: 7,
      jenis: "Evaluasi",
      biaya: 2000000,
    },
    {
      no: 8,
      jenis: "Pelatihan",
      biaya: 1000000,
    },
    {
      no: 9,
      jenis: "Konsultasi",
      biaya: 3500000,
    },
    {
      no: 10,
      jenis: "Presentasi",
      biaya: 1200000,
    },
  ];
}

const filters = [
  //   {
  //     id: "update_at",
  //     title: "Semester",
  //     options: [
  //       {
  //         value: "Genap",
  //         label: "Genap",
  //       },
  //       {
  //         value: "Ganjil",
  //         label: "Ganjil",
  //       },
  //     ],
  //   },
];

export default async function Page() {
  const data = await getData();

  return (
    <div className="container mx-auto p-4">
      <DataTable
        toolbar={
          <Link href="/honor-asisten/new">
            <Button>
              <PlusCircle />
              Add Data
            </Button>
          </Link>
        }
        viewOptions={true}
        globalSearch={true}
        filters={filters}
        pagination={true}
        columns={columns}
        data={data}
      />
    </div>
  );
}
