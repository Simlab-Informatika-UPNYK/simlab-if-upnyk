"use server";

import { db } from "@/db";
import { user } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getServerSession } from "@/lib/auth-server";
import { headers } from "next/headers";

export async function changeFirstTimePassword(data) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      throw new Error("User not authenticated");
    }

    const { auth } = await import("@/lib/auth");

    // Change password using better-auth
    await auth.api.changePassword({
      body: {
        newPassword: data.newPassword,
        currentPassword: data.currentPassword,
      },
      headers: await headers(),
    });

    // Update requiresPasswordChange to false
    await db
      .update(user)
      .set({ 
        requiresPasswordChange: false,
        updatedAt: new Date()
      })
      .where(eq(user.id, session.user.id));

    return { success: true, message: "Password berhasil diubah. Anda sekarang dapat mengakses aplikasi." };
  } catch (error) {
    console.error("Error changing first time password:", error);
    
    // Handle specific error cases
    if (error.message?.includes("current password")) {
      throw new Error("Password default salah. Pastikan Anda menggunakan password default yang benar (NIM + 'aslab').");
    }
    
    throw new Error(error.message || "Gagal mengubah password");
  }
}

export async function getCurrentUserRequiresPasswordChange() {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return { requiresPasswordChange: false };
    }

    const userData = await db.query.user.findFirst({
      where: eq(user.id, session.user.id),
      columns: {
        requiresPasswordChange: true,
      },
    });

    return { requiresPasswordChange: userData?.requiresPasswordChange || false };
  } catch (error) {
    console.error("Error getting user password change status:", error);
    return { requiresPasswordChange: false };
  }
}
