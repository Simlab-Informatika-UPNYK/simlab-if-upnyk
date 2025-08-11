import { DataTable } from "@/components/data-table/data-table";
import { columns } from "./_components/columns";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {getAllDosen} from "./actions"
/* nama
nip
email */
async function getData() {
  // Fetch data from your API here.
  return [
    {
      nama: "Juwairiah, S.Si., M.T.",
      nip: "01020304",
      email: "test@gmail.com",
      slug: "juwai"
    },
    {
      nama: "Ahmad Dani, S.Kom., M.Cs.",
      nip: "02030405",
      email: "test@gmail.com",
      slug: "ahmad"
    },
    {
      nama: "Siti Nurhaliza, S.T., M.Eng.",
      nip: "03040506",
      email: "test@gmail.com",
      slug: ""
    },
    {
      nama: "Budi Santoso, M.Kom.",
      nip: "04050607",
      email: "test@gmail.com",
      slug: ""
    },
    {
      nama: "Rina Andriyani, S.Si., M.Sc.",
      nip: "05060708",
      email: "test@gmail.com",
      slug: ""
    },
    {
      nama: "Dedi Setiawan, S.Kom., M.M.",
      nip: "06070809",
      email: "test@gmail.com",
      slug: ""
    },
    {
      nama: "Sri Mulyani, S.T., M.Si.",
      nip: "07080910",
      email: "test@gmail.com",
      slug: ""
    },
    {
      nama: "Taufik Hidayat, M.T.",
      nip: "08091011",
      email: "test@gmail.com",
      slug: ""
    },
    {
      nama: "Andika Pratama, S.Si., M.Eng.",
      nip: "09101112",
      email: "test@gmail.com",
      slug: ""
    },
    {
      nama: "Rina Wulandari, M.Kom.",
      nip: "10111213",
      email: "test@gmail.com",
      slug: ""
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
  const data = await getAllDosen();

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
