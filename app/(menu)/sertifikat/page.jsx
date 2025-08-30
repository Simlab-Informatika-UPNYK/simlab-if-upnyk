import AdminCertificateView from './_components/admin-certificate-view';
import AslabCertificateView from './_components/aslab-certificate-view';
import { getAllAslabWithCourses } from './actions';
import Link from 'next/link';
import { getServerSession } from '@/lib/auth-server';

export default async function CertificatePage() {
  const { user } = await getServerSession();

  const data = await getAllAslabWithCourses();

  if (user?.role === 'admin') {
    return (
      <>
        <AdminCertificateView />
        <Link className="text-blue-500" href={'/sertifikat/cetak'}>
          Cetak Sertifikat
        </Link>
      </>
    );
  }

  if (user?.role === 'aslab') {
    return <AslabCertificateView aslabId={user.aslab_id} />;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="text-center p-6">
        <h1 className="text-2xl font-bold mb-4">Akses Ditolak</h1>
        <p className="text-gray-600">
          Anda tidak memiliki izin untuk mengakses halaman ini.
        </p>
      </div>
    </div>
  );
}
