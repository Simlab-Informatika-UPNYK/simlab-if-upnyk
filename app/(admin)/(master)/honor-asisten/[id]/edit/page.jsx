import { FormEditHonorAsisten } from "./form-edit-honor-asisten";
import { getHonorJenisByJenis } from "../../actions";
import BackButton from "@/components/back-button";

export default async function EditHonor({ params }) {
  const jenis = (await params).id;
  const honorAsisten = await getHonorJenisByJenis(jenis);

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Edit Jenis Honor</h1>
        <BackButton />
      </div>

      <div className="">
        {honorAsisten ? (
          <FormEditHonorAsisten honor={honorAsisten} />
        ) : (
          <div className="text-center p-4">
            <p className="text-red-500">Data Jenis Honor tidak ditemukan</p>
          </div>
        )}
      </div>
    </div>
  );
}
