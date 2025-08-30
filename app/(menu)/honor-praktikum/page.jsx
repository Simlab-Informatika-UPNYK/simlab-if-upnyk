import { getCurrentAslabNim, getTahunSemester } from './actions';
import { getServerSession } from '@/lib/auth-server';
import AdminHonorPage from './admin-honor';
import AslabHonorPage from './aslab-honor';
import { getOneHonor } from './[...id]/actions';

export default async function HonorPraktikumPage() {
  const session = await getServerSession();

  const { user } = session;
  let tahunSemester = await getTahunSemester();
  const data = await getOneHonor(user.username, tahunSemester[0].slug);

  return user.role === 'admin' ? (
    <AdminHonorPage initialTahunSemester={tahunSemester} />
  ) : (
    // <pre>{JSON.stringify(data, null, 2)}</pre>
    <AslabHonorPage initialNim={user.username} tahunSemester={tahunSemester} />
  );
}
