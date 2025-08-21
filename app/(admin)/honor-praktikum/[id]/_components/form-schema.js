import { z } from "zod";

export const honorPraktikumSchema = z.object({
  aslab_id: z.string().min(1, "Asisten harus dipilih"),
  periode: z.string().min(1, "Periode harus dipilih"),
  tanggal_pengambilan: z.date().nullable().optional(),
  status_honor: z.string().optional()
});

export const defaultValues = {
  aslab_id: "",
  periode: "",
  tanggal_pengambilan: new Date(),
  status_honor: "Belum Diambil"
};
