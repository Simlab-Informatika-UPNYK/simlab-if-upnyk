import { withAdminAuth } from "@/components/hoc/with-admin-auth";
import MKPraktikumClient from "./_components/mk-praktikum-client";

function MKPraktikumPage() {
  return <MKPraktikumClient />;
}

export default withAdminAuth(MKPraktikumPage);
