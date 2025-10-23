import { DataTable } from "@/components/data-table/data-table";
import { columns } from "./_components/columns";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getTahunSemesterWithUsage } from "./actions";
import { withAdminAuth } from "@/components/hoc/with-admin-auth";

async function TahunSemesterPage() {
  const data = await getTahunSemesterWithUsage();

  return (
    <div className="container mx-auto px-4 py-2">
      <h1 className="text-3xl font-bold">Data Tahun Semester</h1>
      <p className="text-gray-500 mb-4">
        Daftar tahun ajaran semester aktif untuk praktikum
      </p>

      <DataTable
        toolbar={
          <Link href="tahun-semester/new">
            <Button>
              <PlusCircle />
              Add Data
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

export default withAdminAuth(TahunSemesterPage);
