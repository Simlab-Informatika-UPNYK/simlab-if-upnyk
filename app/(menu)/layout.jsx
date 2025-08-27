import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getServerSession } from "@/lib/auth-server";

export default async function Page({ children }) {
  const session = await getServerSession();
  const userRole = session?.user?.role || "Unknown";

  return (
    <SidebarProvider>
      <AppSidebar userRole={userRole} />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
