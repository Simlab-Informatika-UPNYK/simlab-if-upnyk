import { DataTable } from "@/components/data-table/data-table";
import { columns } from "./_components/columns";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getAllDosen } from "./actions";
import { withAdminAuth } from "@/components/hoc/with-admin-auth";

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

async function DosenPengampuPage() {
  const data = await getAllDosen();

  return (
    <div className="container mx-auto px-4 py-2">
      <h1 className="text-3xl font-bold">Data Dosen Pengampu</h1>
      <p className="text-gray-500 mb-4">
        Daftar dosen pengampu mata kuliah praktikum
      </p>

      <DataTable
        toolbar={
          <Link href="/admin/dosen-pengampu/new">
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

export default withAdminAuth(DosenPengampuPage);
