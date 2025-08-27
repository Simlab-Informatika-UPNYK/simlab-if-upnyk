import { z } from 'zod';

// Define the Zod schema for validation
export const SignupFormSchema = z.object({
    username: z.string()
        .min(1, 'NIM harus diisi'),
        // .regex(/^\d+$/, 'NIM harus berupa angka'),
    password: z
        .string()
        .min(8, 'Password harus minimal 8 karakter')
        .regex(/[a-zA-Z]/, 'Password harus mengandung huruf')
        .regex(/[0-9]/, 'Password harus mengandung angka'),
    confirmPassword: z.string().min(1, 'Harap konfirmasi password')
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Password tidak sama',
    path: ['confirmPassword']
});

export const LoginFormSchema = z.object({
    username: z.string()
        .min(1, 'NIM harus diisi'),
        // .regex(/^\d+$/, 'NIM harus berupa angka'),
    password: z.string().min(1, { message: 'Password harus diisi' }),
});
