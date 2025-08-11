import { getOneMk } from "../actions.jsx";
import { notFound } from "next/navigation";

export default async function Page({ params }) {
  const { id } = await params;
  const mk = await getOneMk(id);

  if (!mk) {
    return notFound();
  }
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Detail Mata Kuliah Praktikum</h1>
      <div className="grid gap-4">
        <div>
          <h2 className="text-lg font-semibold">Kode MK</h2>
          <p>{mk["Kode Mata Kuliah"]}</p>
        </div>
        <div>
          <h2 className="text-lg font-semibold">Nama</h2>
          <p>{mk["Nama"]}</p>
        </div>
        <div>
          <h2 className="text-lg font-semibold">Semester</h2>
          <p>{mk["Semester"]}</p>
        </div>
        <div>
          <h2 className="text-lg font-semibold">Jumlah Kelas</h2>
          <p>{mk["Jumlah Kelas"]}</p>
        </div>
      </div>
    </div>
  );
}
