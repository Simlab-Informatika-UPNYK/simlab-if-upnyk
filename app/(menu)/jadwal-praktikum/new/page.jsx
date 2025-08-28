import { FormJadwalPraktikum } from '../_components/form-jadwal-praktikum';
import {
  getMataKuliahOptions,
  getDosenOptions,
  getLabOptions,
  getAslabOptions,
  getTahunSemesterOptions,
} from '../actions';

export default async function Page() {
  const [
    mkOptions,
    dosenOptions,
    labOptions,
    aslabOptions,
    tahunSemesterOptions,
  ] = await Promise.all([
    getMataKuliahOptions(),
    getDosenOptions(),
    getLabOptions(),
    getAslabOptions(),
    getTahunSemesterOptions(),
  ]);

  return (
    <FormJadwalPraktikum
      mataKuliahOptions={mkOptions}
      dosenOptions={dosenOptions}
      labOptions={labOptions}
      aslabOptions={aslabOptions}
      tahunSemesterOptions={tahunSemesterOptions}
    />
  );
}
