import { DataTable } from "@/components/data-table/data-table";
import { columns } from "./_components/columns";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getAllHonorJenis } from "./actions";

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
  const data = await getAllHonorJenis();

  return (
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
  );
}
