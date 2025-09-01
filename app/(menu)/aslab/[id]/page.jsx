import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Pencil, Trash2 } from 'lucide-react';
import BackButton from '@/components/back-button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';
import { getAslabByNim } from '../actions';
import { getServerSession } from '@/lib/auth-server';

export default async function Page({ params }) {
  const nim = (await params).id;
  const session = await getServerSession();

  const data = await getAslabByNim(nim);

  if (!data) {
    return <div className="container mx-auto p-6">Aslab not found</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{data.nama}</h1>
        <div className="flex gap-2">
          {session.user.role === 'admin' && (
            <Link href={`/aslab/${nim}/edit`}>
              <Button variant="outline" size="icon">
                <Pencil className="h-4 w-4" />
              </Button>
            </Link>
          )}
          <BackButton />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <h3 className="text-sm text-gray-500">NIM</h3>
              <p className="font-medium">{data.nim}</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-500">Email</h3>
              <p className="font-medium">{data.email}</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-500">Angkatan</h3>
              <p className="font-medium">{data.angkatan}</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-500">Program Studi</h3>
              <p className="font-medium">{data.program_studi}</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-500">Status</h3>
              <p className="font-medium capitalize">{data.status}</p>
            </div>
          </div>
        </div>

        <div className="space-y-6 ms-auto">
          <div className="flex items-center justify-center py-4 px-12">
            {data.profile_picture ? (
              <img
                src={data.profile_picture}
                alt={`${data.nama}'s profile`}
                className="w-48 h-48 object-cover rounded-lg"
              />
            ) : (
              <div className="w-48 h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-500">No Image</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
