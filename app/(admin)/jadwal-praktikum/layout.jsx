import React from "react";
import NavbarLayout from "@/components/navbar-layout";

const Layout = ({ children }) => {
  return (
    <NavbarLayout title="Jadwal Praktikum">
      <div className="relative w-full"
       style={{ maxWidth: "calc(100vw - var(--sidebar-width))" }}>
        <div className="">
          {children}
        </div>
      </div>
    </NavbarLayout>
  );
};

export default Layout;