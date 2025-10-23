import { DataTable } from "@/components/data-table/data-table";
import { columns } from "./_components/columns";
import { getAllHonorJenis } from "./actions";
import { withAdminAuth } from "@/components/hoc/with-admin-auth";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

async function HonorAsistenPage() {
  const data = await getAllHonorJenis();

  return (
    <div className="container mx-auto px-4 py-2">
      <h1 className="text-3xl font-bold">Data Honor Asisten</h1>
      <p className="text-gray-500 mb-4">
        Daftar jenis honor asisten laboratorium
      </p>

      <DataTable
        toolbar={
          <Link href="/admin/honor-asisten/new">
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
    </div>
  );
}

export default withAdminAuth(HonorAsistenPage);
