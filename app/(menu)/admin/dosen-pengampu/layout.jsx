import React from "react";
import NavbarLayout from "@/components/navbar-layout";

const Layout = ({ children }) => {
  return <NavbarLayout title="Dosen Pengampu">{children}</NavbarLayout>;
};

export default Layout;
