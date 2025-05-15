import { columns } from "./_components/columns";
import { PlusCircle, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getAllCertificateRequests } from "./actions";
import { DataTable } from "./_components/data-table";

export default async function Page() {
  const data = await getAllCertificateRequests();
  // return <pre>{JSON.stringify(data, null, 2)}</pre>;

  return (
    <DataTable
      toolbar={
        <Link href="/sertifikat/new">
          <Button>
            <Printer />
            Cetak Sertifikat
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
