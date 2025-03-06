import { getKalabDetail } from "../../actions.js";
import { FormEdit } from "./form-edit";

export default async function Page({ params }) {
  const slug = (await params).id;
  const data = (await getKalabDetail(slug))[0];
  return <FormEdit data={data} />;
}
