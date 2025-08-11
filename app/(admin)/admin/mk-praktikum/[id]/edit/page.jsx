import { getOneMk } from "../../actions.jsx";
import { FormEditMK } from "./form-edit-mk.jsx";
import BackButton from "@/components/back-button";

export default async function EditMKPage({ params }) {
  const slug = (await params).id;
  const mk = await getOneMk(slug);

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Edit Mata Kuliah Praktikum</h1>
        <BackButton />
      </div>

      <div className="">
        {mk ? (
          <FormEditMK mk={mk} />
        ) : (
          <div className="text-center p-4">
            <p className="text-red-500">Mata Kuliah Praktikum tidak ditemukan</p>
          </div>
        )}
      </div>
    </div>
  );
}
