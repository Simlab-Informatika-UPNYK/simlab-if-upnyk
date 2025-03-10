import { AppSidebar } from "@/components/app-sidebar";
import { NavUser } from "@/components/nav-user";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { createClient } from "@/utils/supabase/server";

export default async function NavbarLayout({ children, title = "SIMLAB" }) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <>
      <header className="flex sticky justify-between top-0 z-[9] bg-background h-16 shrink-0 items-center gap-2 border-b px-4">
        <div className="flex w-full flex-1 items-center gap-2 px-3">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <h1 className="text-lg font-semibold">{title}</h1>
        </div>
        <div className="ml-auto px-3">
          <NavUser 
           // TODO: FIX THIS
            user={{
              name: user.email,
              email: user.email,
              avatar:
                "https://imgs.search.brave.com/hTCF4lIz_LNq76HYbdPumfAVw_jhrFS1Qm-P-7yyfJ4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA2LzE0Lzk2LzA1/LzM2MF9GXzYxNDk2/MDUxNV9tUXNGN25T/MXIzcVo5ZUNIenFK/NWN5Q3htanNmSk9D/US5qcGc",
            }}
          />
        </div>
      </header>
      {children}
    </>
  );
}
