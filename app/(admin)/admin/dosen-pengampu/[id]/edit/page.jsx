import { getOneDosen } from "../../actions";
import { FormEditDosen } from "./FormEditDosen";

export default async function EditDosenPage({ params }) {
  const dosen = await getOneDosen(params.id);

  if (!dosen) {
    return <div>Dosen tidak ditemukan</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Dosen Pengampu</h1>
      <FormEditDosen initialData={dosen} />
    </div>
  );
}
