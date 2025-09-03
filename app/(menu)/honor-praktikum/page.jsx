import { getTahunSemester } from "./actions";
import { getServerSession } from "@/lib/auth-server";
import AdminHonorPage from "./admin-honor";
import AslabHonorPage from "./aslab-honor";

export default async function HonorPraktikumPage() {
  const session = await getServerSession();

  const { user } = session;
  let tahunSemester = await getTahunSemester();

  return user.role === "admin" ? (
    <AdminHonorPage initialTahunSemester={tahunSemester} />
  ) : (
    <AslabHonorPage initialNim={user.username} tahunSemester={tahunSemester} />
  );
}
