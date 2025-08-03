"use client";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";

const AslabTable = ({ data, onSelect, initialSearch = "" }) => {
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [filteredData, setFilteredData] = useState(data);

  useEffect(() => {
    const filtered = data.filter((aslab) => {
      const searchLower = searchQuery.toLowerCase();
      return (
        aslab.nama.toLowerCase().includes(searchLower) ||
        aslab.nim.toLowerCase().includes(searchLower) ||
        aslab.program_studi.toLowerCase().includes(searchLower)
      );
    });
    setFilteredData(filtered);
  }, [searchQuery, data]);

  return (
    <div className="space-y-4">
      <Input
        placeholder="Cari mahasiswa..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="max-w-sm"
      />

      <div className="border rounded-md overflow-hidden">
        <div className="overflow-y-auto" style={{ maxHeight: "400px" }}>
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nama
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Program Studi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.length > 0 ? (
                filteredData.map((aslab) => (
                  <tr 
                    key={aslab.nim}
                    onClick={() => onSelect(aslab)}
                    className="cursor-pointer hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-blue-600">
                        {aslab.nama} ({aslab.nim})
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {aslab.program_studi}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={2} className="px-6 py-4 text-center text-gray-500">
                    Tidak ada data mahasiswa
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AslabTable;
