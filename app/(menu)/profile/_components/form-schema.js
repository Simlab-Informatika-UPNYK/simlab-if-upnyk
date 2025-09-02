import { z } from "zod";

// Base user schema
export const userSchema = z.object({
  name: z.string().min(1, "Nama harus diisi"),
  email: z.string().email("Email tidak valid"),
  username: z.string().min(3, "Username minimal 3 karakter"),
  displayUsername: z.string().optional(),
  nip: z.string().optional(),
  image: z.string().optional(),
});

// Aslab schema (only non-redundant fields)
export const aslabSchema = z.object({
  nim: z.string().min(1, "NIM harus diisi"),
  no_hp: z.string().min(10, "Nomor HP minimal 10 digit"),
  angkatan: z.string().length(4, "Angkatan harus 4 digit"),
  program_studi: z.enum(["Sistem Informasi", "Informatika"], {
    required_error: "Program studi harus dipilih",
  }),
  status: z.enum(["Aktif", "Tidak Aktif"], {
    required_error: "Status harus dipilih",
  }),
  profile_picture: z.string().optional(),
});

// Main profile schema
export const profileSchema = z.object({
  user: userSchema,
  aslab: aslabSchema.optional(),
});

// Default values
export const defaultValues = {
  user: {
    name: "",
    email: "",
    username: "",
    displayUsername: "",
    nip: "",
    image: "",
  },
  aslab: {
    nim: "",
    no_hp: "",
    angkatan: "",
    program_studi: "Sistem Informasi",
    status: "Aktif",
    profile_picture: "",
  },
};
