import { z } from 'zod';

// Define the Zod schema for validation
export const SignupFormSchema = z.object({
    // name: z.string().min(2, 'Name must be at least 2 characters long.'),
    email: z.string().email('Please enter a valid email.'),
    password: z
        .string()
        .min(8, 'Password must be at least 8 characters long.')
        .regex(/[a-zA-Z]/, 'Password must contain at least one letter.')
        .regex(/[0-9]/, 'Password must contain at least one number.')
    // .regex(/[\W_]/, 'Password must contain at least one special character.'),
    , confirmPassword: z.string().min(1, 'Please confirm your password.')
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword']
});

export const LoginFormSchema = z.object({
    email: z.string().email({ message: 'Please enter a valid email.' }),
    password: z.string().min(1, { message: 'Password field must not be empty.' }),
});
