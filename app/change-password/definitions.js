import { z } from "zod";

export const FirstTimePasswordChangeSchema = z
  .object({
    currentPassword: z.string().min(1, "Password default harus diisi"),
    newPassword: z.string().min(6, "Password baru minimal 6 karakter"),
    confirmPassword: z.string().min(1, "Konfirmasi password harus diisi"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Password baru dan konfirmasi password tidak sama",
    path: ["confirmPassword"],
  });

export const firstTimePasswordChangeDefaultValues = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};
