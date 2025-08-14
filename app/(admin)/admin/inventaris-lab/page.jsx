import { DataTable } from "@/components/data-table/data-table";
import { columns } from "./_components/columns";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getAllLab } from "../lab/actions";

export default async function Page() {
  const data = await getAllLab();

  return (
    <div className="container mx-auto px-4 py-2">
      <h1 className="text-3xl font-bold">Inventaris Laboratorium</h1>
      <p className="text-gray-500 mb-4">
        Daftar Laboratorium Informatika UPNYK
      </p>

      <DataTable
        // toolbar={
        //   <Link href="/admin/inventaris-lab/new">
        //     <Button>
        //       <PlusCircle className="h-4 w-4 mr-2" />
        //       Tambah Lab
        //     </Button>
        //   </Link>
        // }
        globalSearch={true}
        pagination={true}
        columns={columns}
        data={data}
      />
    </div>
  );
}
