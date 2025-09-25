import { DataTable } from "@/components/data-table/data-table";
import { columns } from "./_components/columns";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getKalabData } from "./actions";
import { withAdminAuth } from "@/components/hoc/with-admin-auth";
import { withRoleAuth } from "@/components/hoc/with-role-auth";
import { getServerSession } from "@/lib/auth-server";
import { aslabColumn } from "./_components/aslab-columns";

async function KalabPage() {
  const data = await getKalabData();
  const session = await getServerSession();
  const isAdmin = session?.user?.role === 'admin';

  return (
    <div className="container mx-auto px-4 py-2">
      <h1 className="text-3xl font-bold">Data Kepala Laboratorium</h1>
      <p className="text-gray-500 mb-4">
        Daftar Kepala Laboratorium Informatika UPNYK
      </p>

      <DataTable
        toolbar={
          isAdmin && (
            <Link href="/admin/kalab/new">
              <Button>
                <PlusCircle className="h-4 w-4 mr-2" />
                Tambah Kalab
              </Button>
            </Link>
          )
        }
        globalSearch={true}
        pagination={true}
        columns={isAdmin ? columns : aslabColumn}
        data={data}
      />
    </div>
  );
}

export default withRoleAuth(KalabPage, ['admin', 'aslab']);
