import { getAslab } from "./actions";
import { columns } from "./_components/data-table/columns.jsx";
import { DataTable } from "./_components/data-table/data-table.jsx";
import { getServerSession } from "@/lib/auth-server";

export default async function Page() {
  const data = await getAslab();
  const { user } = await getServerSession();

  return (
    <div className="container mx-auto px-4 py-2">
      <h1 className="text-3xl font-bold">Data Asisten Laboratorium</h1>
      <p className="text-gray-500 mb-4">
        Daftar asisten laboratorium informatika UPNYK
      </p>

      <div className="relative w-[0] min-w-full overflow-x-auto">
        <DataTable role={user?.role} columns={columns} data={data} />
      </div>
    </div>
  );
}
