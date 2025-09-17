import { getPengumumanById } from "../../actions";
import { FormEdit } from "./form-edit";

export default async function Page({ params }) {
  const id = (await params).id;
  const data = await getPengumumanById(parseInt(id));

  return <FormEdit data={data} />;
}
