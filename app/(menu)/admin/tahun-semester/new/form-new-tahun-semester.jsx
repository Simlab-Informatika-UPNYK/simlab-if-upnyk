"use client";

import { useState } from "react";
import slugify from "react-slugify";
import { checkTahunSemesterExists, createTahunSemester } from "../actions";
import { FormTahunSemester } from "../_components/form-tahun-semester";

export function FormNewTahunSemester() {
  const [formError, setFormError] = useState("");

  async function handleSubmit(values) {
    try {
      setFormError("");
      const slugTahun = slugify(`${values.tahun_ajaran}-${values.semester}`);

      await createTahunSemester({
        ...values,
        slug: slugTahun,
      });

      return {
        message: `Semester ${values.semester} tahun ${values.tahun_ajaran} berhasil ditambahkan`,
        redirect: "/admin/tahun-semester"
      };
    } catch (error) {
      throw error;
    }
  }

  return (
    <FormTahunSemester
      onSubmitHandler={handleSubmit}
      successMessage="Tahun semester berhasil ditambahkan"
      successRedirect="/admin/tahun-semester"
    />
  );
}
