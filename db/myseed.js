import { db } from './index.js';
import { aslab } from './schema.js';

async function seedAslab() {
  await db.insert(aslab).values([
    {
      nama: 'John Doe',
      nim: '1234567890',
      email: 'john.doe@example.com',
      no_hp: '081234567890',
      angkatan: '2022',
      program_studi: 'Informatika',
      status: 'Aktif',
      profile_picture: ''
    },
    {
      nama: 'Jane Smith',
      nim: '0987654321',
      email: 'jane.smith@example.com',
      no_hp: '082345678901',
      angkatan: '2021',
      program_studi: 'Sistem Informasi',
      status: 'Aktif',
      profile_picture: ''
    },
    {
      nama: 'Bob Johnson',
      nim: '1122334455',
      email: 'bob.johnson@example.com',
      no_hp: '083456789012',
      angkatan: '2023',
      program_studi: 'Teknik Komputer',
      status: 'Tidak Aktif',
      profile_picture: ''
    }
  ]);

  console.log('Seed data aslab berhasil ditambahkan');
}

seedAslab().catch((err) => {
  console.error('Error seeding data:', err);
  process.exit(1);
});
