'use client'

import MyTable from '@/components/table1';

const data = [
  { nama: 'John Doe', nim: '12345', email: 'john.doe@example.com', no_hp: '081234567890', angkatan: 2020, jurusan: 'Teknik Informatika', status: 'Aktif' },
  { nama: 'Jane Doe', nim: '67890', email: 'jane.doe@example.com', no_hp: '081234567891', angkatan: 2021, jurusan: 'Sistem Informasi', status: 'Tidak Aktif' },
  // ... data lainnya
];

const MyPage = () => {
  return (
    <div>
      <h1>Daftar Mahasiswa</h1>
      <MyTable data={data} />
    </div>
  );
};

export default MyPage;