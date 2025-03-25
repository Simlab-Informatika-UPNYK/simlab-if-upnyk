import { DataTable } from "@/components/data-table/data-table";
import { columns } from "./_components/columns";
import { PlusCircle } from "lucide-react";
import { getAllJadwal } from "./actions";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const filters = [];

export default async function Page() {
  const data = await getAllJadwal();

  const transformedData = data.map((item) => {
    return {
      ...item,
      kelas: item.kelas,
      mata_kuliah: item.mata_kuliah.nama,
      dosen: item.dosen_pengampu.nama,
      jumlah_praktikan: item.jumlah_praktikan,
      hari: item.hari,
      waktu: item.waktu,
      lab: item.lab.nama,
      jenis_praktikan: item.jenis_praktikan,
      asisten: item.aslab.map((a) => a.aslab.nama),
    };
  });

  return (
    <DataTable
      toolbar={
        <Link href="/jadwal-praktikum/new">
          <Button>
            <PlusCircle />
            Add Data
          </Button>
        </Link>
      }
      viewOptions={true}
      globalSearch={true}
      filters={filters}
      pagination={true}
      columns={columns}
      data={transformedData}
    />
  );
}
