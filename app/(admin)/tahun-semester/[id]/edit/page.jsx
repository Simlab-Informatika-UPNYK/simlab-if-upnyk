import { createClient } from "@/utils/supabase/server";
import { FormEdit } from "./form-edit";

async function getData(id) {
//   const supabase = await createClient();
  return {
    tahun: "2022/2023",
    semester: "Genap",
  };
}

export default async function Page({ params }) {
  const slug = (await params).id;
  const data = (await getData(slug));

  return <FormEdit data={data} />;
}
