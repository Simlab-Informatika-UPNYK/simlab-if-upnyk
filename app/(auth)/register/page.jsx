import { Building } from "lucide-react";
import Link from "next/link";
import { register } from "./actions";
import { redirect } from "next/navigation";

import RegisterForm from "./register-form";

export default function RegisterPage() {

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <a
              href="#"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <div className="flex h-24 w-24 items-center justify-center rounded-md">
                <Building className="size-24" />
              </div>
              <span className="sr-only">Acme Inc.</span>
            </a>
            <h1 className="text-xl font-bold">Welcome to Acme Inc.</h1>
            <div className="text-center">
              Have an account?{" "}
              <Link href="/login" className="underline underline-offset-4">
                Login
              </Link>
            </div>
          </div>
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
