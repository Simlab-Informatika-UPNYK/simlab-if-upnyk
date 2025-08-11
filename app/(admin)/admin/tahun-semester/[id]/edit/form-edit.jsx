"use client";

import { updateTahunSemester } from "../../actions";
import { FormTahunSemester } from "../../_components/form-tahun-semester";
import slugify from "react-slugify";

export function FormEdit({ data }) {
  async function handleSubmit(values) {
    try {
      await updateTahunSemester(data.slug, {
        ...values,
        slug: slugify(`${values.tahun_ajaran}-${values.semester}`),
      });

      return {
        message: `Semester ${values.semester} tahun ${values.tahun_ajaran} berhasil diperbarui`,
        redirect: "/admin/tahun-semester",
      };
    } catch (error) {
      throw error;
    }
  }

  return (
    <FormTahunSemester
      initialData={data}
      onSubmitHandler={handleSubmit}
      successMessage="Tahun semester berhasil diperbarui"
      successRedirect="/admin/tahun-semester"
    />
  );
}
