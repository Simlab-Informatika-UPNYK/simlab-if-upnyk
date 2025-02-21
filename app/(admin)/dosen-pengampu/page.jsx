import { DataTable } from "@/components/data-table/data-table";
import { columns } from "./_components/columns";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

async function getData() {
  // Fetch data from your API here.
  return [
    {
      nama: "Juwairiah, S.Si., M.T.",
      nip: "01020304",
      mata_kuliah: "Praktikum Manajemen Proses Bisnis",
      kelas: "SI-A",
    },
    {
      nama: "Ahmad Dani, S.Kom., M.Cs.",
      nip: "02030405",
      mata_kuliah: "Praktikum Basis Data",
      kelas: "SI-B",
    },
    {
      nama: "Siti Nurhaliza, S.T., M.Eng.",
      nip: "03040506",
      mata_kuliah: "Praktikum Pemrograman Web",
      kelas: "TI-A",
    },
    {
      nama: "Budi Santoso, M.Kom.",
      nip: "04050607",
      mata_kuliah: "Praktikum Jaringan Komputer",
      kelas: "TI-B",
    },
    {
      nama: "Rina Andriyani, S.Si., M.Sc.",
      nip: "05060708",
      mata_kuliah: "Praktikum Sistem Operasi",
      kelas: "SI-C",
    },
    {
      nama: "Dedi Setiawan, S.Kom., M.M.",
      nip: "06070809",
      mata_kuliah: "Praktikum Keamanan Sistem",
      kelas: "TI-C",
    },
    {
      nama: "Sri Mulyani, S.T., M.Si.",
      nip: "07080910",
      mata_kuliah: "Praktikum Mobile Programming",
      kelas: "SI-D",
    },
    {
      nama: "Taufik Hidayat, M.T.",
      nip: "08091011",
      mata_kuliah: "Praktikum Data Mining",
      kelas: "TI-D",
    },
    {
      nama: "Andika Pratama, S.Si., M.Eng.",
      nip: "09101112",
      mata_kuliah: "Praktikum Cloud Computing",
      kelas: "SI-E",
    },
    {
      nama: "Rina Wulandari, M.Kom.",
      nip: "10111213",
      mata_kuliah: "Praktikum Desain Grafis",
      kelas: "TI-E",
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
          <Link href="/dosen-pengampu/new">
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
