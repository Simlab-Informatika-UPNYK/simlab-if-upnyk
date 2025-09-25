import { z } from "zod";

export const kalabFormSchema = z.object({
  "Nama Lengkap": z.string().min(1, { message: "Harap isi Nama Lengkap" }),
  "NIDN/NIP": z.string().min(1, { message: "Harap isi NIDN/NIP" }),
  Email: z.string().email({ message: "Email tidak valid" }),
  "No Telepon": z.string().refine(
    (val) => val === "" || (val.length >= 10 && val.length <= 15),
    { message: "No Telepon harus kosong atau antara 10-15 digit" }
  ),
});
