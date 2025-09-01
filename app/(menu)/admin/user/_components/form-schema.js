import { z } from 'zod';

export const userFormSchema = z
  .object({
    nama: z
      .string()
      .min(3, { message: 'Username minimal 3 karakter' })
      .regex(/^[a-zA-Z0-9]+$/, {
        message: 'Username hanya boleh mengandung huruf dan angka',
      }),
    email: z.string().email({ message: 'Email tidak valid' }),
    password: z.string().min(6, 'Password harus minimal 6 karakter'),
    role: z.enum(['admin', 'aslab']),
    confirmPassword: z.string().min(1, 'Harap konfirmasi password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Password tidak sama',
    path: ['confirmPassword'],
  });

export const defaultValues = {
  nama: '',
  email: '',
  password: '',
  confirmPassword: '',
  role: 'admin',
};
