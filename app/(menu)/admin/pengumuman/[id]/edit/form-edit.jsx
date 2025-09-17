"use client";

import { updatePengumuman } from "../../actions";
import { FormPengumuman } from "../../_components/form-pengumuman";

export function FormEdit({ data }) {
  async function handleSubmit(values) {
    try {
      await updatePengumuman(data.id, values);

      return {
        message: "Pengumuman berhasil diperbarui",
        redirect: "/admin/pengumuman",
      };
    } catch (error) {
      throw error;
    }
  }

  return (
    <FormPengumuman
      initialData={data}
      onSubmitHandler={handleSubmit}
      successMessage="Pengumuman berhasil diperbarui"
      successRedirect="/admin/pengumuman"
    />
  );
}
