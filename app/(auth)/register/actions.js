"use server";

import { auth } from "@/lib/auth";

export async function register(formData) {
  const password = formData.get("password");
  const username = formData.get("username");
  const email = formData.get("email");
  const name = username;

  try {
    const data = await auth.api.signUpEmail({
      body: {
        email,
        name,
        password,
        username,
      },
    });

    if (data?.error) {
      return { error: data.error.message || "Registration failed" };
    }

    return { success: true, message: "Registration successful" };
  } catch (error) {
    return { error: error.message || "Registration failed" };
  }
}
