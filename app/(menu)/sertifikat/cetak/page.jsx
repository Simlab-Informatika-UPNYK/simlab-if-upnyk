import { DataTable } from "@/components/data-table/data-table";
import { columns as allAslabColumns } from "../_components/columns";
import { getAllAslabWithCourses } from "../actions";
import { getServerSession } from "@/lib/auth-server";
import { redirect } from "next/navigation";

const CetakPage = async () => {
  const data = await getAllAslabWithCourses();
  const session = await getServerSession();

  if (!session.user.role === "admin") {
    redirect("/sertifikat");
  }

  return <DataTable viewOptions={true} globalSearch={true} pagination={true} columns={allAslabColumns} data={data} />;
};

export default CetakPage;
