"use client";

import { useState, useEffect } from "react";
import { DataTable } from "@/components/data-table/data-table";
import { columns } from "./_components/columns";
import { Mail, MoreHorizontal, PhoneCall, PlusCircle, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Dummy data function
function getData() {
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

export default function Page() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    // Fetch data initially
    const fetchedData = getData();
    setData(fetchedData);
    setFilteredData(fetchedData);
  }, []);

  useEffect(() => {
    // Filter data based on search query
    if (searchQuery) {
      const lowercasedQuery = searchQuery.toLowerCase();
      const filtered = data.filter((kalab) => {
        return (
          kalab["Nama Lengkap"].toLowerCase().includes(lowercasedQuery) ||
          kalab["NIDN/NIP"].toLowerCase().includes(lowercasedQuery) ||
          kalab["Jabatan"].toLowerCase().includes(lowercasedQuery) ||
          kalab["Email"].toLowerCase().includes(lowercasedQuery) ||
          kalab["No. Telepon"].toLowerCase().includes(lowercasedQuery)
        );
      });
      setFilteredData(filtered);
      setCurrentPage(1); // Reset to first page on new search
    } else {
      setFilteredData(data);
    }
  }, [searchQuery, data]);

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search kalab..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <Link href="/kalab/new">
          <Button>
            <PlusCircle className="h-4 w-4 mr-2" />
            Tambah Kalab
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-6">
        {currentItems.map((kalab, index) => (
          <Link href={`/kalab/${index}`} key={index}>
            <Card>
              <CardHeader className="relative">
                <div className="absolute right-4 top-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href={`/kalab/${index}/edit`}>
                          <div className="flex items-center">
                            <Pencil className="mr-2 h-4 w-4" />
                            <span>Edit</span>
                          </div>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="mr-2 h-4 w-4" />
                        <span>Hapus</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
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
          </Link>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            
            {[...Array(totalPages)].map((_, i) => (
              <Button
                key={i}
                variant={currentPage === i + 1 ? "default" : "outline"}
                size="sm"
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </Button>
            ))}
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {filteredData.length === 0 && (
        <div className="text-center py-10">
          <p className="text-gray-500">No data found matching your search criteria.</p>
        </div>
      )}
    </div>
  );
}
