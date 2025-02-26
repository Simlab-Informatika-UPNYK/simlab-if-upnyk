import { DataTable } from "@/components/data-table/data-table";
import { columns } from "./_components/columns";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

async function getData() {
  // Fetch data from your API here.
  // Static data for academic years from 2018/2019 to 2025/2026
  return [
    {
      id: "20181",
      tahun: "2018 / 2019",
      semester: "Ganjil",
      update_date: "23 September 2018",
      slug: "ganjil-2018-2019"
    },
    {
      id: "20182",
      tahun: "2018 / 2019",
      semester: "Genap",
      update_date: "23 Januari 2019",
      slug: "genap-2018-2019"
    },
    {
      id: "20191",
      tahun: "2019 / 2020",
      semester: "Ganjil",
      update_date: "23 September 2019",
      slug: "ganjil-2019-2020"
    },
    {
      id: "20192",
      tahun: "2019 / 2020",
      semester: "Genap",
      update_date: "23 Januari 2020",
      slug: "genap-2019-2020"
    },
    {
      id: "20201",
      tahun: "2020 / 2021",
      semester: "Ganjil",
      update_date: "23 September 2020",
      slug: "ganjil-2020-2021"
    },
    {
      id: "20202",
      tahun: "2020 / 2021",
      semester: "Genap",
      update_date: "23 Januari 2021",
      slug: "genap-2020-2021"
    },
    {
      id: "20211",
      tahun: "2021 / 2022",
      semester: "Ganjil",
      update_date: "23 September 2021",
      slug: "ganjil-2021-2022"
    },
    {
      id: "20212",
      tahun: "2021 / 2022",
      semester: "Genap",
      update_date: "23 Januari 2022",
      slug: "genap-2021-2022"
    },
    {
      id: "20221",
      tahun: "2022 / 2023",
      semester: "Ganjil",
      update_date: "23 September 2022",
      slug: "ganjil-2022-2023"
    },
    {
      id: "20222",
      tahun: "2022 / 2023",
      semester: "Genap",
      update_date: "23 Januari 2023",
      slug: "genap-2022-2023"
    },
    {
      id: "20231",
      tahun: "2023 / 2024",
      semester: "Ganjil",
      update_date: "23 September 2023",
      slug: "ganjil-2023-2024"
    },
    {
      id: "20232",
      tahun: "2023 / 2024",
      semester: "Genap",
      update_date: "23 Januari 2024",
      slug: "genap-2023-2024"
    },
    {
      id: "20241",
      tahun: "2024 / 2025",
      semester: "Ganjil",
      update_date: "23 September 2024",
      slug: "ganjil-2024-2025"
    },
    {
      id: "20242",
      tahun: "2024 / 2025",
      semester: "Genap",
      update_date: "23 Januari 2025",
      slug: "genap-2024-2025"
    },
    {
      id: "20251",
      tahun: "2025 / 2026",
      semester: "Ganjil",
      update_date: "23 September 2025",
      slug: "ganjil-2025-2026"
    },
    {
      id: "20252",
      tahun: "2025 / 2026",
      semester: "Genap",
      update_date: "23 Januari 2026",
      slug: "genap-2025-2026"
    }
  ];
}


export default async function Page() {
  const data = await getData();

  return (
    <>
      <div className="container mx-auto px-4 py-2">
        {/* <h1 className="text-xl font-bold">Data Tahun Semester</h1> */}
        <DataTable
          toolbar={
            <Link href="/tahun-semester/new">
              <Button>
                <PlusCircle />
                Add Data
              </Button>
            </Link>
          }
          viewOptions={true}
          globalSearch={true}
          pagination={true}
          columns={columns}
          data={data}
        />
      </div>
    </>
  );
}
