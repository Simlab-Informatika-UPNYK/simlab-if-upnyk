import { z } from "zod";

export const mkPraktikumSchema = z.object({
  kode_mk: z.coerce
    .number("Kode Mata Kuliah tidak valid") // Konversi otomatis ke number
    .int("Kode Mata Kuliah tidak valid")
    .positive("Kode Mata Kuliah tidak valid")
    .min(100, "Kode MK minimal 3 digit"),
  nama: z.string().min(5, "Nama minimal 5 karakter"),
});
