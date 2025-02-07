import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-blue-100 to-white p-8">
      <main className="flex flex-col items-center gap-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800">
          Welcome to SimLab IF UPNYK
        </h1>
        <p className="text-lg text-gray-600">
          Laboratory Information System for Informatics Engineering
        </p>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/login"
          >
            <Button >
              Login
            </Button>
          </Link>
          <Link
            href="/dashboard"
          >
            <Button variant="outline">
              Dashboard
            </Button>
          </Link>
          <Link
            href="/register"
          >
            <Button variant="outline">
              Register (Sementara)
            </Button>
          </Link>
        </div>
      </main>

      <footer className="mt-16 text-center text-sm text-gray-500">
        <p>© 2024 SimLab IF UPNYK. All rights reserved.</p>
      </footer>
    </div>
  );
}
