import { authClient } from "@/lib/auth-client";
import LogoutButton from "../(auth)/logout-button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
import ProtectedClientPage from "./client";

export default async function ProtectedPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  // console.log(session);
  return (
    <div>
      <h1>Protected Page</h1>
      <p>This is a dummy protected page.</p>
      <pre>{JSON.stringify(session, null, 2)}</pre>
      {session && <LogoutButton />}
      {!session && <Link href="/login">You are not Logged in</Link>}
      <ProtectedClientPage />
    </div>
  );
}
