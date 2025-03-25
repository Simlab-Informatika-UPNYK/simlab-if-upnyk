"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createClient } from "@/utils/supabase/client";
import { AslabPicker } from "@/components/aslab-picker";
import slugify from "react-slugify";

// Updated schema to match the new form with asisten as array
const formSchema = z.object({
  kelas: z.string().min(1, { message: "Kelas harus diisi" }),
  id_mk: z.coerce
    .number()
    .int()
    .positive({ message: "Mata kuliah harus dipilih" }),
  id_dosen: z.coerce
    .number()
    .int()
    .positive({ message: "Dosen harus dipilih" }),
  jumlah_praktikan: z.coerce
    .number()
    .int()
    .positive({ message: "Jumlah praktikan harus diisi" }),
  hari: z.string().min(1, { message: "Hari harus dipilih" }),
  lab: z.coerce.number().int().positive({ message: "Lab harus dipilih" }),
  asisten: z
    .array(z.string().uuid())
    .min(1, { message: "Pilih minimal 1 asisten" }),
  jenis_praktikan: z
    .string()
    .min(1, { message: "Jenis praktikan harus dipilih" }),
  waktu: z.string().min(1, { message: "Waktu harus diisi" }),
});

export function FormEditJadwal({ jadwal }) {
  const { toast } = useToast();
  const router = useRouter();
  const supabase = createClient();

  // State for storing fetched data for dropdowns
  const [mataKuliah, setMataKuliah] = useState([]);
  const [dosen, setDosen] = useState([]);
  const [labs, setLabs] = useState([]);
  const [aslab, setAslab] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      kelas: jadwal.kelas || "",
      id_mk: jadwal.id_mk?.toString() || "",
      id_dosen: jadwal.id_dosen?.toString() || "",
      jumlah_praktikan: jadwal.jumlah_praktikan?.toString() || "",
      hari: jadwal.hari || "",
      lab: jadwal.lab?.toString() || "",
      asisten: [], // Will be populated after fetching
      jenis_praktikan: jadwal.jenis_praktikan || "",
      waktu: jadwal.waktu || "",
    },
  });

  // Fetch data for dropdowns
  useEffect(() => {
    async function fetchReferenceData() {
      try {
        setLoading(true);

        // Fetch mata kuliah data
        const { data: mkData, error: mkError } = await supabase
          .from("mata_kuliah_praktikum")
          .select("id, nama");

        if (mkError) throw mkError;
        setMataKuliah(mkData || []);

        // Fetch dosen data
        const { data: dosenData, error: dosenError } = await supabase
          .from("dosen_pengampu")
          .select("id, nama");

        if (dosenError) throw dosenError;
        setDosen(dosenData || []);

        // Fetch lab data
        const { data: labData, error: labError } = await supabase
          .from("lab")
          .select("id, nama");

        if (labError) throw labError;
        setLabs(labData || []);

        // Fetch aslab data
        const { data: aslabData, error: aslabError } = await supabase
          .from("aslab")
          .select("id_aslab, nama, nim");

        if (aslabError) throw aslabError;
        setAslab(aslabData || []);
      } catch (error) {
        console.error("Error fetching reference data:", error);
        toast({
          title: "Error",
          description: "Gagal mengambil data referensi",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }

    fetchReferenceData();
  }, [supabase, toast]);

  // Fetch existing assistants for this class
  useEffect(() => {
    async function fetchAssistants() {
      if (!jadwal.id) return;

      try {
        const { data, error } = await supabase
          .from("kelas_aslab")
          .select("aslab")
          .eq("kelas", jadwal.id);

        if (error) throw error;

        // Extract aslab IDs and set in form
        const aslabIds = data.map((item) => item.aslab);

        // Convert legacy format if needed (from id_asisten1 and id_asisten2)
        form.setValue("asisten", aslabIds);
      } catch (error) {
        console.error("Error fetching assistants:", error);
      }
    }

    fetchAssistants();
  }, [jadwal.id, supabase, form]);

  async function onSubmit(values) {
    try {
      setIsSubmitting(true);
      const selectedMK = mataKuliah.find(
        (mk) => mk.id.toString() === values.id_mk.toString()
      );
      const mkNama = selectedMK ? selectedMK.nama : "";

      const { data, error } = await supabase
        .from("kelas_praktikum")
        .update({
          kelas: values.kelas,
          mata_kuliah: values.id_mk,
          id_dosen: values.id_dosen,
          jumlah_praktikan: values.jumlah_praktikan,
          hari: values.hari,
          lab: values.lab,
          jenis_praktikan: values.jenis_praktikan,
          waktu: values.waktu,
          slug: slugify(`${mkNama} ${values.kelas}`),
        })
        .eq("id", jadwal.id)
        .select();

      if (error) {
        throw error;
      }

      // First delete all existing assistant relationships for this class
      const { error: deleteError } = await supabase
        .from("kelas_aslab")
        .delete()
        .eq("kelas", jadwal.id);

      if (deleteError) throw deleteError;

      // Then insert the new assistant relationships
      if (values.asisten && values.asisten.length > 0) {
        const aslabInserts = values.asisten.map((aslabId) => ({
          kelas: jadwal.id,
          aslab: aslabId,
        }));

        const { error: aslabError } = await supabase
          .from("kelas_aslab")
          .insert(aslabInserts);

        if (aslabError) throw aslabError;
      }

      toast({
        title: "Berhasil Memperbarui",
        description: `Jadwal praktikum kelas ${values.kelas} telah berhasil diperbarui`,
      });

      router.push("/jadwal-praktikum");
      router.refresh();
    } catch (error) {
      console.error("Error updating jadwal praktikum:", error);
      toast({
        title: "Gagal Memperbarui",
        description:
          error.message || "Terjadi kesalahan saat memperbarui jadwal",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  if (loading) {
    return <div className="p-4">Loading data referensi...</div>;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="kelas"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">Kelas</FormLabel>
              <FormControl>
                <Input placeholder="Contoh: IF-A" {...field} />
              </FormControl>
              <FormMessage className="text-sm text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="id_mk"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">
                Mata Kuliah Praktikum
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Mata Kuliah" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {mataKuliah.map((mk) => (
                    <SelectItem key={mk.id} value={mk.id.toString()}>
                      {mk.nama}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage className="text-sm text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="id_dosen"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">
                Dosen Pengampu
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Dosen" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {dosen.map((d) => (
                    <SelectItem key={d.id} value={d.id.toString()}>
                      {d.nama}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage className="text-sm text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="jumlah_praktikan"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">
                Jumlah Praktikan
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Jumlah praktikan"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-sm text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="hari"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">Hari</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Hari" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Senin">Senin</SelectItem>
                  <SelectItem value="Selasa">Selasa</SelectItem>
                  <SelectItem value="Rabu">Rabu</SelectItem>
                  <SelectItem value="Kamis">Kamis</SelectItem>
                  <SelectItem value="Jumat">Jumat</SelectItem>
                  <SelectItem value="Sabtu">Sabtu</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage className="text-sm text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lab"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">
                Laboratorium
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Lab" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {labs.map((lab) => (
                    <SelectItem key={lab.id} value={lab.id.toString()}>
                      {lab.nama}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage className="text-sm text-red-500" />
            </FormItem>
          )}
        />

        {/* Replace the separate asisten1 and asisten2 fields with a single asisten field */}
        <FormField
          control={form.control}
          name="asisten"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">Asisten</FormLabel>
              <div className="space-y-2">
                <AslabPicker
                  options={aslab.map((a) => ({
                    value: a.id_aslab,
                    label: a.nama,
                    nim: a.nim,
                  }))}
                  value={field.value}
                  onChange={field.onChange}
                />
              </div>
              <FormMessage className="text-sm text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="jenis_praktikan"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">
                Jenis Praktikan
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Jenis Praktikan" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Reguler">Reguler</SelectItem>
                  <SelectItem value="Spesial">Spesial</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage className="text-sm text-red-500" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="waktu"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">Waktu</FormLabel>
              <FormControl>
                <Input placeholder="Contoh: 13:00 - 15:00" {...field} />
              </FormControl>
              <FormMessage className="text-sm text-red-500" />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={isSubmitting}
          >
            Batal
          </Button>
          <Button type="submit" className="px-6" disabled={isSubmitting}>
            {isSubmitting ? "Menyimpan..." : "Simpan"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
