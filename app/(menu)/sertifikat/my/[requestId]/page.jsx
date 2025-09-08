import { getServerSession } from "@/lib/auth-server";
import { redirect } from "next/navigation";
import AslabCertificateDetail from "./aslab-certificate-detail";

export default async function AslabCertificatePage({ params }) {
  const session = await getServerSession();

  if (session.user.role !== "aslab") {
    redirect("/sertifikat");
  }

  const requestId = (await params).requestId;

  return <AslabCertificateDetail requestId={requestId} />;
}
