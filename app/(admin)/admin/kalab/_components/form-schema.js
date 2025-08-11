import { z } from "zod";

export const kalabFormSchema = z.object({
  "Nama Lengkap": z.string().min(1, { message: "Harap isi Nama Lengkap" }),
  "NIDN/NIP": z.string().min(1, { message: "Harap isi NIDN/NIP" }),
  Email: z.string().email({ message: "Email tidak valid" }),
  "No Telepon": z.string()
    .min(10, { message: "No Telepon minimal 10 digit" })
    .max(15, { message: "No Telepon maksimal 15 digit" })
    // .regex(/^[0-9]+$/, { message: "Hanya angka yang diperbolehkan" }),
});
