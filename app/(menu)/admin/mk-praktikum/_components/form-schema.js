import { z } from "zod";

export const mkPraktikumSchema = z.object({
  kode_mk: z.preprocess((val) => {
    const num = Number(val);
    // Jika NaN, return 0 agar bisa difilter oleh min()
    return isNaN(num) ? 0 : num;
  }, z.number("Kode MK harus berupa angka").int("Kode MK harus berupa angka bulat").positive("Kode MK harus berupa angka positif").min(100, "Kode MK minimal 3 digit")),
  nama: z.string().min(5, "Nama minimal 5 karakter"),
});
