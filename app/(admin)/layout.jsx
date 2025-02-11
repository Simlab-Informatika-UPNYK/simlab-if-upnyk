import { AppSidebar } from "@/components/app-sidebar"
import {
    SidebarInset,
    SidebarProvider,
} from "@/components/ui/sidebar"

export default async function Page({ children }) {

    return (
        (<SidebarProvider>
            <AppSidebar />
            <SidebarInset>
               {children}
            </SidebarInset>
        </SidebarProvider>)
    );
}
