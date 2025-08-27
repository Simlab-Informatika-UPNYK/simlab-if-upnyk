'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { editDosen } from '../../actions';

// Updated schema for dosen pengampu
const formSchema = z.object({
  nama: z.string().min(2, { message: 'Nama minimal 2 karakter' }),
  nip: z.string().min(1, { message: 'NIP harus diisi' }),
  email: z.string().min(2, { message: 'Mata kuliah harus diisi' }),
});

export function FormEditDosenPengampu({ dosen }) {
  const { toast } = useToast();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nama: dosen.nama || '',
      nip: dosen.nip || '',
      email: dosen.email || '',
    },
  });

  async function onSubmit(values) {
    setIsSubmitting(true);

    try {
      const result = await editDosen(dosen.id, values);

      if (result.success) {
        toast({
          title: 'Berhasil Mengubah',
          description: `Data dosen ${values.nama} telah berhasil diperbarui`,
        });
        router.push('/dosen-pengampu');
        router.refresh();
      } else {
        toast({
          title: 'Gagal Mengubah',
          description: `Terjadi kesalahan saat diperbarui`,
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="nama"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">Nama</FormLabel>
              <FormControl>
                <Input className="w-full" placeholder="Nama Dosen" {...field} />
              </FormControl>
              <FormMessage className="text-sm text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="nip"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">NIP</FormLabel>
              <FormControl>
                <Input className="w-full" placeholder="NIP" {...field} />
              </FormControl>
              <FormMessage className="text-sm text-red-500" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">Email</FormLabel>
              <FormControl>
                <Input className="w-full" placeholder="Email" {...field} />
              </FormControl>
              <FormMessage className="text-sm text-red-500" />
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={isSubmitting}
          >
            Batal
          </Button>
          <Button type="submit" className="px-6" disabled={isSubmitting}>
            {isSubmitting ? 'Menyimpan...' : 'Simpan'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
