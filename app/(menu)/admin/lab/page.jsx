import { DataTable } from "@/components/data-table/data-table";
import { columns } from "./_components/columns";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getAllLab } from "./actions.jsx";
import { withAdminAuth } from "@/components/hoc/with-admin-auth";

async function LabPage() {
  const data = await getAllLab();

  const totalCapacity = data.reduce((sum, lab) => {
    const kapasitas = parseInt(lab.kapasitas) || 0;
    return sum + kapasitas;
  }, 0);

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Jumlah Laboratorium</CardTitle>
            <CardDescription>Total keseluruhan lab</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{data.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Kapasitas</CardTitle>
            <CardDescription>
              Total keseluruhan kapasitas laboratorium
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{totalCapacity}</p>
          </CardContent>
        </Card>
      </div>

      <DataTable
        toolbar={
          <Link href="/admin/lab/new">
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

export default withAdminAuth(LabPage);
