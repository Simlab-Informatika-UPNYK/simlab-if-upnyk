import { db } from "@/db";
import { permintaan_sertifikat, aslab } from "@/db/schema";
import { desc, eq } from "drizzle-orm";

export async function findOneByNim(nim) {
  const result = await db
    .select()
    .from(permintaan_sertifikat)
    .innerJoin(aslab, eq(permintaan_sertifikat.id_aslab, aslab.id_aslab))
    .where(eq(aslab.nim, nim))
    .limit(1);

  return result[0] || null;
}

export async function findAllOrdered() {
  const result = await db
    .select({
      id: permintaan_sertifikat.id,
      waktu_pengajuan: permintaan_sertifikat.waktu_pengajuan,
      status: permintaan_sertifikat.status,
      keterangan: permintaan_sertifikat.keterangan,
      aslab: {
        id_aslab: aslab.id_aslab,
        nama: aslab.nama,
        nim: aslab.nim
      }
    })
    .from(permintaan_sertifikat)
    .innerJoin(aslab, eq(permintaan_sertifikat.id_aslab, aslab.id_aslab))
    .orderBy(desc(permintaan_sertifikat.waktu_pengajuan));

  return result.map(item => ({
    id: item.id.toString(),
    nim: item.aslab.nim,
    nama_asisten: item.aslab.nama,
    tanggal_pengajuan: item.waktu_pengajuan
      ? new Date(item.waktu_pengajuan).toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })
      : "-",
    status: item.status ? item.status.charAt(0).toUpperCase() + item.status.slice(1) : "Pending",
  }));
}

export async function checkExists(nim) {
  const result = await findOneByNim(nim);
  return result !== null;
}
