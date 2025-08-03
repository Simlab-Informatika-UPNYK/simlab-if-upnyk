import { DataTable } from "@/components/data-table/data-table";
import { columns } from "./_components/columns";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";

async function getData() {
  const supabase = await createClient();

  const { data: tahun_semester } = await supabase
    .from("tahun_semester")
    .select()
    .order("slug", { ascending: true });
  // console.log(tahun_semester);
  return tahun_semester;
}

export default async function Page() {
  const data = await getData();

  return (
    <>
      <div className="container mx-auto px-4 py-2">
        {/* <h1 className="text-xl font-bold">Data Tahun Semester</h1> */}
        <DataTable
          toolbar={
            <Link href="/tahun-semester/new">
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
    </>
  );
}
