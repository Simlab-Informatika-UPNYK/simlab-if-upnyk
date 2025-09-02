"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { createJadwal, updateJadwal } from "../actions";
import { jadwalPraktikumSchema } from "./form-schema";
import { useRouter } from "next/navigation";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AslabPicker } from "@/components/aslab-picker";
import { Input } from "@/components/ui/input";

export function FormJadwalPraktikum({
  defaultValues = null,
  id,
  mataKuliahOptions = [],
  dosenOptions = [],
  labOptions = [],
  aslabOptions = [],
  tahunSemesterOptions = [],
  currentAslabId = null,
}) {
  const { toast } = useToast();
  const router = useRouter();

  const resolver = async (values, context, options) => {
    const mapped = {
      ...values,
      aslabIds: values.aslabIds.map((e) => e.value ?? null),
    };
    console.log("mapped");
    console.log(mapped);
    return zodResolver(jadwalPraktikumSchema)(mapped, context, options);
  };

  const form = useForm({
    resolver,
    defaultValues: defaultValues || {
      kelas: "",
      mataKuliahId: "",
      dosenPengampuId: "",
      jumlahPraktikan: 0,
      hari: "",
      labId: "",
      aslabIds: [],
      jenisPraktikan: "",
      waktu: "",
      tahunSemesterId: "",
    },
  });

  async function onSubmit(values) {
    try {
      if (id) {
        await updateJadwal(id, values);
      } else {
        await createJadwal(values);
      }
      toast({
        title: "Berhasil",
        description: "Data jadwal berhasil disimpan",
      });
      router.push("/jadwal-praktikum");
    } catch (error) {
      toast({
        title: "Gagal",
        description: error.message || "Terjadi kesalahan",
        variant: "destructive",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Kelas */}
        <FormField
          control={form.control}
          name="kelas"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Kelas</FormLabel>
              <FormControl>
                <Input placeholder="Contoh: IF-A" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Mata Kuliah */}
        <FormField
          control={form.control}
          name="mataKuliahId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mata Kuliah</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Mata Kuliah" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {mataKuliahOptions.map((mk) => (
                    <SelectItem key={mk.id} value={mk.id.toString()}>
                      {mk.nama}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Dosen Pengampu */}
        <FormField
          control={form.control}
          name="dosenPengampuId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dosen Pengampu</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Dosen" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {dosenOptions.map((d) => (
                    <SelectItem key={d.id} value={d.id.toString()}>
                      {d.nama}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Jumlah Praktikan */}
        <FormField
          control={form.control}
          name="jumlahPraktikan"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Jumlah Praktikan</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Hari */}
        <FormField
          control={form.control}
          name="hari"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hari</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
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
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Lab */}
        <FormField
          control={form.control}
          name="labId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Laboratorium</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Lab" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {labOptions.map((lab) => (
                    <SelectItem key={lab.id} value={lab.id.toString()}>
                      {lab.nama}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Asisten */}
        <FormField
          control={form.control}
          name="aslabIds"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Asisten</FormLabel>
              <AslabPicker
                options={aslabOptions.map((a) => ({
                  value: a.id_aslab,
                  label: `${a.nama} (${a.nim})`,
                  nim: a.nim,
                }))}
                value={field.value}
                onChange={field.onChange}
                currentAslabId={currentAslabId}
              />
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Jenis Praktikan */}
        <FormField
          control={form.control}
          name="jenisPraktikan"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Jenis Praktikan</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Jenis" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Reguler">Reguler</SelectItem>
                  <SelectItem value="Spesial">Spesial</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Waktu */}
        <FormField
          control={form.control}
          name="waktu"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Waktu</FormLabel>
              <FormControl>
                <Input placeholder="Contoh: 13:00-15:00" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Tahun Semester */}
        <FormField
          control={form.control}
          name="tahunSemesterId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tahun Semester</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Tahun Semester" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {tahunSemesterOptions.map((ts) => (
                    <SelectItem key={ts.id} value={ts.id.toString()}>
                      {ts.semester} - {ts.tahun_ajaran}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end pt-4">
          <Button type="submit" className="px-6">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
