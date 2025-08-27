'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createAslab } from '../actions';
import { useToast } from '@/hooks/use-toast';
import { AslabForm } from '../_components/form-aslab';
import { Button } from '@/components/ui/button';

export function NewAslabForm() {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (values) => {
    try {
      setIsLoading(true);
      setError('');

      await createAslab({
        ...values,
        email: `${values.nim}@student.upnyk.ac.id`,
      });

      toast({
        title: 'Berhasil',
        description: `Data ${values.nama} berhasil ditambahkan`,
      });
      router.push('/aslab');
    } catch (err) {
      setError(err.message || 'Terjadi kesalahan');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AslabForm onSubmit={onSubmit} isSubmitting={isLoading}>
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}
      <div className="flex justify-end pt-4">
        <Button type="submit" loading={isLoading ? 'true' : undefined}>
          Submit
        </Button>
      </div>
    </AslabForm>
  );
}
