import { FormJadwalPraktikum } from "../_components/form-jadwal-praktikum";
import {
  getMataKuliahOptions,
  getDosenOptions,
  getLabOptions,
  getAslabOptions,
  getTahunSemesterOptions,
} from "../actions";
import { getServerSession } from "@/lib/auth-server";

export default async function Page() {
  const session = await getServerSession();
  const userRole = session?.user?.role;
  const currentAslabId = userRole === "aslab" ? session.user?.aslab_id : null;

  const [mkOptions, dosenOptions, labOptions, aslabOptions, tahunSemesterOptions] = await Promise.all([
    getMataKuliahOptions(),
    getDosenOptions(),
    getLabOptions(),
    getAslabOptions(),
    getTahunSemesterOptions(),
  ]);

  // Jika user adalah aslab, tambahkan dirinya sendiri ke default values
  const defaultValues = currentAslabId
    ? {
        kelas: "",
        mataKuliahId: "",
        dosenPengampuId: "",
        jumlahPraktikan: 0,
        hari: "",
        labId: "",
        jenisPraktikan: "",
        waktuMulai: "",
        waktuSelesai: "",
        tahunSemesterId: "",
        aslabIds: [
          {
            value: currentAslabId,
            label: aslabOptions.find((a) => a.id_aslab === currentAslabId)?.nama || "Aslab",
            nim: aslabOptions.find((a) => a.id_aslab === currentAslabId)?.nim || "",
          },
        ],
      }
    : {
        kelas: "",
        mataKuliahId: "",
        dosenPengampuId: "",
        jumlahPraktikan: 0,
        hari: "",
        labId: "",
        jenisPraktikan: "",
        waktuMulai: "",
        waktuSelesai: "",
        tahunSemesterId: "",
        aslabIds: [],
      };

  return (
    <FormJadwalPraktikum
      mataKuliahOptions={mkOptions}
      dosenOptions={dosenOptions}
      labOptions={labOptions}
      aslabOptions={aslabOptions}
      tahunSemesterOptions={tahunSemesterOptions}
      currentAslabId={currentAslabId}
      defaultValues={defaultValues}
    />
  );
}
