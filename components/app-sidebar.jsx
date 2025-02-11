"use client"

import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  IdCard,
  LayoutDashboard,
  LayoutDashboardIcon,
  Map,
  MoreHorizontal,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

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
          url: "#",
        },
        {
          title: "Lab",
          url: "#",
        },
        {
          title: "Kalab",
          url: "#",
        },
        {
          title: "MK Praktikum",
          url: "#",
        },
        {
          title: "Dosen Pengampu",
          url: "#",
        },
        {
          title: "Inventaris Lab",
          url: "#",
        },
        {
          title: "User Pengguna",
          url: "#",
        },
        {
          title: "Honor Asisten",
          url: "#",
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
      title: "Documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Team",
          url: "#",
        },
        {
          title: "Billing",
          url: "#",
        },
        {
          title: "Limits",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
}

export function AppSidebar({
  ...props
}) {
  
  return (
    (<Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="h-16 border-b border-sidebar-border">
        <NavUser user={data.user} />
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>

      <SidebarRail />
    </Sidebar>)
  );
}
