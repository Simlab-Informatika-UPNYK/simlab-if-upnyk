import { DataTable } from "@/components/data-table/data-table";
import { columns } from "./_components/columns";
import { PlusCircle } from "lucide-react";
import { getAllJadwal } from "./actions";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
  const data = await getAllJadwal();

  return (
    <DataTable
      toolbar={
        <Link href="/jadwal-praktikum/new">
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
  );
}
