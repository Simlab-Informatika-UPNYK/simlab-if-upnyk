import { z } from "zod";

export const tahunSemesterSchema = z.object({
  tahun_ajaran: z
    .string()
    .min(1, "Tahun ajaran harus diisi")
    .regex(/^\d{4}\/\d{4}$/, {
      message: "Format tahun harus seperti 2022/2023",
    })
    .refine(
      (value) => {
        if (!value.includes("/")) return false;
        const [firstYear, secondYear] = value.split("/").map(Number);
        if (firstYear < 2000) return false;
        return secondYear === firstYear + 1;
      },
      {
        message: "Penulisan tahun tidak valid",
      }
    ),
  semester: z.enum(["Gasal", "Genap"]),
});

export const defaultValues = {
  semester: "Gasal",
  tahun_ajaran: "",
};
