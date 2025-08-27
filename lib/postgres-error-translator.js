/**
 * Mapper untuk error code PostgreSQL ke pesan bahasa Indonesia
 */
const errorCodeMap = {
  // Constraint violation errors
  '23503': 'Data tidak dapat dihapus karena masih digunakan di tabel lain',
  '23505': 'Data dengan nilai yang sama sudah ada',
  '23502': 'Field wajib diisi tidak boleh kosong',
  '23514': 'Data tidak memenuhi constraint yang ditentukan',

  // Data type errors
  '22001': 'Data terlalu panjang untuk field ini',
  '22P02': 'Format data tidak valid',
  '42804': 'Tipe data tidak sesuai',

  // Syntax and parsing errors
  '42601': 'Syntax error dalam query',
  '42703': 'Kolom tidak ditemukan',
  '42883': 'Fungsi tidak ditemukan',
  '42P01': 'Tabel tidak ditemukan',
  '42P02': 'Parameter tidak ditemukan',

  // Connection and system errors
  '08000': 'Koneksi database bermasalah',
  '08003': 'Koneksi database terputus',
  '08006': 'Koneksi database gagal',
  '08001': 'Tidak dapat membuat koneksi ke database',

  // Transaction errors
  '40001': 'Deadlock terdeteksi',
  '40P01': 'Deadlock terdeteksi',
  '25P02': 'Transaksi sedang dalam state failed',

  // Authorization errors
  '42501': 'Tidak memiliki izin untuk operasi ini',
  '42809': 'Tidak memiliki hak akses yang cukup',

  // Default error
  'default': 'Terjadi kesalahan',
};

/**
 * Mengekstrak error code dari berbagai struktur error object
 */
function extractErrorCode(error) {
  // Jika error memiliki cause (seperti pada drizzle error)
  if (error.cause && error.cause.code) {
    return error.cause.code;
  }

  // Jika error langsung memiliki code
  if (error.code) {
    return error.code;
  }

  return null;
}

/**
 * Mentranslate error PostgreSQL ke bahasa Indonesia
 * @param {Error|object} error - Error object dari database operation
 * @returns {string} Pesan error dalam bahasa Indonesia
 */
export function translatePostgresError(error) {
  const errorCode = extractErrorCode(error);

  if (errorCode && errorCodeMap[errorCode]) {
    return errorCodeMap[errorCode];
  }

  return error.message || 'Terjadi kesalahan';
}

export default translatePostgresError;
