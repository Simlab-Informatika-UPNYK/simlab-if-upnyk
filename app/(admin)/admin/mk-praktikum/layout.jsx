import React from "react";
import NavbarLayout from "@/components/navbar-layout";

const Layout = ({ children }) => {
  return <NavbarLayout title="Mata Kuliah">{children}</NavbarLayout>;
};

export default Layout;
