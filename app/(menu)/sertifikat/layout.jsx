import React from "react";
import NavbarLayout from "@/components/navbar-layout";

const Layout = ({ children }) => {
  return (
    <NavbarLayout title="Honor Asisten">
      <div className="max-w-screen-xl mx-auto w-full">{children}</div>
    </NavbarLayout>
  );
};

export default Layout;
