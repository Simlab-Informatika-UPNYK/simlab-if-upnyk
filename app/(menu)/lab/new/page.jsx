import React from "react";
import { FormNewLab } from "./form-new-lab";
import { getAllKalab } from "../actions.jsx";
import { withRoleAuth } from "@/components/hoc/with-role-auth";

async function NewLabPage() {
  const listKalab = await getAllKalab();

  return <FormNewLab listKalab={listKalab} />;
}

export default withRoleAuth(NewLabPage, ['admin']);
