import { createClient } from "@/utils/supabase/server";
import { columns } from './_components/columns.jsx'
import { DataTable } from "./_components/data-table.jsx"

async function getData() {
  // Fetch data from your API here.
  const supabase = await createClient();

  const { data: aslab } = await supabase
    .from("aslab")
    .select();
  return aslab
}

export default async function Page() {
  const data = await getData()

  return (
    <div className="container mx-auto p-4">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
