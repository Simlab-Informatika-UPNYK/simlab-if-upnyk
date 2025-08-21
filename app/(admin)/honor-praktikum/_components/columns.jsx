"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

export const columns = [
  {
    accessorKey: "no",
    header: () => "No",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "semester",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="px-0 hover:bg-black/0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Tahun Ajaran & Semester
          <ArrowUpDown />
        </Button>
      );
    },
    sortingFn: (rowA, rowB) => {
      const tahunA = rowA.original.tahun_ajaran;
      const tahunB = rowB.original.tahun_ajaran;
      const semesterA = rowA.original.semester;
      const semesterB = rowB.original.semester;

      // Urutkan berdasarkan tahun ajaran dulu, lalu semester
      if (tahunA !== tahunB) {
        return tahunA.localeCompare(tahunB);
      }
      return semesterA.localeCompare(semesterB);
    },
    cell: ({ row }) => {
      const data = row.original;
      return (
        <Link
          href={`/honor-praktikum/${data.slug}`}
          className="text-blue-600"
        >
          {data.tahun_ajaran} Semester {data.semester}
        </Link>
      );
    },
  },
];

/*   {tahunSemester.map((semester) => (
            <Link key={semester.id} href={`/admin/honor-praktikum/${semester.slug}`}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                <CardHeader>
                  <CardTitle className="text-xl">
                    {semester.tahun_ajaran}
                  </CardTitle>
                  <CardDescription>
                    Semester {semester.semester}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">
                      Klik untuk melihat detail
                    </span>
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))} */
