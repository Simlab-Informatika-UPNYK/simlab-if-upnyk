import Link from "next/link";
import { Building } from "lucide-react";
import LoginForm from "./login-form";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Button variant="outline">
          <Link href="/" className="flex gap-2 justify-center items-center" >
            <ChevronLeft />
            <span>
              Kembali
            </span>
          </Link>
        </Button>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-xl font-bold">SIMLAB</h1>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
