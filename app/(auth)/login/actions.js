"use server";

import { LoginFormSchema } from "@/app/_lib/definitions";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function login(formData) {
  const username = formData.get("username");
  const password = formData.get("password");
  const validationResult = LoginFormSchema.safeParse({ username, password });
  if (!validationResult.success) {
    return { error: "Username dan password wajib diisi" };
  }
  try {
    const data = await auth.api.signInUsername({
      body: {
        rememberMe: true,
        username,
        password,
      },
      headers: await headers(),
    });
    if (data?.error) {
      return { error: data.error.message || "Username atau password salah" };
    }

    return { success: true, message: "Login successful" };
  } catch (error) {
    return { error: error.message || "Username atau password salah" };
  }
}
