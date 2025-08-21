"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import FormNewHonorPraktikum from "./form-new-honor-praktikum";
import {
  createHonorPraktikum,
  calculateHonorForAslab,
  getTahunSemesterId,
} from "../actions";
import { useToast } from "@/hooks/use-toast";

export default function NewHonorPraktikumPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [honorCalculation, setHonorCalculation] = useState(null);
  const [showCalculation, setShowCalculation] = useState(false);

  const handleSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const result = await createHonorPraktikum(data);

      if (result.success) {
        toast({
          title: "Berhasil",
          description: `Data honor praktikum berhasil ditambahkan. Total honor: Rp. ${
            result.honor_calculation?.total_honor?.toLocaleString("id-ID") || 0
          }`,
        });
        router.push("/admin/honor-praktikum");
      } else {
        toast({
          title: "Gagal",
          description: result.error || "Gagal menambahkan data honor praktikum",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Terjadi kesalahan saat menambahkan data",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCalculate = async (data) => {
    try {
      const tahunSemesterId = await getTahunSemesterId(data.periode);
      if (!tahunSemesterId) {
        toast({
          title: "Error",
          description: "Periode tidak valid",
          variant: "destructive",
        });
        return;
      }

      const calculation = await calculateHonorForAslab(
        parseInt(data.aslab_id),
        tahunSemesterId
      );

      setHonorCalculation(calculation);
      setShowCalculation(true);

      toast({
        title: "Perhitungan Honor",
        description: `Total honor: Rp. ${calculation.total_honor.toLocaleString(
          "id-ID"
        )} (${calculation.jumlah_kelas} kelas)`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal menghitung honor",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Tambah Honor Praktikum</h1>
        <p className="text-muted-foreground">
          Tambah data honor praktikum asisten laboratorium
        </p>
      </div>

      {showCalculation && honorCalculation && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-blue-800 mb-2">
            Hasil Perhitungan Honor
          </h3>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>Nama Asisten:</div>
            <div className="font-medium">{honorCalculation.aslab_nama}</div>
            <div>NIM:</div>
            <div className="font-medium">{honorCalculation.aslab_nim}</div>
            <div>Jumlah Kelas:</div>
            <div className="font-medium">{honorCalculation.jumlah_kelas}</div>
            <div>Total Honor:</div>
            <div className="font-bold text-green-600">
              Rp. {honorCalculation.total_honor.toLocaleString("id-ID")}
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg border p-6">
        <FormNewHonorPraktikum
          onSubmit={handleSubmit}
          onCalculate={handleCalculate}
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
}
