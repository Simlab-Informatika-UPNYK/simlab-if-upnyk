import NavbarLayout from "@/components/navbar-layout";

export default async function Page({ children }) {
  return <NavbarLayout title="Pengumuman">{children}</NavbarLayout>;
}
