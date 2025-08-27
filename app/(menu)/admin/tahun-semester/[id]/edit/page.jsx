import { getTahunSemesterBySlug } from "../../actions";
import { FormEdit } from "./form-edit";

export default async function Page({ params }) {
  const slug = (await params).id;
  const data = await getTahunSemesterBySlug(slug);

  return <FormEdit data={data} />;
}
