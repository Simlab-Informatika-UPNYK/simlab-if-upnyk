import { z } from "zod";

export const tahunSemesterSchema = z.object({
  tahun_ajaran: z.string().regex(/^\d{4}\/\d{4}$/, {
    message: "Format tahun harus seperti 2022/2023",
  }),
  semester: z.enum(["Gasal", "Genap"])
});

export const defaultValues = {
  semester: "Gasal",
  tahun_ajaran: ""
};
