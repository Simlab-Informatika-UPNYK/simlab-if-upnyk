import React from "react";
import NavbarLayout from "@/components/navbar-layout";

const Layout = ({ children }) => {
  return (
    <NavbarLayout title="Jadwal Praktikum">
      <div className="p-6">{children}</div>
    </NavbarLayout>
  );
};

export default Layout;
