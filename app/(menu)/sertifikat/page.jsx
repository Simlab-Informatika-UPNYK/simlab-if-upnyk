import { columns } from "./_components/columns";
import { getAllAslabWithCourses } from "./actions";
import { DataTable } from "./_components/data-table";

export default async function Page() {
  const data = await getAllAslabWithCourses();

  return (
    <DataTable
      viewOptions={true}
      globalSearch={true}
      pagination={true}
      columns={columns}
      data={data}
    />
  );
}
