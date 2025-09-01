import { FormEdit } from './form-edit';
import { getAslabByNim } from '../../actions';

export default async function Page({ params }) {
  const nim = (await params).id;
  const data = await getAslabByNim(nim);

  if (!data) {
    return <div>Aslab not found</div>;
  }

  return <FormEdit data={data} />;
}
