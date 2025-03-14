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
  id_asisten1: z.string().uuid({ message: "Asisten 1 harus dipilih" }),
  id_asisten2: z.string().uuid().optional(),
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
      id_asisten1: jadwal.id_asisten1 || "",
      id_asisten2: jadwal.id_asisten2 || "",
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
          .select("id_aslab, nama");

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

  async function onSubmit(values) {
    try {
      setIsSubmitting(true);
      
      const { data, error } = await supabase
        .from("kelas_praktikum")
        .update({
          kelas: values.kelas,
          id_mk: values.id_mk,
          id_dosen: values.id_dosen,
          jumlah_praktikan: values.jumlah_praktikan,
          hari: values.hari,
          lab: values.lab,
          id_asisten1: values.id_asisten1,
          id_asisten2: values.id_asisten2 || null,
          jenis_praktikan: values.jenis_praktikan,
          waktu: values.waktu,
        })
        .eq("id", jadwal.id)
        .select();

      if (error) {
        throw error;
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

        <FormField
          control={form.control}
          name="id_asisten1"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">Asisten 1</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Asisten 1" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {aslab.map((a) => (
                    <SelectItem key={a.id_aslab} value={a.id_aslab}>
                      {a.nama}
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
          name="id_asisten2"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium">
                Asisten 2
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Asisten 2" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {aslab.map((a) => (
                    <SelectItem key={a.id_aslab} value={a.id_aslab}>
                      {a.nama}
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