"use client";

import {
  AudioWaveform,
  Calendar,
  Command,
  GalleryVerticalEnd,
  HandCoins,
  IdCard,
  LayoutDashboard,
  SquareTerminal,
  TicketCheck,
} from "lucide-react";
import { NavMain } from "@/components/nav-main";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Image from "next/image";
import favicon from "@/app/favicon.svg";
import Link from "next/link";
import { Beaker } from "lucide-react";
import { UserRound } from "lucide-react";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "https://ui.shadcn.com/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Master Setup",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Tahun Semester",
          url: "/admin/tahun-semester",
        },
        {
          title: "MK Praktikum",
          url: "/admin/mk-praktikum",
        },
        {
          title: "Dosen Pengampu",
          url: "/admin/dosen-pengampu",
        },
        {
          title: "Inventaris Lab",
          url: "/admin/inventaris-lab",
        },
        {
          title: "User",
          url: "/admin/user",
        },
        {
          title: "Honor Asisten",
          url: "/admin/honor-asisten",
        },
      ],
    },
    {
      title: "Lab",
      url: "/lab",
      icon: Beaker,
    },
    {
      title: "Kalab",
      url: "/kalab",
      icon: UserRound, 
    },
    {
      title: "Asisten",
      url: "/aslab",
      // isActive: true,
      icon: IdCard,
    },
    {
      title: "Jadwal Praktikum",
      url: "/jadwal-praktikum",
      icon: Calendar,
    },
    {
      title: "Honor Praktikum",
      url: "/honor-praktikum",
      icon: HandCoins,
    },
    {
      title: "Sertifikat",
      url: "/sertifikat",
      icon: TicketCheck,
    },
  ],
};

export function AppSidebar({ userRole, ...props }) {
  const filteredNavMain = data.navMain.map((item) => {
    if (item.title === "Master Setup" && userRole === "aslab") {
      // Filter items untuk aslab - hanya tampilkan Lab
      return {
        ...item,
        items: item.items.filter(subItem => subItem.title === "Lab")
      };
    }
    return item;
  }).filter((item) => {
    // Hapus Master Setup jika tidak ada items
    if (item.title === "Master Setup" && (!item.items || item.items.length === 0)) {
      return false;
    }
    return true;
  });

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="h-16 border-b border-sidebar-border">
        {/* <NavUser user={data.user} /> */}
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-white text-sidebar-primary-foreground">
                  <Image src={favicon} alt="Favicon" className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">SIMLAB</span>
                  {/* <span className="">v1.0.0</span> */}
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={filteredNavMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}
