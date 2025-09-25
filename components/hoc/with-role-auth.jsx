import { getServerSession } from "@/lib/auth-server";
import { redirect } from "next/navigation";

export function withRoleAuth(Component, allowedRoles = []) {
  return async function RoleAuthWrapper(props) {
    const session = await getServerSession();

    // Jika tidak ada session, redirect ke dashboard
    if (!session) {
      redirect("/dashboard");
    }

    // Jika role tidak diizinkan, redirect ke dashboard
    if (allowedRoles.length > 0 && !allowedRoles.includes(session.user?.role)) {
      redirect("/dashboard");
    }

    return <Component {...props} />;
  };
}