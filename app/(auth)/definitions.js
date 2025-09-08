import { z } from "zod";

export const LoginFormSchema = z.object({
  username: z.string().min(1, "NIM harus diisi"),
  // .regex(/^\d+$/, 'NIM harus berupa angka'),
  password: z.string().min(1, { message: "Password harus diisi" }),
});
