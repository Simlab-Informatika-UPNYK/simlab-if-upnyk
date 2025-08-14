import { z } from "zod";

export const aslabFormSchema = z.object({
  nama: z.string().min(2, { message: "Nama harus diisi minimal 2 karakter" }),
  nim: z
    .string()
    .length(9, { message: "NIM harus berupa 9 angka" })
    .refine((val) => /^\d+$/.test(val), { message: "NIM harus berupa angka" }),
  email: z.string().email({ message: "Email harus valid" }),
  angkatan: z.string().min(2, { message: "Pilih tahun angkatan" }),
  program_studi: z.string().min(2, { message: "Pilih program studi" }),
  pendidikan_terakhir: z
    .union([
      z.string().min(2, { message: "Pilih pendidikan terakhir" }),
      z.null(),
    ])
    .optional(),
  status: z.string().min(2, { message: "Pilih status" }),
  no_hp: z
    .union([
      z.string().length(0),
      z
        .string()
        .min(10, { message: "Nomor HP minimal 10 digit" })
        .refine((val) => /^\d+$/.test(val), {
          message: "Nomor HP harus berupa angka",
        }),
    ])
    .optional()
    .transform((e) => (e === null ? undefined : e)),
  profile_picture: z.string().url().optional(),
});
