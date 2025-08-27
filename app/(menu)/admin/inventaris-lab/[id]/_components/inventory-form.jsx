"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useParams, useRouter } from "next/navigation";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addInventaris, updateInventaris } from "../../actions";
import { getLabIdBySlug } from "../actions";

// Fungsi konversi UPS
export const upsToString = (ups) => (ups ? "Pakai" : "Tidak");
const stringToUps = (str) => str === "Pakai";

// Schema validasi untuk form inventaris
const formSchema = z.object({
  noMeja: z.string().min(1, { message: "Nomor meja harus diisi" }),
  noSNBT: z.string().min(1, { message: "Nomor SNBT harus diisi" }),
  merekModel: z
    .string()
    .min(2, { message: "Merek & model minimal 2 karakter" }),
  monitor: z.string().optional(),
  processor: z.string().min(1, { message: "Processor harus diisi" }),
  storage: z.string().min(1, { message: "Storage harus diisi" }),
  ram: z.string().min(1, { message: "RAM harus diisi" }),
  gpu: z.string().min(1, { message: "GPU harus diisi" }),
  lanCard: z.string().min(1, { message: "LAN Card harus diisi" }),
  ups: z.string().min(1, { message: "Status UPS harus diisi" }),
  merkUps: z.string().optional(),
  keterangan: z.string().optional(),
});

export default function InventoryForm({
  mode = "add",
  initialData = {},
  onSuccess,
}) {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues:
      mode === "edit"
        ? {
            noMeja: initialData.noMeja || "",
            noSNBT: initialData.noSNBT || "",
            merekModel: initialData.merekModel || "",
            monitor: initialData.monitor || "",
            processor: initialData.processor || "",
            storage: initialData.storage || "",
            ram: initialData.ram || "",
            gpu: initialData.gpu || "",
            lanCard: initialData.lanCard || "Normal",
            ups: upsToString(initialData.ups),
            merkUps: initialData.merkUps || "",
            keterangan: initialData.keterangan || "",
          }
        : {
            noMeja: "",
            noSNBT: "",
            merekModel: "",
            monitor: "",
            processor: "",
            storage: "",
            ram: "",
            gpu: "",
            lanCard: "Normal",
            ups: "Pakai",
            merkUps: "",
            keterangan: "",
          },
  });

  async function onSubmit(values) {
    setIsSubmitting(true);

    try {
      const labResult = await getLabIdBySlug(params.id);
      if (!labResult.success) throw new Error(labResult.error);

      const payload = {
        ...values,
        ups: stringToUps(values.ups),
        labId: labResult.data,
      };

      if (mode === "add") {
        const result = await addInventaris(payload);
        if (!result.success) throw new Error(result.error);
        toast({
          title: "Berhasil Menambahkan",
          description: `Inventaris baru berhasil ditambahkan`,
        });
      } else {
        const result = await updateInventaris(initialData.id, payload);
        if (!result.success) throw new Error(result.error);
        toast({
          title: "Berhasil Mengubah",
          description: `Inventaris berhasil diperbarui`,
        });
      }

      onSuccess?.();
      router.push(`/admin/inventaris-lab/${params.id}`);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: `Terjadi kesalahan: ${error.message}`,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        {mode === "add" ? "Tambah Inventaris Baru" : "Edit Inventaris"}
      </h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Form fields remain the same as in the dialog version */}
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="noMeja"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>No. Meja</FormLabel>
                  <FormControl>
                    <Input placeholder="No. Meja" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="noSNBT"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>No. SNBT</FormLabel>
                  <FormControl>
                    <Input placeholder="No. SNBT" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="merekModel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Merek & Model</FormLabel>
                <FormControl>
                  <Input placeholder="Merek & Model" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="monitor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Monitor</FormLabel>
                <FormControl>
                  <Input placeholder="Monitor" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="processor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Processor</FormLabel>
                <FormControl>
                  <Input placeholder="Processor" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="storage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Storage</FormLabel>
                  <FormControl>
                    <Input placeholder="Storage" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ram"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>RAM</FormLabel>
                  <FormControl>
                    <Input placeholder="RAM" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="gpu"
            render={({ field }) => (
              <FormItem>
                <FormLabel>GPU</FormLabel>
                <FormControl>
                  <Input placeholder="GPU" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lanCard"
            render={({ field }) => (
              <FormItem>
                <FormLabel>LAN Card</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih status LAN Card" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Normal">Normal</SelectItem>
                      <SelectItem value="Rusak">Rusak</SelectItem>
                      <SelectItem value="Tidak Ada">Tidak Ada</SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="ups"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>UPS</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih status UPS" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Pakai">Pakai</SelectItem>
                        <SelectItem value="Tidak">Tidak</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="merkUps"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Merk UPS</FormLabel>
                  <FormControl>
                    <Input placeholder="Merk UPS" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="keterangan"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Keterangan</FormLabel>
                <FormControl>
                  <Input placeholder="Keterangan" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push(`/admin/inventaris-lab/${params.id}`)}
              disabled={isSubmitting}
            >
              Batal
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? "Menyimpan..."
                : mode === "add"
                ? "Tambah"
                : "Simpan"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
