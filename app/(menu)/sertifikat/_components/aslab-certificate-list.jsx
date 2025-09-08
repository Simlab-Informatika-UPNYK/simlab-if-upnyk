"use client";

import { useState, useEffect } from "react";
import { getCertificateRequestsByAslab } from "../actions";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { DataTable } from "@/components/data-table/data-table";
import { aslabColumns } from "./aslab-columns";
import CreateCertificateDialog from "./create-certificate-dialog";

export default function AslabCertificateList({ aslabId }) {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const requestsData = await getCertificateRequestsByAslab(aslabId);
        setRequests(requestsData);
      } catch (error) {
        console.error("Error fetching certificate requests:", error);
        toast({
          title: "Error",
          description: "Gagal memuat data permintaan sertifikat",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [aslabId, toast]);

  const handleCreateSuccess = async () => {
    try {
      const requestsData = await getCertificateRequestsByAslab(aslabId);
      setRequests(requestsData);
      setShowCreateDialog(false);
      toast({
        title: "Berhasil",
        description: "Permintaan sertifikat berhasil dibuat",
        variant: "success",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal memuat data terbaru",
        variant: "destructive",
      });
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

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Daftar Permintaan Sertifikat</h1>
        <p className="text-gray-600">Kelola semua permintaan sertifikat Anda sebagai asisten laboratorium</p>
      </div>

      <div className="mb-4">
        <Button onClick={() => setShowCreateDialog(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Buat Permintaan Baru
        </Button>
      </div>

      <div>
        <DataTable columns={aslabColumns} data={requests} emptyMessage="Belum ada permintaan sertifikat" />
      </div>

      <CreateCertificateDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
        aslabId={aslabId}
        onSuccess={handleCreateSuccess}
      />
    </div>
  );
}
