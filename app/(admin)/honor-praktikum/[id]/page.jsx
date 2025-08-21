import { getAllData } from "./actions";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";

export default async function HonorPraktikumPage({ params }) {
  const currentPeriod = params.id;

  const data = await getAllData(currentPeriod);

  return (
    <div className="max-w-screen-xl mx-auto">
      <DataTable
        columns={columns}
        data={data.map((item) => ({ ...item, currentPeriod }))}
        isLoading={false}
        currentPeriod={currentPeriod}
      />
    </div>
  );
}
