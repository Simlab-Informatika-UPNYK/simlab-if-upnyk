"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Folder } from "lucide-react";
import FolderFormDialog from "./_components/folder-form-dialog";
import DeleteFolderButton from "./_components/delete-folder-button";

// Data folder default
const defaultFolderData = [
  {
    title: "Komputasi",
    url: "/komputasi",
  },
  {
    title: "Jaringan",
    url: "/jaringan",
  },
  {
    title: "IoT",
    url: "/iot",
  },
  {
    title: "Basis Data",
    url: "/basis-data",
  },
  {
    title: "Multimedia",
    url: "/multimedia",
  },
  {
    title: "Geoinformatika",
    url: "/geoinformatika",
  },
  {
    title: "Pemrograman",
    url: "/pemrograman",
  },
  {
    title: "RBPL",
    url: "/rbpl",
  },
  {
    title: "PPSI",
    url: "/ppsi",
  },
  {
    title: "LAB 10 (TI Komputasi)",
    url: "/lab-10-ti-komputasi",
  },
  {
    title: "LAB 11 (TI Studio Desain)",
    url: "/lab-11-ti-studio-desain",
  },
  {
    title: "Perangkat Jaringan",
    url: "/perangkat-jaringan",
  },
];

const Page = () => {
  const [folderData, setFolderData] = useState([]);
  const [refreshFlag, setRefreshFlag] = useState(0);

  useEffect(() => {
    // Ambil data folder dari localStorage atau gunakan data default
    const savedFolders = localStorage.getItem("lab-folders");
    if (savedFolders) {
      setFolderData(JSON.parse(savedFolders));
    } else {
      // Jika belum ada data, gunakan data default dan simpan ke localStorage
      localStorage.setItem("lab-folders", JSON.stringify(defaultFolderData));
      setFolderData(defaultFolderData);
    }
  }, [refreshFlag]);

  // Handler untuk refresh data setelah add/edit/delete
  const refreshData = () => {
    setRefreshFlag(prev => prev + 1);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Inventaris Lab</h1>
        <FolderFormDialog onSuccess={refreshData}>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Tambah Folder
          </Button>
        </FolderFormDialog>
      </div>

      <div className="">
        <ul className="space-y-2">
          {folderData.map((folder, index) => (
            <li
              key={index}
              className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <Link
                href={`/inventaris-lab${folder.url}`}
                className="flex items-center flex-grow"
              >
                <Folder className="w-5 h-5 mr-3 text-blue-500" />
                <span className="font-medium text-blue-600">
                  {folder.title}
                </span>
              </Link>
              
              <div className="flex items-center space-x-1">
                <FolderFormDialog 
                  mode="edit" 
                  initialData={folder} 
                  onSuccess={refreshData}
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-gray-500 hover:text-blue-600 hover:bg-blue-50"
                    title="Edit"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                </FolderFormDialog>
                
                <DeleteFolderButton 
                  folder={folder} 
                  onSuccess={refreshData} 
                />
              </div>
            </li>
          ))}
          
          {folderData.length === 0 && (
            <li className="p-8 text-center text-gray-500">
              Belum ada folder. Klik tombol "Tambah Folder" untuk membuat folder baru.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Page;
