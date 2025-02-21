import { DataTable } from "@/components/data-table/data-table";
import { columns } from "./_components/columns";
import { Mail, MoreHorizontal, PhoneCall, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

async function getData() {
  // Fetch data from your API here.
  return [
    {
      "Nama Lengkap": "Dr. Heriyanto, A.Md, S.Kom., M.Cs.",
      "NIDN/NIP": "1977068 2021211004",
      Jabatan: "Kalab Basis Data",
      Email: "Heriyanto@dosen.upnyk.ac.id",
      "No. Telepon": "081234567155",
    },
    {
      "Nama Lengkap": "Dr. Rina Andriyani, S.T., M.Sc.",
      "NIDN/NIP": "1982091 2021211005",
      Jabatan: "Kalab Jaringan Komputer",
      Email: "Rina.Andriyani@upnyk.ac.id",
      "No. Telepon": "081987654321",
    },
    {
      "Nama Lengkap": "Dr. Budi Santoso, M.Kom.",
      "NIDN/NIP": "1975112 2021211006",
      Jabatan: "Kalab Rekayasa Perangkat Lunak",
      Email: "Budi.Santoso@upnyk.ac.id",
      "No. Telepon": "081555443322",
    },
    {
      "Nama Lengkap": "Dr. Ani Wijayanti, S.Si., M.Eng.",
      "NIDN/NIP": "1988033 2021211007",
      Jabatan: "Kalab Sistem Informasi",
      Email: "Ani.Wijayanti@upnyk.ac.id",
      "No. Telepon": "081777665544",
    },
    {
      "Nama Lengkap": "Dr. Dedi Setiawan, S.Kom., M.M.",
      "NIDN/NIP": "1979074 2021211008",
      Jabatan: "Kalab Multimedia",
      Email: "Dedi.Setiawan@upnyk.ac.id",
      "No. Telepon": "081333221100",
    },
    {
      "Nama Lengkap": "Dr. Sri Mulyani, S.T., M.Si.",
      "NIDN/NIP": "1985125 2021211009",
      Jabatan: "Kalab Keamanan Informasi",
      Email: "Sri.Mulyani@upnyk.ac.id",
      "No. Telepon": "081888990011",
    },
    {
      "Nama Lengkap": "Dr. Taufik Hidayat, M.T.",
      "NIDN/NIP": "1972056 2021211010",
      Jabatan: "Kalab Komputasi",
      Email: "Taufik.Hidayat@upnyk.ac.id",
      "No. Telepon": "081444556677",
    },
    {
      "Nama Lengkap": "Dr. Andika Pratama, S.Si., M.Eng.",
      "NIDN/NIP": "1981087 2021211011",
      Jabatan: "Kalab Robotika",
      Email: "Andika.Pratama@upnyk.ac.id",
      "No. Telepon": "081666778899",
    },
    {
      "Nama Lengkap": "Dr. Rina Wulandari, M.Kom.",
      "NIDN/NIP": "1978028 2021211012",
      Jabatan: "Kalab Desain Grafis",
      Email: "Rina.Wulandari@upnyk.ac.id",
      "No. Telepon": "081222334455",
    },
    {
      "Nama Lengkap": "Dr. Budi Cahyono, S.T., M.Sc.",
      "NIDN/NIP": "1984119 2021211013",
      Jabatan: "Kalab Animasi",
      Email: "Budi.Cahyono@upnyk.ac.id",
      "No. Telepon": "081999001122",
    },
  ];
}

const filters = [
  //   {
  //     id: "update_at",
  //     title: "Semester",
  //     options: [
  //       {
  //         value: "Genap",
  //         label: "Genap",
  //       },
  //       {
  //         value: "Ganjil",
  //         label: "Ganjil",
  //       },
  //     ],
  //   },
];

export default async function Page() {
  const data = await getData();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">Data Kepala Laboratorium</h1>
      <p className="text-gray-500 mb-4">
        Daftar Kepala Laboratorium Informatika UPNYK
      </p>

      <div className="mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Jumlah Kepala Laboratorium</CardTitle>
            <CardDescription>Total keseluruhan kalab</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{data.length}</p>
          </CardContent>
        </Card>
      </div>

      <Link href="/kalab/new">
        <Button>
          <PlusCircle className="h-4 w-4 mr-2" />
          Tambah Kalab
        </Button>
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-6">
        {data.map((kalab, index) => (
          <Card key={index}>
            <CardHeader className="relative">
              <div className="absolute right-4 top-4">
                <MoreHorizontal className="h-5 w-5 text-gray-500 cursor-pointer hover:text-gray-700" />
              </div>
              <div className="relative w-24 rounded-full overflow-hidden h-24 mb-4">
                <img
                  src={`https://unsplash.it/200/200?random=${index}`}
                  alt="Profile Header"
                  className="w-full h-full object-cover rounded-t-lg"
                />
              </div>
              <CardTitle>{kalab["Nama Lengkap"]}</CardTitle>
              <CardDescription>{kalab["NIDN/NIP"]}</CardDescription>
              <CardDescription>{kalab.Jabatan}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-neutral-500 flex gap-2">
                <Mail className="h-4 w-4" /> Email: {kalab.Email}
              </p>
              <p className="text-sm text-neutral-500 flex gap-2">
                <PhoneCall className="h-4 w-4" /> No. Telepon:{" "}
                {kalab["No. Telepon"]}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
