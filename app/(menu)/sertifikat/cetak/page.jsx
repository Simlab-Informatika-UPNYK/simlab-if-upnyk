import { DataTable } from '@/components/data-table/data-table';
import { columns as allAslabColumns } from '../_components/columns';
import { getAllAslabWithCourses } from '../actions';
import { getServerSession } from '@/lib/auth-server';
const data = await getAllAslabWithCourses();

export default CetakPage = async () => {
  const session = await getServerSession();

  const allowedRoles = ['admin'];
  if (!allowedRoles.includes(session.user.role)) {
    redirect('/sertifikat');
  }

  return (
    <DataTable
      viewOptions={true}
      globalSearch={true}
      pagination={true}
      columns={allAslabColumns}
      data={data}
    />
  );
};
