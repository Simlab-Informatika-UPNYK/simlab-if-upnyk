import { getKalabDetail } from "../../actions.js";
import { FormEdit } from "./form-edit";

export default async function Page({ params }) {
  const slug = (await params).id;
  const data = (await getKalabDetail(slug))[0];
  return (
    <div className="container mx-auto p-6">
      <FormEdit data={data} />;
    </div>
  );
}
