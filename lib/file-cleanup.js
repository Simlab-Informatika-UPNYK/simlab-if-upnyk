import { unlink } from 'fs/promises';
import { join } from 'path';

/**
 * Menghapus file tanda tangan lama dari folder signatures
 * Dengan nama file konsisten signature_kajur, fungsi ini akan menghapus file lama
 * @param {string} currentSignaturePath - Path tanda tangan yang sedang digunakan
 * @returns {Promise<void>}
 */
export const cleanupOldSignatureFiles = async (currentSignaturePath = null) => {
  try {
    const signaturesDir = join(process.cwd(), 'public', 'signatures');

    // Import fs untuk membaca direktori
    const { readdir } = await import('fs/promises');

    // Baca semua file di folder signatures
    const files = await readdir(signaturesDir);

    // Filter hanya file signature_kajur dengan berbagai ekstensi
    const signatureFiles = files.filter(file => file.startsWith('signature_kajur.'));

    // Dapatkan nama file dari path yang sedang digunakan
    const currentFilename = currentSignaturePath ? currentSignaturePath.split('/').pop() : null;

    // Hapus semua file signature_kajur kecuali yang sedang digunakan
    for (const file of signatureFiles) {
      if (file !== currentFilename) {
        const filePath = join(signaturesDir, file);
        try {
          await unlink(filePath);
          console.log(`File tanda tangan lama dihapus: ${file}`);
        } catch (error) {
          console.warn(`Gagal menghapus file ${file}:`, error.message);
        }
      }
    }

  } catch (error) {
    console.error('Error dalam cleanup file tanda tangan:', error);
    // Jangan throw error agar proses utama tidak terganggu
  }
};