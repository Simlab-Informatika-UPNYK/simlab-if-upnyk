import { getAslab } from "./actions";
import { columns } from "./_components/data-table/columns.jsx";
import { DataTable } from "./_components/data-table/data-table.jsx";

async function getData() {
  return await getAslab();
}

export default async function Page() {
  const data = await getData();

  return (
    <div className="container mx-auto p-4">
      <div className="relative w-[0] min-w-full overflow-x-auto">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  );
}
