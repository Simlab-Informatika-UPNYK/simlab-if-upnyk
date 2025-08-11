import { FormEditLab } from "./form-edit-lab";
import { createClient } from "@/utils/supabase/server";
import BackButton from "@/components/back-button";
import { getOneLab, getAllKalab } from "../../actions.jsx";

export default async function EditLabPage({ params }) {
  const slug = (await params).id;
  const lab = await getOneLab(slug);
  const listKalab = await getAllKalab();

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Edit Laboratorium</h1>
        <BackButton />
      </div>

      <div className="">
        {lab ? (
          <FormEditLab lab={lab} listKalab={listKalab} />
        ) : (
          <div className="text-center p-4">
            <p className="text-red-500">Laboratorium tidak ditemukan</p>
          </div>
        )}
      </div>
    </div>
  );
}
