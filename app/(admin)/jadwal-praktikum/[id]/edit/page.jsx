import { FormJadwalPraktikum } from "../../_components/form-jadwal-praktikum";
import { notFound } from "next/navigation";
import {
  findOneById,
  updateJadwal,
  getMataKuliahOptions,
  getDosenOptions,
  getLabOptions,
  getAslabOptions,
} from "../../actions";

export default async function EditPage({ params }) {
  const [jadwal, mataKuliahOptions, dosenOptions, labOptions, aslabOptions] =
    await Promise.all([
      findOneById(params.id),
      getMataKuliahOptions(),
      getDosenOptions(),
      getLabOptions(),
      getAslabOptions(),
    ]);
    
  if (!jadwal) {
    return notFound();
  }

  const defaultValues = {
    kelas: jadwal.kelas ?? "",
    mataKuliahId: jadwal.mataKuliah?.id.toString() ?? "",
    dosenPengampuId: jadwal.dosenPengampu?.id.toString() ?? "",
    jumlahPraktikan: jadwal.jumlah_praktikan ?? "",
    hari: jadwal.hari ?? "",
    waktu: jadwal.waktu ?? "",
    labId: jadwal.lab?.id.toString() ?? "",
    jenisPraktikan: jadwal.jenis_praktikan ?? "",
    aslabIds:
      jadwal.kelasAslab?.map((ka) => ({
        value: ka.aslab.id_aslab,
        label: ka.aslab.nama,
        nim: ka.aslab.nim,
      })) ?? [],
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Jadwal Praktikum</h1>
      <FormJadwalPraktikum
        action={updateJadwal}
        defaultValues={defaultValues}
        id={jadwal.id}
        mataKuliahOptions={mataKuliahOptions}
        dosenOptions={dosenOptions}
        labOptions={labOptions}
        aslabOptions={aslabOptions}
      />
    </div>
  );
}
