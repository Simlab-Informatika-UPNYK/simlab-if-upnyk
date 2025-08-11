"use client";

import { ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation"; // Import hook usePathname

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { cn } from "@/lib/utils"; // Pastikan Anda memiliki fungsi cn untuk conditional classnames

export function NavMain({ items }) {
  const pathname = usePathname(); // Mendapatkan path URL saat ini

  // Fungsi untuk mengecek apakah URL aktif
  const isActive = (url) => {
    return pathname.startsWith(url);
  };

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
          // Cek apakah item ini aktif
          const active = isActive(item.url);

          return !item.items ? (
            <SidebarMenuItem className="border-none" key={item.title}>
              <Link href={item.url}>
                <SidebarMenuButton
                  className={cn(
                    active &&
                      "bg-primary text-primary-foreground hover:bg-primary/90"
                  )}
                >
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ) : (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={item.isActive}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    tooltip={item.title}
                    className={cn(
                      active &&
                        "bg-primary text-primary-foreground hover:text-white hover:bg-primary/90"
                    )}
                  >
                    {item.icon && <item.icon />}
                      <span>{item.title}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.items?.map((subItem) => {
                      // Cek apakah sub-item ini aktif
                      const subActive = isActive(subItem.url);

                      return (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton
                            asChild
                            className={cn(
                              subActive &&
                                "bg-primary text-primary-foreground hover:text-white hover:bg-primary/90"
                            )}
                          >
                            <Link href={subItem.url}>
                              <span>{subItem.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      );
                    })}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
