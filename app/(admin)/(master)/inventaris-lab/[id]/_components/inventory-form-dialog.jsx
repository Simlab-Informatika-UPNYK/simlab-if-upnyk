'use client';

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { usePathname, useParams } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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

// Schema validasi untuk form inventaris
const formSchema = z.object({
  noMeja: z.string().min(1, { message: "Nomor meja harus diisi" }),
  noSNBT: z.string().min(1, { message: "Nomor SNBT harus diisi" }),
  merekModel: z.string().min(2, { message: "Merek & model minimal 2 karakter" }),
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

export default function InventoryFormDialog({ children, mode = "add", initialData = {} }) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: mode === "edit" 
      ? { ...initialData }
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
      // Simulasi proses penyimpanan
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Logika untuk tambah atau edit data
      if (mode === "add") {
        console.log("Adding new inventory:", values);
        toast({
          title: "Berhasil Menambahkan",
          description: `Inventaris baru berhasil ditambahkan`,
        });
      } else {
        console.log("Editing inventory:", values);
        toast({
          title: "Berhasil Mengubah",
          description: `Inventaris berhasil diperbarui`,
        });
      }
      
      setOpen(false);
      // Refresh data...
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
    <Dialog className="overflow-auto" open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {mode === "add" ? "Tambah Inventaris Baru" : "Edit Inventaris"}
          </DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                onClick={() => setOpen(false)}
                disabled={isSubmitting}
              >
                Batal
              </Button>
              <Button 
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Menyimpan..." : mode === "add" ? "Tambah" : "Simpan"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
