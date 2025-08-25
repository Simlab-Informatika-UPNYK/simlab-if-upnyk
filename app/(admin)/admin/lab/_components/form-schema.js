import { z } from "zod";

export const labFormSchema = z.object({
  nama: z.string().min(2, { message: "Nama Laboratorium minimal 2 karakter" }),
  lantai: z.string().min(1, { message: "Lantai harus diisi" }),
  kapasitas: z.preprocess(
    (arg) => (arg === "" ? undefined : Number(arg)),
    z
      .number({ invalid_type_error: "Kapasitas harus berupa angka" })
      .min(1, { message: "Kapasitas minimal 1" })
  ),
  kalab: z.preprocess(
    (arg) => (arg === "" ? undefined : Number(arg)),
    z.number({ invalid_type_error: "Kalab harus diisi" }).optional()
  ),
});
