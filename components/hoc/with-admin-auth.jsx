import { getServerSession } from "@/lib/auth-server";
import { redirect } from "next/navigation";

export function withAdminAuth(Component) {
  return async function AdminAuthWrapper(props) {
    const session = await getServerSession();
    
    // Jika tidak ada session atau role bukan admin, redirect ke dashboard
    if (!session || session.user?.role !== "admin") {
      redirect("/dashboard");
    }
    
    return <Component {...props} />;
  };
}
