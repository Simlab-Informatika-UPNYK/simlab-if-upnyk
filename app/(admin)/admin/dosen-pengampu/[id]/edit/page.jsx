import { FormEditDosenPengampu } from "./form-edit-dosen-pengampu";
import BackButton from "@/components/back-button";
import { getOneDosen } from "../../actions";

export default async function EditDosenPengampuPage({ params }) {
  const slug = (await params).id;
  const dosenPengampu = await getOneDosen(slug);

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Edit Dosen Pengampu</h1>
        <BackButton />
      </div>

      <div className="">
        {dosenPengampu ? (
          <FormEditDosenPengampu dosen={dosenPengampu} />
        ) : (
          <div className="text-center p-4">
            <p className="text-red-500">Data Dosen Pengampu tidak ditemukan</p>
          </div>
        )}
      </div>
    </div>
  );
}
