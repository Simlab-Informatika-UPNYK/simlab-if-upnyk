"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { login } from "./actions";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { authClient } from "@/lib/auth-client";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPending(true);
    setError("");

    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    const result = await login(formData);

    setPending(false);

    if (result.success) {
      const user = (await authClient.getSession()).data.user;
      if (user.requiresPasswordChange === true) {
        // Redirect to change password page
        toast({
          title: "Login Berhasil",
          description: "Anda perlu mengubah password sebelum melanjutkan.",
        });
        router.replace("/change-password");
      } else {
        toast({
          title: "Berhasil Login",
          description: `Login berhasil, sedang mengalihkan...`,
        });
        router.replace("/dashboard");
      }
    } else {
      setError(result.error || "Login gagal. Cek kembali data Anda.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-6">
        <div className="grid gap-2">
          <Label htmlFor="username">NIM</Label>
          <Input
            name="username"
            id="username"
            placeholder="Masukkan NIM"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={error ? "border-red-500 focus-visible:ring-red-500" : ""}
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            name="password"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={error ? "border-red-500 focus-visible:ring-red-500" : ""}
            required
          />
        </div>
        {error && <div className="text-red-500 text-sm text-center">{error}</div>}
        <Button type="submit" className="w-full" disabled={pending}>
          {pending ? "Loading..." : "Login"}
        </Button>
      </div>
    </form>
  );
}
