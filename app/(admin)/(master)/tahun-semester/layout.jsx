import NavbarLayout from "@/components/navbar-layout";

export default async function Page({ children }) {
  return <NavbarLayout title="Tahun Semester">{children}</NavbarLayout>;
}
