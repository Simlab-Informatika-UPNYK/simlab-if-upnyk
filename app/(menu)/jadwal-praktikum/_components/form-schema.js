import { z } from "zod";

export const jadwalPraktikumSchema = z.object({
  kelas: z.string().min(1, "Kelas harus diisi"),
  mataKuliahId: z.string().min(1, "Mata kuliah harus dipilih"),
  dosenPengampuId: z.string().min(1, "Dosen pengampu harus dipilih"),
  jumlahPraktikan: z.coerce.number().int().positive({ message: "Jumlah praktikan harus diisi" }),
  hari: z.string().min(1, "Hari harus diisi"),
  waktu: z.string().min(1, "Waktu harus diisi"),
  labId: z.string().min(1, "Lab harus dipilih"),
  jenisPraktikan: z.string().min(1, "Jenis praktikan harus diisi"),
  tahunSemesterId: z.string().min(1, "Tahun semester harus dipilih"),
  aslabIds: z.array(z.number()).min(1, { message: "Pilih minimal 1 asisten" }),
});
