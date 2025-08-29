import { getTahunSemester } from './actions';
import { getServerSession } from '@/lib/auth-server';
import HonorClient from './honor-client';
import HonorDetail from './honor-detail';

export default async function HonorPraktikumPage() {
  let tahunSemester = [];
  const session = await getServerSession();

  if (!session) {
    return <div>Silakan login terlebih dahulu</div>;
  }

  const { role, aslab_id } = session.user;

  tahunSemester = await getTahunSemester();

  return (
    <>
      {role === 'admin' ? (
        <HonorClient
          initialTahunSemester={tahunSemester}
        />
      ) : (
        <HonorDetail tahunSemester={tahunSemester} />
      )}
    </>
  );
}
