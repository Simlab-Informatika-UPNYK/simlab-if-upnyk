import { FormEdit } from './form-edit';
import { getAslabByNim } from '../../actions';
import { withAdminAuth } from '@/components/hoc/with-admin-auth';
import { getServerSession } from '@/lib/auth-server';
import { redirect } from 'next/navigation';

export default async function Page({ params }) {
  const nim = (await params).id;
  const session = await getServerSession();

  if (session.user.role === 'aslab') {
    redirect('/aslab/' + nim);
  }

  const data = await getAslabByNim(nim);

  if (!data) {
    return <div>Aslab not found</div>;
  }

  return <FormEdit data={data} />;
}
