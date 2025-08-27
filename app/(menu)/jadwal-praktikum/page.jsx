import { DataTable } from '@/components/data-table/data-table';
import { columns } from './_components/columns';
import { PlusCircle } from 'lucide-react';
import { findAllJadwal, findAllJadwalByAslab } from './actions';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { getServerSession } from '@/lib/auth-server';

const filters = [];

export default async function Page() {
  let data = [];
  try {
    const session = await getServerSession();
    console.log(session);
    const userRole = session?.user?.role;
    const aslabId = session?.user?.aslab_id;

    // Fetch data based on user role
    let jadwalData;
    if (userRole === 'admin') {
      jadwalData = await findAllJadwal(); // Admin sees all
    } else if (userRole === 'aslab' && aslabId) {
      jadwalData = await findAllJadwalByAslab(aslabId); // Aslab sees only their assigned schedules
    } else {
      jadwalData = []; // No access for other roles
    }

    data = jadwalData.map((item) => ({
      ...item,
      kelas: item.kelas,
      mata_kuliah: item.mataKuliah?.nama || '-',
      dosen: item.dosenPengampu?.nama || '-',
      jumlah_praktikan: item.jumlah_praktikan,
      hari: item.hari,
      waktu: item.waktu,
      lab: item.lab?.nama || '-',
      jenis_praktikan: item.jenis_praktikan,
      asisten: item.kelasAslab?.map((a) => a.aslab?.nama).filter(Boolean) || [],
    }));
  } catch (error) {}

  return (
    <DataTable
      toolbar={
        <Link href="/jadwal-praktikum/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Tambah Jadwal
          </Button>
        </Link>
      }
      viewOptions={true}
      globalSearch={true}
      filters={filters}
      pagination={true}
      columns={columns}
      data={data}
      emptyMessage="Data jadwal praktikum tidak ditemukan"
    />
  );
}
