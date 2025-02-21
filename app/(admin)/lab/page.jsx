import { DataTable } from "@/components/data-table/data-table";
import { columns } from "./_components/columns";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

async function getData() {
  // Fetch data from your API here.
  return [
    {
      "Nama Laboratorium": "Laboratorium Komputasi",
      Lantai: "Pattimura I",
      Kapasitas: 28,
      Kalab: "Heru Cahya Rustamaji Dr. S.Si., M.T.",
    },
    {
      "Nama Laboratorium": "Laboratorium Jaringan",
      Lantai: "Pattimura I",
      Kapasitas: 30,
      Kalab: "Dr. Ir. Budi Setiawan, M.Kom.",
    },
    {
      "Nama Laboratorium": "Laboratorium IOT",
      Lantai: "Pattimura II",
      Kapasitas: 25,
      Kalab: "Dr. Rina Andriyani, S.T., M.Sc.",
    },
    {
      "Nama Laboratorium": "Laboratorium Basis Data",
      Lantai: "Pattimura II",
      Kapasitas: 20,
      Kalab: "Drs. Taufik Hidayat, M.T.",
    },
    {
      "Nama Laboratorium": "Laboratorium Mobile",
      Lantai: "Pattimura III",
      Kapasitas: 35,
      Kalab: "Dr. Andika Pratama, S.Si., M.Eng.",
    },
    {
      "Nama Laboratorium": "Laboratorium Geoinformatika",
      Lantai: "Pattimura III",
      Kapasitas: 22,
      Kalab: "Dr. Sri Wahyuni, S.T., M.Si.",
    },
    {
      "Nama Laboratorium": "Laboratorium PPSI",
      Lantai: "Pattimura I",
      Kapasitas: 27,
      Kalab: "Ir. Bambang Sudrajat, M.Sc.",
    },
    {
      "Nama Laboratorium": "Laboratorium RBPL",
      Lantai: "Pattimura II",
      Kapasitas: 32,
      Kalab: "Dr. Dedi Setiawan, S.Kom., M.M.",
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

  const totalCapacity = data.reduce((sum, lab) => sum + lab.Kapasitas, 0);

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Jumlah Kepala Laboratorium</CardTitle>
            <CardDescription>Total keseluruhan kalab</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{data.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Kapasitas</CardTitle>
            <CardDescription>
              Total keseluruhan kapasitas laboratorium
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{totalCapacity}</p>
          </CardContent>
        </Card>
      </div>

      <DataTable
        toolbar={
          <Link href="/lab/new">
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
