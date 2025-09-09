import { FormJadwalPraktikum } from "../../_components/form-jadwal-praktikum";
import { notFound, redirect } from "next/navigation";
import {
  findOneById,
  updateJadwal,
  getMataKuliahOptions,
  getDosenOptions,
  getLabOptions,
  getAslabOptions,
  getTahunSemesterOptions,
} from "../../actions";
import { getServerSession } from "@/lib/auth-server";

export default async function EditPage({ params }) {
  const session = await getServerSession();
  const userRole = session?.user?.role;
  const currentAslabId = userRole === "aslab" ? session.user?.aslab_id : null;

  const id = (await params).id;

  const [jadwal, mataKuliahOptions, dosenOptions, labOptions, aslabOptions, tahunSemesterOptions] = await Promise.all([
    findOneById(id),
    getMataKuliahOptions(),
    getDosenOptions(),
    getLabOptions(),
    getAslabOptions(),
    getTahunSemesterOptions(),
  ]);

  if (!jadwal) {
    redirect("/jadwal-praktikum");
  }

  if (
    session.user.role === "aslab" &&
    session.user.username &&
    !jadwal.kelasAslab.some((item) => item.aslab?.nim === session.user.username)
  ) {
    redirect("/jadwal-praktikum");
  }

  const defaultValues = {
    kelas: jadwal.kelas ?? "",
    mataKuliahId: jadwal.mataKuliah?.id.toString() ?? "",
    dosenPengampuId: jadwal.dosenPengampu?.id.toString() ?? "",
    jumlahPraktikan: jadwal.jumlah_praktikan ?? "",
    hari: jadwal.hari ?? "",
    waktuMulai: jadwal.waktu_mulai ?? "",
    waktuSelesai: jadwal.waktu_selesai ?? "",
    labId: jadwal.lab?.id.toString() ?? "",
    jenisPraktikan: jadwal.jenis_praktikan ?? "",
    tahunSemesterId: jadwal.tahun_semester?.toString() ?? "",
    aslabIds:
      jadwal.kelasAslab?.map((ka) => ({
        value: ka.aslab.id_aslab,
        label: `${ka.aslab?.user?.name} (${ka.aslab.nim})`,
        nim: ka.aslab.nim,
      })) ?? [],
  };

  if (currentAslabId && userRole === "aslab") {
    const currentAslabInList = defaultValues.aslabIds.some((aslabId) => parseInt(aslabId) === parseInt(currentAslabId));

    if (!currentAslabInList) {
      const currentAslabData = aslabOptions.find((a) => a.id_aslab === currentAslabId);
      if (!currentAslabData) {
        defaultValues.aslabIds.push({
          value: currentAslabId,
          label: `${currentAslabData.nama} (${currentAslabData.nim})`,
          nim: currentAslabData.nim,
        });
      }
    }
  }

  console.log("defaultValues", defaultValues);

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
        tahunSemesterOptions={tahunSemesterOptions}
        currentAslabId={currentAslabId}
      />
    </div>
  );
}
