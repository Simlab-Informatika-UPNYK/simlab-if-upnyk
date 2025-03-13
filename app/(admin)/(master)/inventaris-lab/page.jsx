import { DataTable } from "@/components/data-table/data-table";
import { columns } from "./_components/columns";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

async function getData() {
  // Fetch data from your API here.
  return [
    {
      id: 1,
      nama: "Komputer",
      jumlah: 30,
      tahun: 2020,
      kondisi: "Baik",
    },
    {
      id: 2,
      nama: "Kursi",
      jumlah: 30,
      tahun: 2020,
      kondisi: "-",
    },
    {
      id: 3,
      nama: "Meja",
      jumlah: 30,
      tahun: 2020,
      kondisi: "Tidak Baik",
    },
    {
      id: 4,
      nama: "Papan Tulis",
      jumlah: 30,
      tahun: 2020,
      kondisi: "-",
    },
    {
      id: 5,
      nama: "Kursi",
      jumlah: 30,
      tahun: 2020,
      kondisi: "-",
    },
    {
      id: 6,
      nama: "Kursi",
      jumlah: 30,
      tahun: 2020,
      kondisi: "-",
    },
    {
      id: 7,
      nama: "Lemari",
      jumlah: 10,
      tahun: 2019,
      kondisi: "Baik",
    },
    {
      id: 8,
      nama: "Proyektor",
      jumlah: 5,
      tahun: 2021,
      kondisi: "Baik",
    },
    {
      id: 9,
      nama: "AC",
      jumlah: 2,
      tahun: 2022,
      kondisi: "Tidak Baik",
    },
    {
      id: 10,
      nama: "Rak Buku",
      jumlah: 8,
      tahun: 2020,
      kondisi: "Baik",
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
          <Link href="/inventaris-lab/new">
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
