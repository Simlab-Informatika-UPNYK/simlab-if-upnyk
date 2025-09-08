"use client";

import { useState } from "react";
import { createCertificateRequest } from "../actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export default function CreateCertificateDialog({ open, onOpenChange, aslabId, onSuccess }) {
  const [alasan, setAlasan] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!alasan.trim()) {
      toast({
        title: "Error",
        description: "Alasan pengajuan harus diisi",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const result = await createCertificateRequest(aslabId, alasan.trim());
      
      if (result.success) {
        onSuccess();
        setAlasan("");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Buat Permintaan Sertifikat Baru</DialogTitle>
          <DialogDescription>
            Isi alasan pengajuan sertifikat Anda. Permintaan akan diproses oleh admin.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="alasan">Alasan Pengajuan</Label>
            <Textarea
              id="alasan"
              placeholder="Jelaskan alasan Anda mengajukan permintaan sertifikat..."
              value={alasan}
              onChange={(e) => setAlasan(e.target.value)}
              required
              rows={4}
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Batal
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Mengajukan..." : "Ajukan Permintaan"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
