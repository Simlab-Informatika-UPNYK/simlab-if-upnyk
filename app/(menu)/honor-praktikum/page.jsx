import { getTahunSemester } from './actions';
import { columns } from './_components/columns';
import { DataTable } from '@/components/data-table/data-table';
import { getServerSession } from '@/lib/auth-server';
import { getCurrentAslabNim } from './[id]/actions';
import { aslabColumns } from './_components/aslab-columns';
import HonorDetail from './honor-detail';

export default async function HonorPraktikumPage() {
  let tahunSemester = [];
  const {
    user: { role, aslab_id },
  } = await getServerSession();

  tahunSemester = await getTahunSemester();
  const nim = await getCurrentAslabNim(aslab_id);

  if (role === 'admin')
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Honor Praktikum</h1>
          <p className="text-muted-foreground">
            Pilih tahun semester untuk melihat detail honor
          </p>
        </div>

        {tahunSemester.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              Belum ada tahun semester yang tersedia
            </p>
          </div>
        ) : (
          // gunakan DataTable untuk menampilkan daftar tahun/semester
          <div className="max-w-screen-xl mx-auto">
            <DataTable
              columns={role === 'admin' ? columns : aslabColumns}
              data={tahunSemester}
              pagination={true}
              // opsional: jika DataTable butuh prop tambahan, tambahkan di sini
            />
          </div>
        )}
      </div>
    );
  return <HonorDetail tahunSemester={tahunSemester} nim={nim} />;
}
