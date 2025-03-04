import { DataTable } from "@/components/data-table/data-table";
import { columns } from "./_components/columns";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

async function getData() {
  // Fetch data from your API here.
  return [
    {
      id: "1",
      nama_lengkap: "Ahmad Jaelani",
      email: "ahmad.jaelani@example.com",
      peran: "Admin",
      status: "Aktif",
      tgl_daftar: "2023-10-26",
      tgl_login_terakhir: "2023-10-27",
    },
    {
      id: "2",
      nama_lengkap: "Siti Nurhaliza",
      email: "siti.nurhaliza@example.net",
      peran: "Editor",
      status: "Aktif",
      tgl_daftar: "2023-10-25",
      tgl_login_terakhir: "2023-10-27",
    },
    {
      id: "3",
      nama_lengkap: "Budi Santoso",
      email: "budi.santoso@example.org",
      peran: "Viewer",
      status: "Non-aktif",
      tgl_daftar: "2023-10-20",
      tgl_login_terakhir: "-",
    },
    {
      id: "4",
      nama_lengkap: "Rina Andriyani",
      email: "rina.andriyani@example.co.id",
      peran: "Admin",
      status: "Aktif",
      tgl_daftar: "2023-10-15",
      tgl_login_terakhir: "2023-10-27",
    },
    {
      id: "5",
      nama_lengkap: "Dedi Setiawan",
      email: "dedi.setiawan@example.id",
      peran: "Editor",
      status: "Aktif",
      tgl_daftar: "2023-10-10",
      tgl_login_terakhir: "2023-10-26",
    },
    {
      id: "6",
      nama_lengkap: "Sri Mulyani",
      email: "sri.mulyani@example.info",
      peran: "Viewer",
      status: "Aktif",
      tgl_daftar: "2023-10-05",
      tgl_login_terakhir: "2023-10-27",
    },
    {
      id: "7",
      nama_lengkap: "Taufik Hidayat",
      email: "taufik.hidayat@test.com",
      peran: "Admin",
      status: "Non-aktif",
      tgl_daftar: "2023-10-01",
      tgl_login_terakhir: "-",
    },
    {
      id: "8",
      nama_lengkap: "Andika Pratama",
      email: "andika.pratama@test.net",
      peran: "Editor",
      status: "Aktif",
      tgl_daftar: "2023-09-25",
      tgl_login_terakhir: "2023-10-27",
    },
    {
      id: "9",
      nama_lengkap: "Rina Wulandari",
      email: "rina.wulandari@test.org",
      peran: "Viewer",
      status: "Aktif",
      tgl_daftar: "2023-09-20",
      tgl_login_terakhir: "2023-10-24",
    },
    {
      id: "10",
      nama_lengkap: "Budi Cahyono",
      email: "budi.cahyono@test.co.id",
      peran: "Admin",
      status: "Aktif",
      tgl_daftar: "2023-09-15",
      tgl_login_terakhir: "2023-10-27",
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
          <Link href="/user/new">
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
