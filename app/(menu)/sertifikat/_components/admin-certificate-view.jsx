"use client";

import { useState, useEffect } from "react";
import { getAllCertificateRequests, updateCertificateStatus } from "../actions";
import { DataTable } from "@/components/data-table/data-table";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";

export default function AdminCertificateView() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentRequest, setCurrentRequest] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [keterangan, setKeterangan] = useState("");
  const [updating, setUpdating] = useState(false);
  const { toast } = useToast();

  const statusColors = {
    Pending: "bg-yellow-100 text-yellow-800",
    Disetujui: "bg-green-100 text-green-800",
    Ditolak: "bg-red-100 text-red-800",
  };

  const columns = [
    {
      header: "NIM",
      id: "nim",
      accessorKey: "nim",
    },
    {
      header: "Nama Asisten",
      id: "nama_asisten",
      accessorKey: "nama_asisten",
    },
    {
      header: "Tanggal Pengajuan",
      id: "tanggal_pengajuan",
      accessorKey: "tanggal_pengajuan",
    },
    {
      header: "Alasan",
      id: "alasan",
      accessorKey: "alasan",
      cell: ({ row }) => {
        const alasan = row.original.alasan;
        return (
          <div className="max-w-md">
            <p className="text-sm line-clamp-2">{alasan || "-"}</p>
          </div>
        );
      },
    },
    {
      header: "Status",
      id: "status",
      accessorKey: "status",
      cell: ({ row }) => {
        const request = row.original;
        const [updating, setUpdating] = useState(false);

        const handleStatusChange = async (newStatus) => {
          if (newStatus === "Ditolak") {
            // Buka dialog untuk alasan penolakan
            setCurrentRequest(request);
            setSelectedStatus(newStatus);
            setKeterangan("");
            setEditModalOpen(true);
            return;
          }

          try {
            setUpdating(true);
            await updateCertificateStatus(request.id, newStatus, null);
            toast({
              title: "Berhasil",
              description: `Status berhasil diubah menjadi ${newStatus}`,
            });

            // Refresh data
            const refreshedData = await getAllCertificateRequests();
            setRequests(refreshedData || []);
          } catch (error) {
            toast({ title: "Gagal", description: `Error: ${error.message}` });
          } finally {
            setUpdating(false);
          }
        };

        return (
          <Select value={request.status || "Pending"} onValueChange={handleStatusChange} disabled={updating}>
            <SelectTrigger className="border-0 shadow-none">
              <div className="flex items-center gap-2">
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    statusColors[request.status] || "bg-gray-100 text-gray-800"
                  }`}
                >
                  {request.status || "Pending"}
                </span>
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Pending">
                <div className="flex items-center gap-2">
                  <span className="text-yellow-800">Pending</span>
                </div>
              </SelectItem>
              <SelectItem value="Disetujui">
                <div className="flex items-center gap-2">
                  <span className="text-green-800">Disetujui</span>
                </div>
              </SelectItem>
              <SelectItem value="Ditolak">
                <div className="flex items-center gap-2">
                  <span className="text-red-800">Ditolak</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        );
      },
    },
    {
      header: "Keterangan",
      id: "keterangan",
      accessorKey: "keterangan",
      cell: ({ row }) => {
        const keterangan = row.original.keterangan;
        return (
          <div className="max-w-md">
            <p className="text-sm text-gray-600">{keterangan || "-"}</p>
          </div>
        );
      },
    },
    {
      header: "Aksi",
      id: "aksi",
      cell: ({ row }) => {
        const request = row.original;

        return (
          <div className="flex gap-2">
            <Link href={`/sertifikat/${request.nim}`}>
              <Button variant="outline" size="sm">
                Lihat Detail
              </Button>
            </Link>
          </div>
        );
      },
    },
  ];

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setError(null);
        const data = await getAllCertificateRequests();
        setRequests(data || []);
      } catch (error) {
        console.error("Gagal memuat data permintaan sertifikat:", error);
        setError("Gagal memuat data permintaan sertifikat");
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const handleStatusChange = async () => {
    if (!selectedStatus || !currentRequest) return;

    let reason = null;

    if (selectedStatus === "Ditolak" && !keterangan) {
      toast({
        title: "Gagal",
        description: "Keterangan wajib diisi untuk status Ditolak",
      });

      return;
    }

    if (selectedStatus === "Ditolak") {
      reason = keterangan;
    }

    try {
      setUpdating(true);
      await updateCertificateStatus(currentRequest.id, selectedStatus, reason);
      toast({
        title: "Berhasil",
        description: `Status berhasil diubah menjadi ${selectedStatus}`,
      });
      setEditModalOpen(false);
      setKeterangan("");

      // Refresh data tanpa reload page
      const refreshedData = await getAllCertificateRequests();
      setRequests(refreshedData || []);
    } catch (error) {
      toast({ title: "Gagal", description: `Error: ${error.message}` });
    } finally {
      setUpdating(false);
    }
  };

  const handleCancelEdit = () => {
    setEditModalOpen(false);
    setKeterangan("");
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex justify-center items-center h-64">
          <p>Memuat data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Coba Lagi
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Kelola Permintaan Sertifikat</h1>
        <p className="text-gray-600">Kelola semua permintaan sertifikat dari asisten laboratorium</p>
      </div>

      {requests.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">Tidak ada permintaan sertifikat</p>
        </div>
      ) : (
        <DataTable columns={columns} data={requests} globalSearch={true} pagination={true} viewOptions={true} />
      )}

      <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Alasan Penolakan</DialogTitle>
          </DialogHeader>

          {currentRequest && (
            <div className="space-y-4">
              <div>
                <Textarea
                  placeholder="Masukkan alasan penolakan..."
                  value={keterangan}
                  onChange={(e) => setKeterangan(e.target.value)}
                  className="w-full p-2 text-sm border rounded-md resize-none"
                  rows={3}
                  required
                />
              </div>

              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={handleCancelEdit} disabled={updating}>
                  Batal
                </Button>
                <Button onClick={handleStatusChange} disabled={updating || !keterangan.trim()}>
                  {updating ? "Menyimpan..." : "Simpan"}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
