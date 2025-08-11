dokumentasi penulisan dari folder /admin/tahun-semester

Berikut catatan pengeditan dokumen untuk memandu pengembang dalam membuat struktur yang konsisten seperti folder tahun-semester:

1. Struktur Folder:
- [id]/ (untuk edit/view detail)
- _components/ (komponen khusus halaman)
- actions.js (server actions)
- layout.jsx (layout spesifik halaman) 
- loading.jsx (loading state)
- new/ (halaman create)
- page.jsx (halaman utama)

2. File Penting dan Isinya:

a) actions.js:
- Gunakan drizzle-orm untuk query
- Gunakan untuk operasi database umum
- Pisahkan fungsi create/update/delete
- Gunakan transaction untuk operasi kompleks
- Handle error dengan pesan jelas
- Berisi fungsi reusable untuk query database
- Contoh: findOneBySlug, findAllOrdered, checkExists

c) layout.jsx:
- Layout dasar dengan NavbarLayout
- Terima children prop
- Tambahkan title yang sesuai

d) loading.jsx:
- Gunakan skeleton loader
- Animasi pulse untuk feedback visual
- Sesuaikan dengan struktur halaman asli

e) page.jsx:
- DataTable untuk menampilkan data
- Tambahkan toolbar dengan button create
- Gunakan columns dari _components
- Fetch data menggunakan getTahunSemester

f) _components:
- form-tahun-semester.jsx (form reusable)
- form-schema.js (validasi zod)
- columns.jsx (kolom datatable)
- action-cell.jsx (aksi row table)

1. Best Practices:
- Pisahkan logic dan UI
- Gunakan komponen reusable
- Error handling yang jelas
- Loading state informatif
- Type safety dengan zod
- Konsistensi struktur folder

1. Contoh Implementasi Cepat:

Untuk membuat halaman baru dengan struktur sama:
1. Buat folder dengan struktur di atas
2. Copy template actions.js dan sesuaikan modelnya dengan drizle
3. Buat komponen form di _components
4. Buat page.jsx dengan DataTable
5. Tambahkan loading state
6. Sesuaikan layout jika perlu

Format ini memastikan konsistensi dan memudahkan maintenance.

jika ada link redirect atau Link, misalnya sebelumnya /mk-praktikum, ubah menjadi /admin/mk-praktikum