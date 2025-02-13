import { createClient } from "@/utils/supabase/server";
import { Payment, columns } from "./components/columns"
import { DataTable } from "./components/data-table"

async function getData() {
  // Fetch data from your API here.
  const supabase = await createClient();

  const { data: aslab } = await supabase
    .from("aslab")
    .select();
  return aslab
}

export default async function DemoPage() {
  const data = await getData()

  return (
    <div className="container mx-auto p-4">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
