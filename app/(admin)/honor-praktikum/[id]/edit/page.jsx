import { FormEditHonor } from "./form-edit-honor";
import BackButton from "@/components/back-button";
import { getOneHonor } from "../../actions";

export default async function EditHonor({ params }) {
  const slug = (await params).id;
  const jadwal = await getOneHonor(slug);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Edit Jadwal Praktikum</h1>
        <BackButton />
      </div>

      <div className="">
        {jadwal ? (
          <FormEditHonor jadwal={jadwal} />
        ) : (
          <div className="text-center p-4">
            <p className="text-red-500">Honor Praktikum tidak ditemukan</p>
          </div>
        )}
      </div>
    </div>
  );
}