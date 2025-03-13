"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Calendar,
  Command,
  Frame,
  GalleryVerticalEnd,
  HandCoins,
  IdCard,
  LayoutDashboard,
  LayoutDashboardIcon,
  Map,
  MoreHorizontal,
  PieChart,
  Settings2,
  SquareTerminal,
  TicketCheck,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavUser } from "@/components/nav-user";
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
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import Link from "next/link";

// This is sample data.
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
          url: "/tahun-semester",
        },
        {
          title: "Lab",
          url: "/lab",
        },
        {
          title: "Kalab",
          url: "/kalab",
        },
        {
          title: "MK Praktikum",
          url: "/mk-praktikum",
        },
        {
          title: "Dosen Pengampu",
          url: "/dosen-pengampu",
        },
        {
          title: "Inventaris Lab",
          url: "/inventaris-lab",
        },
        {
          title: "User Pengguna",
          url: "/user",
        },
        {
          title: "Honor Asisten",
          url: "/honor-asisten",
        },
      ],
    },
    {
      title: "Asisten",
      url: "/aslab",
      isActive: true,
      icon: IdCard,
      items: [
        {
          title: "Asisten Aktif",
          url: "/aslab",
        },
        // {
        //   title: "Asisten Nonaktif",
        //   url: "#",
        // },
      ],
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
    // {
    //   title: "Documentation",
    //   url: "#",
    //   icon: BookOpen,
    //   items: [
    //     {
    //       title: "Introduction",
    //       url: "#",
    //     },
    //     {
    //       title: "Get Started",
    //       url: "#",
    //     },
    //     {
    //       title: "Tutorials",
    //       url: "#",
    //     },
    //     {
    //       title: "Changelog",
    //       url: "#",
    //     },
    //   ],
    // },
    // {
    //   title: "Settings",
    //   url: "#",
    //   icon: Settings2,
    //   items: [
    //     {
    //       title: "General",
    //       url: "#",
    //     },
    //     {
    //       title: "Team",
    //       url: "#",
    //     },
    //     {
    //       title: "Billing",
    //       url: "#",
    //     },
    //     {
    //       title: "Limits",
    //       url: "#",
    //     },
    //   ],
    // },
  ],
  // projects: [
  //   {
  //     name: "Design Engineering",
  //     url: "#",
  //     icon: Frame,
  //   },
  //   {
  //     name: "Sales & Marketing",
  //     url: "#",
  //     icon: PieChart,
  //   },
  //   {
  //     name: "Travel",
  //     url: "#",
  //     icon: Map,
  //   },
  // ],
};

export function AppSidebar({ ...props }) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="h-16 border-b border-sidebar-border">
        {/* <NavUser user={data.user} /> */}
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
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
        <NavMain items={data.navMain} />
        {/* <NavProjects projects={data.projects} /> */}
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}
