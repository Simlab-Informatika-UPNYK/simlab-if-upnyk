import { z } from "zod";

export const jadwalPraktikumSchema = z
  .object({
    kelas: z
      .string()
      .regex(/^[A-Z]{2}-[A-Z]$/, "Format kelas harus: SI-A atau IF-A"),
    mataKuliahId: z.string().min(1, "Mata kuliah harus dipilih"),
    dosenPengampuId: z.string().min(1, "Dosen pengampu harus dipilih"),
    jumlahPraktikan: z.coerce.number().int().positive({ message: "Jumlah praktikan harus diisi" }),
    hari: z.string().min(1, "Hari harus diisi"),
    waktuMulai: z.string().min(1, "Waktu mulai harus diisi"),
    waktuSelesai: z.string().min(1, "Waktu selesai harus diisi"),
    labId: z.string().min(1, "Lab harus dipilih"),
    tahunSemesterId: z.string().min(1, "Tahun semester harus dipilih"),
    aslabIds: z.array(z.number()).min(1, { message: "Pilih minimal 1 asisten" }),
  })
  .refine((data) => data.waktuSelesai > data.waktuMulai, {
    message: "Waktu selesai harus lebih daripada waktu mulai",
    path: ["waktuSelesai"],
  });
