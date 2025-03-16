import { DataTable } from "@/components/data-table/data-table";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import { getAllData } from "./actions";
import { columns } from "./_components/columns";



export default async function () {
  const data = await getAllData()
  
  return (
    <div className="max-w-screen-xl mx-auto">
      <DataTable
        toolbar={
          <Link href="/honor-praktikum/new">
            <Button>
              <PlusCircle />
              Add Data
            </Button>
          </Link>
        }
        viewOptions={true}
        globalSearch={true}
        // filters={filters}
        pagination={true}
        columns={columns}
        data={data}
      />
    </div>
  );
}
