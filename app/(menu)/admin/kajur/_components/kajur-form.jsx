"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getKajur, updateKajur, uploadSignature } from "../actions";

const formSchema = z.object({
  nama: z.string().min(1, "Nama wajib diisi"),
  nip: z.string().min(1, "NIP wajib diisi"),
});

export default function KajurForm() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [kajurData, setKajurData] = useState(null);
  const [signaturePreview, setSignaturePreview] = useState(null);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nama: "",
      nip: "",
    },
  });

  useEffect(() => {
    const fetchKajurData = async () => {
      try {
        const data = await getKajur();
        setKajurData(data);
        
        if (data) {
          form.reset({
            nama: data.nama || "",
            nip: data.nip || "",
          });
          
          if (data.tanda_tangan) {
            setSignaturePreview(data.tanda_tangan);
          }
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Gagal memuat data kajur",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchKajurData();
  }, [form, toast]);

  const onSubmit = async (values) => {
    try {
      setUpdating(true);
      const result = await updateKajur(values);

      if (result.success) {
        toast({
          title: "Berhasil",
          description: "Data kajur berhasil diperbarui",
        });
        setKajurData(result.data);
      } else {
        toast({
          title: "Error",
          description: "Gagal memperbarui data kajur",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUpdating(false);
    }
  };

  const handleSignatureUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Preview gambar
    const reader = new FileReader();
    reader.onload = (e) => {
      setSignaturePreview(e.target.result);
    };
    reader.readAsDataURL(file);

    // Upload ke server
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("signature", file);
      
      const result = await uploadSignature(formData);

      if (result.success) {
        toast({
          title: "Berhasil",
          description: "Tanda tangan berhasil diupload",
        });
        setKajurData(result.data);
        // Update preview dengan URL yang benar dari server
        setSignaturePreview(result.filePath);
      } else {
        toast({
          title: "Error",
          description: "Gagal mengupload tanda tangan",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      setSignaturePreview(null);
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>Memuat data...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Kelola Data Kepala Jurusan</CardTitle>
          <CardDescription>
            Update informasi kepala jurusan untuk sertifikat
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="nama"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama Kepala Jurusan</FormLabel>
                      <FormControl>
                        <Input placeholder="Masukkan nama lengkap" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="nip"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>NIP</FormLabel>
                      <FormControl>
                        <Input placeholder="Masukkan NIP" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-4">
                <FormItem>
                  <FormLabel>Tanda Tangan</FormLabel>
                  <FormControl>
                    <div className="space-y-4">
                      <Input
                        type="file"
                        accept="image/jpeg,image/png,image/jpg"
                        onChange={handleSignatureUpload}
                        disabled={uploading}
                      />
                      <p className="text-sm text-gray-500">
                        Format: JPG, JPEG, atau PNG. Maksimal 2MB
                      </p>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>

                {signaturePreview && (
                  <div className="mt-4">
                    <p className="text-sm font-medium mb-2">Preview Tanda Tangan:</p>
                    <img
                      src={signaturePreview}
                      alt="Preview Tanda Tangan"
                      className="max-w-xs border rounded-md p-2"
                    />
                  </div>
                )}
              </div>

              <Button type="submit" disabled={updating || uploading}>
                {updating ? "Menyimpan..." : "Simpan Perubahan"}
              </Button>
            </form>
          </Form>

          {kajurData && (
            <div className="mt-8 p-4 bg-gray-50 rounded-md">
              <h3 className="font-semibold mb-2">Data Saat Ini:</h3>
              <p><strong>Nama:</strong> {kajurData.nama}</p>
              <p><strong>NIP:</strong> {kajurData.nip}</p>
              {kajurData.tanda_tangan && (
                <p><strong>Tanda Tangan:</strong> Terupload</p>
              )}
              <p className="text-sm text-gray-500 mt-2">
                Terakhir diperbarui: {new Date(kajurData.updated_at || kajurData.created_at).toLocaleDateString('id-ID')}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
