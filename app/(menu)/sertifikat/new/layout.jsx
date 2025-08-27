"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";

const Layout = ({ children }) => {
  const pathname = usePathname();
  const parentPath = pathname.split('/').slice(0, -1).join('/');
  
  return (
    <>
      <div className="flex justify-between">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Pilih Mahasiswa untuk Mencetak Sertifikat
        </h2>
        <Link
          href={parentPath}
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
        >
          <X />
        </Link>
      </div>
      <div className="w-full">{children}</div>
    </>
  );
};

export default Layout;
