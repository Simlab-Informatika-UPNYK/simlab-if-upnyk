import { z } from "zod";

export const pengumumanSchema = z.object({
  judul: z
    .string()
    .min(1, "Judul pengumuman harus diisi")
    .max(200, "Judul maksimal 200 karakter"),
  isi: z
    .string()
    .min(1, "Isi pengumuman harus diisi")
    .max(2000, "Isi maksimal 2000 karakter"),
  active: z.boolean().default(true),
});

export const defaultValues = {
  judul: "",
  isi: "",
  active: true,
};
