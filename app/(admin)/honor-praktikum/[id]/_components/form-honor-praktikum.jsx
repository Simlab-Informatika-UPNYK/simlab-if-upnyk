"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { honorPraktikumSchema, defaultValues } from "./form-schema";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function FormHonorPraktikum({
  initialData,
  onSubmitHandler,
  successMessage,
  successRedirect,
  periodeOptions = [],
  aslabOptions = [],
  onFormInstance,
}) {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(honorPraktikumSchema),
    defaultValues: initialData || defaultValues,
  });

  useEffect(() => {
    if (onFormInstance) {
      onFormInstance(form);
    }
  }, [form, onFormInstance]);

  async function onSubmit(values) {
    try {
      await onSubmitHandler(values);

      toast({
        title: "Berhasil",
        description: successMessage,
        variant: "default",
      });

      if (successRedirect) {
        router.push(successRedirect);
        router.refresh();
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="aslab_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pilih Asisten</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih asisten laboratorium" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {aslabOptions.length === 0 ? (
                      <SelectItem value="loading" disabled>
                        Memuat data asisten...
                      </SelectItem>
                    ) : (
                      aslabOptions.map((aslab) => (
                        <SelectItem key={aslab.value} value={aslab.value}>
                          {aslab.label}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="periode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Periode</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih periode" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {periodeOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tanggal_pengambilan"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Tanggal Pengambilan</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP", { locale: id })
                        ) : (
                          <span>Pilih tanggal pengambilan</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="status_honor"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status Honor</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih status honor" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Belum Diambil">Belum Diambil</SelectItem>
                    <SelectItem value="Sudah Diambil">Sudah Diambil</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end pt-4">
          <Button type="submit">Simpan</Button>
        </div>
      </form>
    </Form>
  );
}
