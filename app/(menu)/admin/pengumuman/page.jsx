import { DataTable } from "@/components/data-table/data-table";
import { columns } from "./_components/columns";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getPengumuman } from "./actions";
import { withAdminAuth } from "@/components/hoc/with-admin-auth";

async function PengumumanPage() {
  const data = await getPengumuman();

  return (
    <div className="container mx-auto px-4 py-2">
      <DataTable
        toolbar={
          <Link href="pengumuman/new">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Buat Pengumuman
            </Button>
          </Link>
        }
        globalSearch={true}
        pagination={true}
        columns={columns}
        data={data}
      />
    </div>
  );
}

export default withAdminAuth(PengumumanPage);
