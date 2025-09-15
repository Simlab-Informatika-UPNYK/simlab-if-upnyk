import { DataTable } from "@/components/data-table/data-table";
import { columns } from "./_components/columns";
import { getAllHonorJenis } from "./actions";
import { withAdminAuth } from "@/components/hoc/with-admin-auth";

async function HonorAsistenPage() {
  const data = await getAllHonorJenis();

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

export default withAdminAuth(HonorAsistenPage);
