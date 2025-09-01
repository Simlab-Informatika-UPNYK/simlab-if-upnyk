import { getServerSession } from '@/lib/auth-server';
import { redirect } from 'next/navigation';
import AslabDetailClient from './aslab-detail-client';

export default async function AslabDetail({ params }) {
  const session = await getServerSession();

  const allowedRoles = ['admin'];
  if (!allowedRoles.includes(session.user.role)) {
    redirect('/sertifikat');
  }

  const nim = (await params).id;

  return <AslabDetailClient nim={nim} />;
}
