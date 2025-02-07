'use client'

import { useActionState } from "react";
import { login } from "./actions";
import Link from "next/link";
import { Building } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(login, {});

  return (
    (<div
      className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
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
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </div>
            </div>
          </form>

        </div>
        <div className="text-center ">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="underline underline-offset-4">
            Register (sementara)
          </Link>
        </div>
      </div>
    </div>)
  );
}
