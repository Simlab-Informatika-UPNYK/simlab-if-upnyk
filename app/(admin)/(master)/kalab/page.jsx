"use client";

import { useState, useEffect } from "react";
import { DataTable } from "@/components/data-table/data-table";
import { columns } from "./_components/columns";
import {
  Mail,
  MoreHorizontal,
  PhoneCall,
  PlusCircle,
  Search,
} from "lucide-react";
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
import { getKalabData } from "./actions";
import { DeleteButton } from "./_components/delete-button.jsx";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Delete } from "./_components/delete.jsx";

export default function Page() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedKalab, setSelectedKalab] = useState(null);
  const itemsPerPage = 6;

  useEffect(() => {
    // Fetch data initially
    async function fetchData() {
      const fetchedData = await getKalabData();
      setData(fetchedData);
      setFilteredData(fetchedData);
    }
    fetchData();
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

  const handleDeleteClick = (e, kalab) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedKalab(kalab);
    setDeleteDialogOpen(true);
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
          <Link href={`/kalab/${kalab.slug}`} key={index}>
            <Card>
              <CardHeader className="relative">
                <div className="absolute right-4 top-4">
                  {!deleteDialogOpen && (
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        asChild
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <Link href={`/kalab/${kalab.slug}/edit`}>
                          <DropdownMenuItem
                            onClick={(e) => e.stopPropagation()}
                          >
                            <div className="flex items-center">
                              <Pencil className="mr-2 h-4 w-4" />
                              <span>Edit</span>
                            </div>
                          </DropdownMenuItem>
                        </Link>
                        <DropdownMenuItem
                          className="text-red-600"
                          onClick={(e) => handleDeleteClick(e, kalab)}
                        >
                          <div className="flex">
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>Hapus</span>
                          </div>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>
                <div className="relative w-24 rounded-full overflow-hidden h-24 mb-4">
                  <img
                    src={kalab.photo}
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

      {/* Separate AlertDialog */}
      {deleteDialogOpen && (
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent onClick={(e) => e.stopPropagation()}>
            <AlertDialogHeader>
              <AlertDialogTitle>Apakah anda yakin?</AlertDialogTitle>
              <AlertDialogDescription>
                Penghapusan bersifat permanen. Data mengenai Kepala Lab ini akan
                terhapus.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Batal</AlertDialogCancel>
              {selectedKalab && (
                <Delete
                  setDeleteDialogOpen={setDeleteDialogOpen}
                  slug={selectedKalab.slug}
                />
              )}
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}

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
          <p className="text-gray-500">
            No data found matching your search criteria.
          </p>
        </div>
      )}
    </div>
  );
}
