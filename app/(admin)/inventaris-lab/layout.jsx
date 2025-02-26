import React from "react";
import NavbarLayout from "@/components/navbar-layout";

const Layout = ({ children }) => {
  return <NavbarLayout title="Inventaris Lab">{children}</NavbarLayout>;
};

export default Layout;
