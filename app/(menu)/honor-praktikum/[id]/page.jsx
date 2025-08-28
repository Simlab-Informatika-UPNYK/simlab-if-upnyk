import { getAllData, getAllDataByAslab, getCurrentAslabNim } from './actions';
import { columns } from './_components/columns';
import { DataTable } from './_components/data-table';
import { getServerSession } from '@/lib/auth-server';
import { redirect } from 'next/navigation';

export default async function HonorPraktikumPage({ params }) {
  const currentPeriod = params.id;
  const { user } = await getServerSession();
  let data = [];
  if (user.role === 'admin') {
    data = await getAllData(currentPeriod);
  } else {
    const nim = await getCurrentAslabNim(user.aslab_id);
    redirect(`/honor-praktikum/${currentPeriod}/${nim}`);
  }

  return (
    <div className="max-w-screen-xl mx-auto">
      <DataTable
        columns={columns}
        data={data.map((item) => ({ ...item, currentPeriod }))}
        isLoading={false}
        currentPeriod={currentPeriod}
      />
    </div>
  );
}
