'use client'

import { signup } from "./actions";
import { useActionState } from "react";
import { Building } from "lucide-react";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(signup, {});

  console.log(state)

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <div className="w-full max-w-sm">
        {state?.success ? (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col items-center gap-2">
              <a href="#" className="flex flex-col items-center gap-2 font-medium">
                <div className="flex h-24 w-24 items-center justify-center rounded-md">
                  <Building className="size-24" />
                </div>
                <span className="sr-only">Acme Inc.</span>
              </a>

            </div>
            <div className="flex flex-col gap-6">

              <p className="text-center">Registrasi berhasil! Silakan periksa email Anda untuk verifikasi akun.</p>


              <Link href="/login">
                <Button className="w-full font-bold">
                  Kembali ke Halaman Login
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <RegisterForm state={state} formAction={formAction} pending={pending} />
        )}
      </div>
    </div>
  );
}



function RegisterForm({ state, formAction, pending }) {
  return (<div className="flex flex-col gap-6">
    <form action={formAction}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center gap-2">
          <a href="#" className="flex flex-col items-center gap-2 font-medium">
            <div className="flex h-24 w-24 items-center justify-center rounded-md">
              <Building className="size-24" />
            </div>
            <span className="sr-only">Acme Inc.</span>
          </a>
          <h1 className="text-xl font-bold">Welcome to Acme Inc.</h1>
          <div className="text-center ">
            Have an account?{" "}
            <Link href="/login" className="underline underline-offset-4">
              Login
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              name="email"
              id="email"
              placeholder="m@example.com"
              defaultValue={state?.errors ? state.user.email : ''}
              className={state?.errors?.email ? 'border-red-500 focus-visible:ring-red-500' : ''}
            />
            {state?.errors?.email && (
              <p className=" text-red-500">{state.errors.email}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              name="password"
              id="password"
              type="password"
              defaultValue={state?.errors ? state.user.password : ''}
              className={state?.errors?.password ? 'border-red-500 focus-visible:ring-red-500' : ''}
            />
            {state?.errors?.password && (
              <ul className=" text-red-500">
                {Array.isArray(state.errors.password)
                  ? state.errors.password.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))
                  : <li>{state.errors.password}</li>
                }
              </ul>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirm-password">Confirm Password</Label>
            <Input
              name="confirm-password"
              id="confirm-password"
              type="password"
              defaultValue={state?.errors ? state.user.confirmPassword : ''}
              className={state?.errors?.confirmPassword ? 'border-red-500 focus-visible:ring-red-500' : ''}
            />
            {state?.errors?.confirmPassword && (
              <ul className=" text-red-500">
                {Array.isArray(state.errors.confirmPassword)
                  ? state.errors.confirmPassword.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))
                  : <li>{state.errors.confirmPassword}</li>
                }
              </ul>
            )}
          </div>
          {state?.errors?.general && (
            <div className=" text-red-500">
              {state.errors.general}
            </div>
          )}

          <Button type="submit" className="w-full">
            Register
          </Button>
        </div>
      </div>
    </form>

  </div>)
}