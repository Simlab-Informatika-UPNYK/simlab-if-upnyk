import { DataTable } from "@/components/data-table/data-table";
import { columns } from "./_components/columns";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

async function getData() {
  // Fetch data from your API here.
  return [
    {
      kode_mk: "124210321",
      mata_kuliah: "Praktikum Manajemen Proses Bisnis",
      semester: "Genap",
      jumlah_kelas: 6,
    },
    {
      kode_mk: "124210331",
      mata_kuliah: "Praktikum Sistem Informasi Geografis",
      semester: "Genap",
      jumlah_kelas: 6, 
    },
    {
      kode_mk: "124210341",
      mata_kuliah: "Praktikum Basis Data",
      semester: "Ganjil",
      jumlah_kelas: 4,
    },
    {
      kode_mk: "124210351",
      mata_kuliah: "Praktikum Pemrograman Web",
      semester: "Ganjil",
      jumlah_kelas: 8,
    },
    {
      kode_mk: "124210361",
      mata_kuliah: "Praktikum Jaringan Komputer",
      semester: "Genap",
      jumlah_kelas: 5,
    },
    {
      kode_mk: "124210371",
      mata_kuliah: "Praktikum Sistem Operasi",
      semester: "Ganjil",
      jumlah_kelas: 3,
    },
    {
      kode_mk: "124210381",
      mata_kuliah: "Praktikum Keamanan Sistem",
      semester: "Genap",
      jumlah_kelas: 7,
    },
    {
      kode_mk: "124210391",
      mata_kuliah: "Praktikum Mobile Programming",
      semester: "Ganjil",
      jumlah_kelas: 6,
    },
    {
      kode_mk: "124210401",
      mata_kuliah: "Praktikum Data Mining",
      semester: "Genap",
      jumlah_kelas: 4,
    },
    {
      kode_mk: "124210411",
      mata_kuliah: "Praktikum Cloud Computing",
      semester: "Ganjil",
      jumlah_kelas: 8,
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
          <Link href="/mk-praktikum/new">
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
