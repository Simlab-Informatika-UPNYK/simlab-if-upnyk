import { createClient } from "@/utils/supabase/server";
import { FormEdit } from "./form-edit";

async function getDetail(slug) {
  const supabase = await createClient();

  const { data: tahun_semester } = await supabase
    .from("tahun_semester")
    .select()
    .eq("slug", slug)
    .single();
  return tahun_semester;
}

export default async function Page({ params }) {
  const slug = (await params).id;
  const data = (await getDetail(slug));

  return <FormEdit data={data} />;
}
