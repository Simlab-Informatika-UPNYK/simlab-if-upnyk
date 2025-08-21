"use client";

import { useEffect, useState } from "react";
import { FormHonorPraktikum } from "../_components/form-honor-praktikum";
import { getAslab } from "../../../aslab/actions";
import { getAllPeriode } from "../actions";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function FormNewHonorPraktikum({ onSubmit, onCalculate }) {
  const [periodeOptions, setPeriodeOptions] = useState([]);
  const [aslabOptions, setAslabOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formInstance, setFormInstance] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [aslabData, periodeData] = await Promise.all([
          getAslab(),
          getAllPeriode()
        ]);
        
        const aslabOptions = aslabData.map(aslab => ({
          value: aslab.id_aslab.toString(),
          label: `${aslab.nim} - ${aslab.nama}`
        }));
        
        const periodeOptions = periodeData.map(p => ({
          value: p.slug,
          label: `${p.tahun_ajaran} ${p.semester}`
        }));
        
        setAslabOptions(aslabOptions);
        setPeriodeOptions(periodeOptions);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (values) => {
    try {
      // Konversi data untuk sesuai dengan format yang diharapkan
      const submitData = {
        ...values,
        aslab_id: parseInt(values.aslab_id),
        status_honor: values.status_honor || "Belum Diambil"
      };
      await onSubmit(submitData);
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="space-y-6">
      <FormHonorPraktikum
        initialData={null}
        onSubmitHandler={handleSubmit}
        successMessage="Honor praktikum berhasil dibuat"
        successRedirect="/admin/honor-praktikum"
        periodeOptions={periodeOptions}
        aslabOptions={aslabOptions}
        onFormInstance={setFormInstance}
      />
      
      <div className="flex justify-end gap-4 pt-4">
        <Button 
          type="button" 
          variant="outline"
          onClick={() => onCalculate && formInstance && onCalculate(formInstance.getValues())}
          disabled={!formInstance || !formInstance.getValues().aslab_id || !formInstance.getValues().periode}
        >
          Hitung Honor
        </Button>
        <Button 
          type="button" 
          variant="outline"
          onClick={() => router.back()}
        >
          Batal
        </Button>
      </div>
    </div>
  );
}
