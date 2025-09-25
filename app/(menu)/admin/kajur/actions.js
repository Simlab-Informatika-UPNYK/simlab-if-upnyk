"use server";

import { db } from "@/db";
import { kajur } from "@/db/schema";
import { eq } from "drizzle-orm";
import { translatePostgresError } from "@/lib/postgres-error-translator";
import { requireAdmin } from "@/lib/admin-auth";
import { cleanupOldSignatureFiles } from "@/lib/file-cleanup";

export const getKajur = async () => {
  await requireAdmin();
  try {
    const result = await db.select().from(kajur).limit(1);
    return result[0] || null;
  } catch (error) {
    const errorMessage = translatePostgresError(error);
    throw new Error(errorMessage);
  }
};

export const updateKajur = async (formData) => {
  await requireAdmin();
  try {
    const { nama, nip, tanda_tangan } = formData;

    // Validasi input
    if (!nama || !nama.trim()) {
      throw new Error("Nama kajur wajib diisi");
    }

    if (!nip || !nip.trim()) {
      throw new Error("NIP kajur wajib diisi");
    }

    // Cek apakah data kajur sudah ada
    const existingKajur = await getKajur();

    if (existingKajur) {
      // Update data yang sudah ada
      const result = await db
        .update(kajur)
        .set({
          nama: nama.trim(),
          nip: nip.trim(),
          tanda_tangan: tanda_tangan || existingKajur.tanda_tangan,
          updated_at: new Date(),
        })
        .where(eq(kajur.id, existingKajur.id))
        .returning();

      return { success: true, data: result[0] };
    } else {
      // Buat data baru jika belum ada
      const result = await db
        .insert(kajur)
        .values({
          nama: nama.trim(),
          nip: nip.trim(),
          tanda_tangan: tanda_tangan || null,
          created_at: new Date(),
          updated_at: new Date(),
        })
        .returning();

      return { success: true, data: result[0] };
    }
  } catch (error) {
    const errorMessage = translatePostgresError(error);
    throw new Error(errorMessage);
  }
};

export const uploadSignature = async (formData) => {
  await requireAdmin();
  try {
    const signatureFile = formData.get("signature");
    
    if (!signatureFile) {
      throw new Error("File tanda tangan wajib diupload");
    }

    // Validasi file type
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!allowedTypes.includes(signatureFile.type)) {
      throw new Error("Format file tidak didukung. Gunakan JPG, JPEG, atau PNG");
    }

    // Validasi file size (max 2MB)
    const maxSize = 2 * 1024 * 1024; // 2MB
    if (signatureFile.size > maxSize) {
      throw new Error("Ukuran file terlalu besar. Maksimal 2MB");
    }

    // Upload file ke API endpoint
    const uploadFormData = new FormData();
    uploadFormData.append("file", signatureFile);

    const response = await fetch(`${process.env.NEXTAUTH_URL}/api/upload/signature`, {
      method: "POST",
      body: uploadFormData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Gagal mengupload file");
    }

    const uploadResult = await response.json();

    if (!uploadResult.success) {
      throw new Error(uploadResult.error || "Gagal mengupload file");
    }

    // Update atau create data kajur dengan path signature
    const existingKajur = await getKajur();
    
    if (existingKajur) {
      const result = await db
        .update(kajur)
        .set({
          tanda_tangan: uploadResult.url,
          updated_at: new Date(),
        })
        .where(eq(kajur.id, existingKajur.id))
        .returning();

      // Cleanup file tanda tangan lama
      await cleanupOldSignatureFiles(uploadResult.url);

      return { success: true, data: result[0], filePath: uploadResult.url };
    } else {
      const result = await db
        .insert(kajur)
        .values({
          nama: "Kepala Jurusan",
          nip: "",
          tanda_tangan: uploadResult.url,
          created_at: new Date(),
          updated_at: new Date(),
        })
        .returning();

      // Cleanup file tanda tangan lama
      await cleanupOldSignatureFiles(uploadResult.url);

      return { success: true, data: result[0], filePath: uploadResult.url };
    }
  } catch (error) {
    const errorMessage = translatePostgresError(error);
    throw new Error(errorMessage);
  }
};
