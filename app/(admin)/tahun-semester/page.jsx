import { DataTable } from "@/components/data-table/data-table"
import { columns } from "./_components/columns"
import { PlusCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

async function getData() {
    // Fetch data from your API here.
    return [
        {
            id: "124210321",
            file: "Semester Genap 2024 / 2025",
            update_at: "Genap",
            update_date: "23 Januari 2025"
        },
        {
            id: "124210331",
            file: "Semester Genap 2024 / 2025",
            update_at: "Genap",
            update_date: "23 Januari 2025"
        },
        {
            id: "124210332",
            file: "Semester Genap 2024 / 2025",
            update_at: "Genap",
            update_date: "23 Januari 2025"
        },
        {
            id: "124210333",
            file: "Semester Ganjil 2024 / 2025",
            update_at: "Ganjil",
            update_date: "23 September 2024"
        },
        {
            id: "124210334",
            file: "Semester Ganjil 2024 / 2025",
            update_at: "Ganjil",
            update_date: "23 September 2024"
        },
        {
            id: "124210335",
            file: "Semester Ganjil 2024 / 2025",
            update_at: "Ganjil",
            update_date: "23 September 2024"
        }
    ]
}

const filters = [
    {
        id: "update_at",
        title: "Semester",
        options: [
            {
                value: "Genap",
                label: "Genap",
            },
            {
                value: "Ganjil",
                label: "Ganjil",
            }
        ]
    },
]

export default async function Page() {
    const data = await getData()

    return (
        <div className="container mx-auto p-4">
            <DataTable toolbar={
                <Link href="/tahun-semester/new">
                    <Button><PlusCircle />Add Data</Button>
                </Link>
            } viewOptions={true} globalSearch={true} filters={filters} pagination={true} columns={columns} data={data} />
        </div>
    )
}
