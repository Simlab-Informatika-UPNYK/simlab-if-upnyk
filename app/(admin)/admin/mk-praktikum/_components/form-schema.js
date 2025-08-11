import { z } from "zod";

export const mkPraktikumSchema = z.object({
  "Kode Mata Kuliah": z.coerce
    .number() // Konversi otomatis ke number
    .int("Kode MK harus bilangan bulat")
    .positive("Kode MK harus positif")
    .min(100, "Kode MK minimal 3 digit"),

  Nama: z.string().min(5, "Nama minimal 5 karakter"),
  Semester: z.string().min(1, "Semester harus diisi"),
  "Jumlah Kelas": z.coerce
    .number()
    .int("Jumlah kelas harus bilangan bulat")
    .min(1, "Jumlah kelas minimal 1"),
});
