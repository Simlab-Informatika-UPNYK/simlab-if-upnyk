'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
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

// Schema validasi untuk form folder
const formSchema = z.object({
  title: z.string().min(1, { message: 'Nama folder harus diisi' }),
  url: z
    .string()
    .min(1, { message: 'URL folder harus diisi' })
    .regex(/^\/[a-z0-9-]+$/, {
      message: "Format URL tidak valid, gunakan format '/nama-url'",
    }),
});

export default function FolderFormDialog({
  children,
  mode = 'add',
  initialData = {},
  onSuccess,
}) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues:
      mode === 'edit'
        ? { ...initialData }
        : {
            title: '',
            url: '',
          },
  });

  async function onSubmit(values) {
    setIsSubmitting(true);

    try {
      // Simpan data ke localStorage untuk sementara
      // Di implementasi nyata, ini akan menggunakan API call
      const folders = JSON.parse(localStorage.getItem('lab-folders') || '[]');

      if (mode === 'add') {
        folders.push(values);
      } else {
        const index = folders.findIndex(
          (folder) => folder.url === initialData.url
        );
        if (index !== -1) {
          folders[index] = values;
        }
      }

      localStorage.setItem('lab-folders', JSON.stringify(folders));

      toast({
        title:
          mode === 'add'
            ? 'Folder berhasil ditambahkan'
            : 'Folder berhasil diperbarui',
        description: `Folder ${values.title} berhasil ${
          mode === 'add' ? 'ditambahkan' : 'diperbarui'
        }`,
      });

      setOpen(false);
      if (onSuccess) onSuccess();
    } catch (error) {
      toast({
        title: 'Gagal',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px] rounded-md">
        <DialogHeader>
          <DialogTitle>
            {mode === 'add' ? 'Tambah Folder Baru' : 'Edit Folder'}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Folder</FormLabel>
                  <FormControl>
                    <Input placeholder="Nama Folder" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL Folder</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="/nama-url"
                      {...field}
                      onChange={(e) => {
                        // Pastikan URL selalu diawali dengan /
                        let value = e.target.value;
                        if (value && !value.startsWith('/')) {
                          value = '/' + value;
                        }
                        field.onChange(value);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={isSubmitting}
              >
                Batal
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting
                  ? 'Menyimpan...'
                  : mode === 'add'
                  ? 'Tambah'
                  : 'Simpan'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
