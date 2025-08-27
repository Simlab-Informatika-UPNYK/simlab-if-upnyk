import { DataTable } from "@/components/data-table/data-table";
import { columns } from "./_components/columns";
import { getAllHonorJenis } from "./actions";
import { withAdminAuth } from "@/components/hoc/with-admin-auth";

const filters = [
  //   {
  //     id: "update_at",
  //     title: "Semester",
  //     options: [
  //       {
  //         value: "Genap",
  //         label: "Genap",
  //       },
  //       {
  //         value: "Ganjil",
  //         label: "Ganjil",
  //       },
  //     ],
  //   },
];

async function HonorAsistenPage() {
  const data = await getAllHonorJenis();

  return (
    <DataTable
      viewOptions={true}
      globalSearch={true}
      filters={filters}
      pagination={true}
      columns={columns}
      data={data}
    />
  );
}

export default withAdminAuth(HonorAsistenPage);
