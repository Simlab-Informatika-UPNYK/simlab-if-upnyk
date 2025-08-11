import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function Page({ children, role = "admin" }) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return <p>Access Denied</p>;
  }

  // return (
  //   <>
  //     <h1>Protected Page</h1>
  //     <p>You can view this page because you are signed in.</p>
  //   </>
  // );

  return (
    <SidebarProvider>
      <AppSidebar role={role} />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
