import { getOneHonor } from './actions.js';
import { HonorProvider } from './_components/honor-context.jsx';
import DetailPageContent from './detail-page-content.jsx';
import { getServerSession } from '@/lib/auth-server.js';
import { redirect } from 'next/navigation.js';

export default async function DetailPage({ params }) {
  const [periodeSlug, nim] = (await params).id;
  const session = await getServerSession();

  if (session.user.role !== 'admin' || !periodeSlug || !nim) {
    redirect('/honor-praktikum');
  }

  const honorData = await getOneHonor(nim, periodeSlug);

  if (honorData.error) {
    return <div className="p-6 text-destructive">Error: {honorData.error}</div>;
  }

  if (!honorData) {
    return <div className="p-6">Data honor tidak ditemukan</div>;
  }

  return (
    <HonorProvider initialData={honorData}>
      <DetailPageContent params={params} />
    </HonorProvider>
  );
}
