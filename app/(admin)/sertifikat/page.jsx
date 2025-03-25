import { columns } from "./_components/columns";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getAllCertificateRequests } from "./actions";
import { DataTable } from "./_components/data-table";

export default async function Page() {
  const data = await getAllCertificateRequests();

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
      pagination={true}
      columns={columns}
      data={data}
    />
  );
}
