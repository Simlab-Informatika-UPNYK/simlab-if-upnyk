import { Building } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Link from "next/link"

export function RegisterForm({
  state,
  formAction,
  pending,
  className,
  ...props
}) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <form action={formAction}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-xl font-bold">SIMLAB</h1>
          </div>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="username">NIM</Label>
              <Input
                name="username"
                id="username"
                placeholder="Masukkan NIM"
                defaultValue={state?.errors ? state.user.username : ''}
                className={state?.errors?.username ? 'border-red-500 focus-visible:ring-red-500' : ''}
              />
              {state?.errors?.username && (
                <p className="text-red-500">{state.errors.username}</p>
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
                <ul className="text-red-500">
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
                <p className="text-red-500">{state.errors.confirmPassword}</p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="role">Role</Label>
              <Select name="role" defaultValue="aslab">
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="aslab">Asisten Praktikum</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {state?.errors?.general && (
              <div className="text-red-500">
                {state.errors.general}
              </div>
            )}
            <Button type="submit" className="w-full" disabled={pending}>
              {pending ? "Processing..." : "Register"}
            </Button>
          </div>
        </div>
      </form>
      <div className="text-center">
        Have an account?{" "}
        <Link href="/login" className="underline underline-offset-4">
          Login
        </Link>
      </div>
    </div>
  );
}
