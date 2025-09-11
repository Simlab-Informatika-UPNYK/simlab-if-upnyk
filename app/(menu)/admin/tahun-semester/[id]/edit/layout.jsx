"use client";

import BackButton from "@/components/back-button";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Layout = ({ children }) => {
  const router = useRouter();

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Edit</h1>
        <Link href='/admin/tahun-semester'>
          <Button variant="ghost" size="icon">
            <X className="h-4 w-4" />
          </Button>
        </Link>
      </div>
      {children}
    </div>
  );
};

export default Layout;
