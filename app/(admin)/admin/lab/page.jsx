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

export default async function Page() {
  const data = await getAllLab();

  // Fixed calculation to handle potential non-numeric values
  const totalCapacity = data.reduce((sum, lab) => {
    // Parse the capacity to a number and add only if it's a valid number
    const kapasitas = parseInt(lab.kapasitas) || 0;
    return sum + kapasitas;
  }, 0);

  // TODO: fungsi crud lab
  return (
    <div className="container mx-auto p-4">
      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
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
          <Link href="/lab/new">
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
