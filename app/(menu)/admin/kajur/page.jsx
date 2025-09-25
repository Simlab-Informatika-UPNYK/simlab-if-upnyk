import { getServerSession } from "@/lib/auth-server";
import { redirect } from "next/navigation";
import KajurForm from "./_components/kajur-form";
import NavbarLayout from "@/components/navbar-layout";

export default async function KajurPage() {
  const session = await getServerSession();

  if (session.user.role !== "admin") {
    redirect("/dashboard");
  }

  return (
    <NavbarLayout title="Kelola Kepala Jurusan">
      <KajurForm />
    </NavbarLayout>
  );
}
