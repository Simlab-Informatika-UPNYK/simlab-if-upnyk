import React from "react";
import { FormNewLab } from "./form-new-lab";
import { getAllKalab } from "../actions.jsx";

const page = async () => {
  const listKalab = await getAllKalab();

  return <FormNewLab listKalab={listKalab} />;
};

export default page;
