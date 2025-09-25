import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { cleanupOldSignatureFiles } from '@/lib/file-cleanup';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    
    if (!file) {
      return NextResponse.json(
        { error: 'File tidak ditemukan' },
        { status: 400 }
      );
    }

    // Validasi file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Format file tidak didukung. Gunakan JPG, JPEG, atau PNG' },
        { status: 400 }
      );
    }

    // Validasi file size (max 2MB)
    const maxSize = 2 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'Ukuran file terlalu besar. Maksimal 2MB' },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate consistent filename
    const extension = file.type.split('/')[1];
    const filename = `signature_kajur.${extension}`;
    const filepath = join(process.cwd(), 'public', 'signatures', filename);

    // Save file
    await writeFile(filepath, buffer);

    const publicUrl = `/signatures/${filename}`;

    // Cleanup file tanda tangan lama
    await cleanupOldSignatureFiles(publicUrl);

    return NextResponse.json({
      success: true,
      filename,
      url: publicUrl
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat mengupload file' },
      { status: 500 }
    );
  }
}
