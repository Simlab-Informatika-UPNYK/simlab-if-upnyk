"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormMessage } from "@/components/ui/form";
import { mkPraktikumSchema } from "./form-schema";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";

export default function MkPraktikumForm({
  initialData,
  onSubmit,
  isEditing = false,
}) {
  const form = useForm({
    resolver: zodResolver(mkPraktikumSchema),
    defaultValues: initialData || {
      "Kode Mata Kuliah": 1,
      Nama: "",
      Semester: "1", 
      "Jumlah Kelas": 1,
    },
  });

  const router = useRouter();

  const handleSubmit = async (data) => {
    try {
      await onSubmit(data);
      router.push("/admin/mk-praktikum");
    } catch (error) {
      throw new Error("Terjadi kesalahan");
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="Kode Mata Kuliah">Kode MK</Label>
          <Input
            id="Kode Mata Kuliah"
            type="number"
            {...form.register("Kode Mata Kuliah")}
            placeholder="Masukkan kode mata kuliah"
          />
          {form.formState.errors["Kode Mata Kuliah"] && (
            <FormMessage>
              {form.formState.errors["Kode Mata Kuliah"].message}
            </FormMessage>
          )}
        </div>

        <div>
          <Label htmlFor="nama">Nama Mata Kuliah</Label>
          <Input
            id="Nama"
            {...form.register("Nama")}
            placeholder="Masukkan nama mata kuliah"
          />
          {form.formState.errors.Nama && (
            <FormMessage>{form.formState.errors.Nama.message}</FormMessage>
          )}
        </div>

        <div>
          <Label htmlFor="semester">Semester</Label>
          <Input
            id="Semester"
            type="text"
            {...form.register("Semester")}
            placeholder="Masukkan semester"
          />
          {form.formState.errors.Semester && (
            <FormMessage>{form.formState.errors.Semester.message}</FormMessage>
          )}
        </div>

        <div>
          <Label htmlFor="jumlah_kelas">Jumlah Kelas</Label>
          <Input
            id="Jumlah Kelas"
            type="number"
            min="1"
            {...form.register("Jumlah Kelas", { valueAsNumber: true })}
            placeholder="Masukkan jumlah kelas"
          />
          {form.formState.errors["Jumlah Kelas"] && (
            <FormMessage>
              {form.formState.errors["Jumlah Kelas"].message}
            </FormMessage>
          )}
        </div>

        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Menyimpan..." : "Simpan"}
        </Button>
      </form>
    </Form>
  );
}
