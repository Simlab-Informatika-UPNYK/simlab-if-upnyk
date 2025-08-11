// import { redirect } from "next/navigation";

export default async function AuthLayout({ children }) {
  //   if (!session.username) {
  //     redirect("/");
  //   }

  return <>{children}</>;
}
