"use server";

import { db } from "@/db";
import { user, aslab } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { getServerSession } from "@/lib/auth-server";

// Get user profile data
export async function getProfile() {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      throw new Error("User not authenticated");
    }

    // Get user data with relations
    const userData = await db.query.user.findFirst({
      where: eq(user.id, session.user.id),
      columns: {
        id: true,
        name: true,
        email: true,
        username: true,
        displayUsername: true,
        nip: true,
        image: true,
        role: true,
        aslab_id: true,
      },
    });

    if (!userData) {
      throw new Error("User not found");
    }

    let aslabData = null;

    // Get aslab data if user is aslab
    if (userData.aslab_id) {
      aslabData = await db.query.aslab.findFirst({
        where: eq(aslab.id_aslab, userData.aslab_id),
      });
    }

    return {
      user: {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        username: userData.username,
        displayUsername: userData.displayUsername,
        nip: userData.nip,
        image: userData.image,
        role: userData.role,
      },
      aslab: aslabData,
    };
  } catch (error) {
    console.error("Error getting profile:", error);
    throw new Error("Failed to get profile data");
  }
}

// Update user profile
export async function updateProfile(data) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      throw new Error("User not authenticated");
    }

    await db.transaction(async (tx) => {
      // Update user table
      await tx
        .update(user)
        .set({
          name: data.user.name,
          email: data.user.email,
          username: data.user.username,
          displayUsername: data.user.displayUsername,
          nip: data.user.nip,
          image: data.user.image,
          updatedAt: new Date(),
        })
        .where(eq(user.id, session.user.id));

      // If user is aslab, update aslab table (only non-redundant fields)
      if (data.aslab && session.user.role === "aslab") {
        await tx
          .update(aslab)
          .set({
            nim: data.aslab.nim,
            no_hp: data.aslab.no_hp,
            angkatan: data.aslab.angkatan,
            program_studi: data.aslab.program_studi,
            status: data.aslab.status,
            profile_picture: data.aslab.profile_picture,
          })
          .where(eq(aslab.id_aslab, session.user.aslab_id));
      }
    });

    revalidatePath("/profile");
    return { success: true, message: "Profile updated successfully" };
  } catch (error) {
    console.error("Error updating profile:", error);
    throw new Error("Failed to update profile");
  }
}

// Check if username is available
export async function checkUsernameAvailability(username, currentUserId) {
  try {
    const existingUser = await db.query.user.findFirst({
      where: (user, { and, ne, eq }) => and(eq(user.username, username), ne(user.id, currentUserId)),
    });

    return !existingUser;
  } catch (error) {
    console.error("Error checking username:", error);
    return false;
  }
}

// Check if email is available
export async function checkEmailAvailability(email, currentUserId) {
  try {
    const existingUser = await db.query.user.findFirst({
      where: (user, { and, ne, eq }) => and(eq(user.email, email), ne(user.id, currentUserId)),
    });

    return !existingUser;
  } catch (error) {
    console.error("Error checking email:", error);
    return false;
  }
}
