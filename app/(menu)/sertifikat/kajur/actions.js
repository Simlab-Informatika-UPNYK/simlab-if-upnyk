"use server";

import { db } from "@/db";
import { kajur } from "@/db/schema";
import { eq } from "drizzle-orm";
import { translatePostgresError } from "@/lib/postgres-error-translator";
import { requireAdmin } from "@/lib/admin-auth";
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { revalidatePath } from "next/cache";
import { cleanupOldSignatureFiles } from "@/lib/file-cleanup";

export const getKajurPublic = async () => {
  try {
    const result = await db.select().from(kajur).limit(1);
    return result[0] || null;
  } catch (error) {
    throw error;
  }
};

export const updateKajur = async (payload) => {
  // Only admins may call this server action
  await requireAdmin();

  try {
    const {
      nama,
      nip,
      tanda_tangan,
      signature_top,
      signature_left,
      signature_height,
      signature_width
    } = payload || {};

    if (!nama || !nama.trim()) {
      throw new Error("Nama kajur wajib diisi");
    }

    if (!nip || !nip.trim()) {
      throw new Error("NIP kajur wajib diisi");
    }

    // check existing
    const existing = (await db.select().from(kajur).limit(1))[0] || null;

    const updateData = {
      nama: nama.trim(),
      nip: nip.trim(),
      tanda_tangan: tanda_tangan || existing?.tanda_tangan,
      updated_at: new Date(),
    };

    // Tambahkan data posisi tanda tangan jika ada
    if (signature_top !== undefined) updateData.signature_top = signature_top;
    if (signature_left !== undefined) updateData.signature_left = signature_left;
    if (signature_height !== undefined) updateData.signature_height = signature_height;
    if (signature_width !== undefined) updateData.signature_width = signature_width;

    if (existing) {
      const result = await db
        .update(kajur)
        .set(updateData)
        .where(eq(kajur.id, existing.id))
        .returning();

      return { success: true, data: result[0] };
    }

    // Untuk insert baru, tambahkan nilai default untuk posisi
    const insertData = {
      ...updateData,
      signature_top: signature_top || 0,
      signature_left: signature_left || 0,
      signature_height: signature_height || 100,
      signature_width: signature_width || 200,
      created_at: new Date(),
    };

    const insertResult = await db
      .insert(kajur)
      .values(insertData)
      .returning();

    return { success: true, data: insertResult[0] };
  } catch (error) {
    const message = translatePostgresError(error);
    throw new Error(message);
  }
};

// Server action that receives FormData (from a <form action={updateKajurFromForm}>)
export const updateKajurFromForm = async (prevState, formData) => {
  await requireAdmin();

  try {
    const nama = formData.get("nama")?.toString() || "";
    const nip = formData.get("nip")?.toString() || "";
    const file = formData.get("signature");
    const signature_top = parseInt(formData.get("signature_top")?.toString() || "0");
    const signature_left = parseInt(formData.get("signature_left")?.toString() || "0");
    const signature_height = parseInt(formData.get("signature_height")?.toString() || "100");
    const signature_width = parseInt(formData.get("signature_width")?.toString() || "200");

    if (!nama || !nama.trim()) {
      throw new Error("Nama kajur wajib diisi");
    }

    if (!nip || !nip.trim()) {
      throw new Error("NIP kajur wajib diisi");
    }

    let tanda_tangan_url = null;

    if (file && file.size && file.type) {
      // Basic server-side validation
      const allowed = ["image/png", "image/jpeg", "image/jpg"];
      if (!allowed.includes(file.type)) {
        throw new Error("Format file tidak didukung. Gunakan PNG atau JPG");
      }

      const maxSize = 2 * 1024 * 1024;
      if (file.size > maxSize) {
        throw new Error("Ukuran file terlalu besar. Maksimal 2MB");
      }

      // Save file directly on server to avoid internal HTTP request that may be redirected by middleware
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Map MIME types to safe extensions
      const mimeToExt = {
        'image/png': 'png',
        'image/jpeg': 'jpg',
        'image/jpg': 'jpg',
      };
      const ext = mimeToExt[file.type] || 'png';
      const filename = `signature_kajur.${ext}`;
      const filepath = join(process.cwd(), 'public', 'signatures', filename);

      await writeFile(filepath, buffer);

      tanda_tangan_url = `/signatures/${filename}`;
    }

    // Reuse updateKajur logic (without repeating requireAdmin)
    const payload = {
      nama,
      nip,
      tanda_tangan: tanda_tangan_url,
      signature_top,
      signature_left,
      signature_height,
      signature_width
    };
    const result = await updateKajur(payload);

    // Cleanup file tanda tangan lama
    if (tanda_tangan_url) {
      await cleanupOldSignatureFiles(tanda_tangan_url);
    }

    revalidatePath("/sertifikat/kajur");

    return {
      status: "success",
      message: "Data kepala jurusan dan posisi tanda tangan berhasil diperbarui.",
      data: result?.data || null,
    };
  } catch (err) {
    const message = translatePostgresError(err);
    return {
      status: "error",
      message,
      data: prevState?.data ?? null,
    };
  }
};

export const updateSignaturePosition = async (payload) => {
  await requireAdmin();

  try {
    const {
      signature_top,
      signature_left,
      signature_height,
      signature_width
    } = payload;

    // Validasi data
    if (
      signature_top === undefined ||
      signature_left === undefined ||
      signature_height === undefined ||
      signature_width === undefined
    ) {
      throw new Error("Semua field posisi tanda tangan harus diisi");
    }

    // Update posisi tanda tangan untuk kajur (asumsi hanya ada 1 kajur)
    const existing = (await db.select().from(kajur).limit(1))[0] || null;

    if (!existing) {
      throw new Error("Data kajur tidak ditemukan");
    }

    const result = await db
      .update(kajur)
      .set({
        signature_top,
        signature_left,
        signature_height,
        signature_width,
        updated_at: new Date()
      })
      .where(eq(kajur.id, existing.id))
      .returning();

    revalidatePath("/sertifikat/kajur");

    return {
      success: true,
      data: result[0]
    };

  } catch (error) {
    const message = translatePostgresError(error);
    throw new Error(message);
  }
};
