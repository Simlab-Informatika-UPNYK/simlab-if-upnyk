"use client";

import { useState } from "react";
import { createPengumuman } from "../actions";
import { FormPengumuman } from "../_components/form-pengumuman";

export function FormNewPengumuman() {
  const [formError, setFormError] = useState("");

  async function handleSubmit(values) {
    try {
      setFormError("");
      await createPengumuman(values);

      return {
        message: "Pengumuman berhasil dibuat",
        redirect: "/admin/pengumuman"
      };
    } catch (error) {
      throw error;
    }
  }

  return (
    <FormPengumuman
      onSubmitHandler={handleSubmit}
      successMessage="Pengumuman berhasil dibuat"
      successRedirect="/admin/pengumuman"
    />
  );
}
