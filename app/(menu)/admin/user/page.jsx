import { DataTable } from '@/components/data-table/data-table';
import { columns } from './_components/columns';
import { PlusCircle } from 'lucide-react';
import { getAllUsers } from './actions';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@/components/ui/dialog';
import { withAdminAuth } from '@/components/hoc/with-admin-auth';
import Link from 'next/link';

const filters = [];

async function UserPage() {
  const data = await getAllUsers();

  return (
    <div className="container mx-auto px-4 py-2">
      <h1 className="text-3xl font-bold">Data User</h1>
      <p className="text-gray-500 mb-4">
        Daftar user admin dan asisten laboratorium
      </p>

      <DataTable
        toolbar={
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <PlusCircle />
                Add Data
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>User apa yang ingin anda buat?</DialogTitle>
                <DialogDescription>
                  Silahkan pilih role user yang ingin dibuat
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" className="w-full" asChild>
                  <Link href={'/admin/user/new'}>Admin</Link>
                </Button>
                <Button className="w-full" asChild>
                  <Link href={'/aslab/new'}>Asisten</Link>
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        }
        viewOptions={true}
        globalSearch={true}
        filters={filters}
        pagination={true}
        columns={columns}
        data={data}
      />
    </div>
  );
}

export default withAdminAuth(UserPage);
