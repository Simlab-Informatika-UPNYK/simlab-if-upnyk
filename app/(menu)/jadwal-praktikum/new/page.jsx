import { FormJadwalPraktikum } from "../_components/form-jadwal-praktikum";
import {
  getMataKuliahOptions,
  getDosenOptions,
  getLabOptions,
  getAslabOptions,
} from "../actions";

export default async function Page() {
  const [mkOptions, dosenOptions, labOptions, aslabOptions] = await Promise.all(
    [
      getMataKuliahOptions(),
      getDosenOptions(),
      getLabOptions(),
      getAslabOptions(),
    ]
  );

  return (
    <FormJadwalPraktikum
      mataKuliahOptions={mkOptions}
      dosenOptions={dosenOptions}
      labOptions={labOptions}
      aslabOptions={aslabOptions}
    />
  );
}
