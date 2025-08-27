import { DataTable } from "@/components/data-table/data-table";
import { columns } from "./_components/columns";
import { PlusCircle } from "lucide-react";
import { getAllUsers } from "./actions";
import { Button } from "@/components/ui/button";
import Link from "next/link";
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

async function UserPage() {
  const data = await getAllUsers();

  return (
    <div className="container mx-auto p-4">
      {/* {JSON.stringify(users)} */}
      <DataTable
        toolbar={
          <Link href="/admin/user/new">
            <Button>
              <PlusCircle />
              Add Data
            </Button>
          </Link>
        }
        viewOptions={true}
        globalSearch={true}
        filters={filters}
        pagination={true}
        columns={columns}
        data={data}
      />
    </div>
  );
}

export default withAdminAuth(UserPage);
