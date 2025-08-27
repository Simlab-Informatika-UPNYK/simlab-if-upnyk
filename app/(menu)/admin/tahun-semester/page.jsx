import { DataTable } from "@/components/data-table/data-table";
import { columns } from "./_components/columns";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getTahunSemester } from "./actions";
import { withAdminAuth } from "@/components/hoc/with-admin-auth";

async function TahunSemesterPage() {
  const data = await getTahunSemester();

  return (
    <div className="container mx-auto px-4 py-2">
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
