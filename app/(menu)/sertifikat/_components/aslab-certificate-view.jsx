"use client";

import { useState, useEffect } from "react";
import { getCertificateRequestsByAslab, createCertificateRequest } from "../actions";
import { Button } from "@/components/ui/button";
import { Plus, FileText, Clock, CheckCircle, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const statusIcons = {
  "Pending": <Clock className="h-4 w-4 text-yellow-600" />,
  "Disetujui": <CheckCircle className="h-4 w-4 text-green-600" />,
  "Ditolak": <XCircle className="h-4 w-4 text-red-600" />
};

const statusColors = {
  "Pending": "bg-yellow-100 text-yellow-800",
  "Disetujui": "bg-green-100 text-green-800",
  "Ditolak": "bg-red-100 text-red-800"
};

export default function AslabCertificateView({ aslabId }) {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const requestsData = await getCertificateRequestsByAslab(aslabId);
        setRequests(requestsData);
      } catch (error) {
        console.log("Tidak ada permintaan sertifikat yang ditemukan");
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [aslabId]);

  const handleCreateRequest = async () => {
    setCreating(true);
    try {
      const result = await createCertificateRequest(aslabId);
      
      if (result.success) {
        toast({
          title: "Berhasil",
          description: "Permintaan sertifikat berhasil dibuat",
          variant: "success",
        });
        // Refresh data
        const requestsData = await getCertificateRequestsByAslab(aslabId);
        setRequests(requestsData);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setCreating(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex justify-center items-center h-64">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  const latestRequest = requests.length > 0 ? requests[0] : null;

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Permintaan Sertifikat Saya</h1>
        <p className="text-gray-600">Kelola permintaan sertifikat Anda sebagai asisten laboratorium</p>
      </div>

      {!latestRequest ? (
        <div className="bg-white rounded-lg border p-6 text-center">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Belum ada permintaan sertifikat</h3>
          <p className="text-gray-600 mb-4">
            Anda belum membuat permintaan sertifikat. Klik tombol di bawah untuk membuat permintaan baru.
          </p>
          <Button onClick={handleCreateRequest} disabled={creating}>
            <Plus className="h-4 w-4 mr-2" />
            {creating ? "Membuat..." : "Buat Permintaan Sertifikat"}
          </Button>
        </div>
      ) : (
        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Status Permintaan Sertifikat</h3>
            <span className={`px-3 py-1 rounded-full text-sm flex items-center gap-2 ${statusColors[latestRequest.status]}`}>
              {statusIcons[latestRequest.status]}
              {latestRequest.status}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="text-sm text-gray-500">Nama Asisten</label>
              <p className="font-medium">{latestRequest.nama_asisten}</p>
            </div>
            <div>
              <label className="text-sm text-gray-500">NIM</label>
              <p className="font-medium">{latestRequest.nim}</p>
            </div>
            <div>
              <label className="text-sm text-gray-500">Tanggal Pengajuan</label>
              <p className="font-medium">{latestRequest.tanggal_pengajuan}</p>
            </div>
          </div>

          {latestRequest.keterangan && (
            <div>
              <label className="text-sm text-gray-500">Keterangan</label>
              <p className="font-medium text-red-600">{latestRequest.keterangan}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
