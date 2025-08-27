import { z } from "zod"

export const dosenSchema = z.object({
  nama: z.string().min(1, "Nama harus diisi"),
  nip: z.string().min(1, "NIP harus diisi"),
  email: z.string().email("Email tidak valid"),
})

export const defaultValues = {
  nama: "",
  nip: "", 
  email: "",
}
