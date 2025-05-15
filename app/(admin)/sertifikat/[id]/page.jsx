"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import React from "react"; // Make sure to import React
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import BackButton from "@/components/back-button";
import {
  getCertificateRequestByNim,
  approveCertificateRequest,
  rejectCertificateRequest,
  cancelCertificateStatus,
} from "../actions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export default function HonorAsistenDetail({ params }) {
  const router = useRouter();
  const { toast } = useToast();

  // Unwrap params with React.use()
  const unwrappedParams = React.use(params);
  const requestId = unwrappedParams.id;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rejectionReason, setRejectionReason] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [processingAction, setProcessingAction] = useState(false);

  // Fetch data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const requestData = await getCertificateRequestByNim(requestId);
        setData(requestData);
      } catch (error) {
        console.error("Error fetching certificate data:", error);
        toast({
          title: "Error",
          description: "Terjadi kesalahan saat mengambil data sertifikat",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [requestId, toast]);

  // Handle certificate approval
  const handleApprove = async () => {
    setProcessingAction(true);
    try {
      const result = await approveCertificateRequest(data.id);

      if (result.success) {
        toast({
          title: "Berhasil",
          description: "Permintaan sertifikat telah disetujui",
          variant: "success",
        });

        // Refresh data or redirect
        router.refresh();
        router.push("/sertifikat");
      } else {
        toast({
          title: "Gagal",
          description: result.error || "Gagal menyetujui permintaan sertifikat",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Terjadi kesalahan saat menyetujui sertifikat",
        variant: "destructive",
      });
    } finally {
      setProcessingAction(false);
    }
  };

  // Handle certificate rejection
  const handleReject = async () => {
    if (!rejectionReason.trim()) {
      toast({
        title: "Error",
        description: "Alasan penolakan tidak boleh kosong",
        variant: "destructive",
      });
      return;
    }

    setProcessingAction(true);
    try {
      const result = await rejectCertificateRequest(data.id, rejectionReason);

      if (result.success) {
        setDialogOpen(false);
        toast({
          title: "Berhasil",
          description: "Permintaan sertifikat telah ditolak",
          variant: "success",
        });

        // Refresh data or redirect
        router.refresh();
        router.push("/sertifikat");
      } else {
        toast({
          title: "Gagal",
          description: result.error || "Gagal menolak permintaan sertifikat",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Terjadi kesalahan saat menolak sertifikat",
        variant: "destructive",
      });
    } finally {
      setProcessingAction(false);
    }
  };

  // Add new handler for cancellation
  const handleCancelStatus = async () => {
    setProcessingAction(true);
    try {
      const result = await cancelCertificateStatus(data.id);

      if (result.success) {
        toast({
          title: "Berhasil",
          description: "Status sertifikat telah direset ke Pending",
          variant: "success",
        });

        // Refresh data or redirect
        router.refresh();
        router.push("/sertifikat");
      } else {
        toast({
          title: "Gagal",
          description: result.error || "Gagal mereset status sertifikat",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Terjadi kesalahan saat mereset status sertifikat",
        variant: "destructive",
      });
    } finally {
      setProcessingAction(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">Loading...</div>
    );
  }

  if (!data) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Permintaan Sertifikat</h1>
          <BackButton />
        </div>
        <div className="text-center p-6">
          <p>Data sertifikat tidak ditemukan</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Permintaan Sertifikat</h1>
        <div className="flex gap-2">
          <BackButton />
        </div>
      </div>
      <>
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm text-gray-500">Nama Mahasiswa</h3>
            <p className="font-medium">{data.nama_mahasiswa}</p>
          </div>
          <div>
            <h3 className="text-sm text-gray-500">NIM</h3>
            <p className="font-medium">{data.nim}</p>
          </div>
          <div>
            <h3 className="text-sm text-gray-500">Program Studi</h3>
            <p className="font-medium">{data.program_studi}</p>
          </div>
          <div>
            <h3 className="text-sm text-gray-500">Tahun Ajaran</h3>
            <p className="font-medium">{data.tahun_ajaran}</p>
          </div>
          <div>
            <h3 className="text-sm text-gray-500">Status</h3>
            <p className="font-medium">{data.status}</p>
          </div>
          <div>
            <h3 className="text-sm text-gray-500">Keterangan</h3>
            <p className="font-medium">{data.keterangan ?? "-"}</p>
          </div>
        </div>

        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead>No.</TableHead>
              <TableHead>Mata Kuliah Praktikum</TableHead>
              <TableHead>Tahun Ajaran</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.mata_kuliah_praktikum.map((matkul, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{matkul.nama}</TableCell>
                <TableCell>{matkul.tahun_ajaran}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="w-full flex mt-4">
          <div className="flex ms-auto gap-2">
            {data.status === "Pending" ? (
              // Show approval/rejection buttons if status is Pending
              <>
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      className="px-8"
                      variant="outline"
                      disabled={processingAction}
                    >
                      Tolak
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Tolak Permintaan Sertifikat</DialogTitle>
                      <DialogDescription>
                        Berikan alasan mengapa permintaan sertifikat ini
                        ditolak.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid items-center gap-4">
                        <Label htmlFor="alasan">Alasan Penolakan</Label>
                        <Textarea
                          id="alasan"
                          value={rejectionReason}
                          onChange={(e) => setRejectionReason(e.target.value)}
                          placeholder="Berikan alasan penolakan sertifikat"
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline">Batal</Button>
                      </DialogClose>
                      <Button
                        onClick={handleReject}
                        disabled={processingAction}
                      >
                        {processingAction ? "Memproses..." : "Tolak"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Button
                  className="px-8"
                  onClick={handleApprove}
                  disabled={processingAction}
                >
                  {processingAction ? "Memproses..." : "Setuju"}
                </Button>
              </>
            ) : (
              // Show cancel button if status is not Pending
              <Button
                className="px-8"
                variant="destructive"
                onClick={handleCancelStatus}
                disabled={processingAction}
              >
                {processingAction ? "Memproses..." : "Batalkan Status"}
              </Button>
            )}
          </div>
        </div>
      </>
    </div>
  );
}
