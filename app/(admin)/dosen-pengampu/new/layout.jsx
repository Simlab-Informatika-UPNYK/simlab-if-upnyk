"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeft, X } from "lucide-react";

const Layout = ({ children }) => {
  const router = useRouter();
  return (
    <div className=" p-4">
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Tambah Data Dosen Pengampu
        </h2>
        <Button
          variant="outline"
          onClick={() => {
            router.back();
          }}
        >
          <X />
        </Button>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default Layout;
