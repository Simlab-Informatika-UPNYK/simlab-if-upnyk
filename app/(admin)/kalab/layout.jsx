import React from "react";
import NavbarLayout from "@/components/navbar-layout";

const Layout = ({ children }) => {
  return <NavbarLayout title="Data Kepala Lab">{children}</NavbarLayout>;
};

export default Layout;
