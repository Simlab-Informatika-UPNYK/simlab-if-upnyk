import React from "react";
import { NewAslabForm } from "./form-new-aslab";
import { getServerSession } from "@/lib/auth-server";

const Page = async () => {
  const session = await getServerSession();

  if (session.user.role !== "admin") {
    redirect("/sertifikat");
  }

  return <NewAslabForm />;
};

export default Page;
