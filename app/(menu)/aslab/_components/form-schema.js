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
  status: z.string().min(2, { message: "Pilih status" }),
  no_hp: z.union([
    z.string().length(0, { message: "Hanya bisa menginput angka" }),
    z
      .string()
      .min(10, { message: "Nomor HP minimal 10 digit" })
      .refine((val) => /^\d+$/.test(val), {
        message: "Nomor HP harus berupa angka",
      }),
  ]),
});
