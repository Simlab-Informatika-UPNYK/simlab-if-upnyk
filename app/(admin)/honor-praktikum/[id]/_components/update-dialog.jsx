"use client";

import * as React from "react";
import { addDays, format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { updateHonor } from "../actions";
import { useHonor } from "./honor-context";

const FormSchema = z.object({
  tanggal_diambil: z.date({
    required_error: "A date of birth is required.",
  }),
});

export const UpdateDialog = ({ idAslabHonor, aslabId, tahunSemesterId }) => {
  const { toast } = useToast();
  const [open, setOpen] = React.useState(false);
  const { setData } = useHonor();
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      tanggal_diambil: addDays(new Date(), 0),
    },
  });

  async function onSubmit(data) {
    try {
      const formattedData = format(data.tanggal_diambil, "yyyy-MM-dd");

      const result = await updateHonor(
        idAslabHonor,
        formattedData,
        aslabId,
        tahunSemesterId
      );

      console.log(
        "result",
        aslabId,
        tahunSemesterId
      );

      if (result.success) {
        toast({
          title: "Berhasil",
          description: "Honor berhasil ditandai sudah diambil",
          variant: "success",
        });
        setData(result.data);
        setOpen(false);
      } else {
        toast({
          title: "Gagal",
          description:
            result.error || "Terjadi kesalahan saat memperbarui status honor",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Terjadi kesalahan: " + error.message,
        variant: "destructive",
      });
    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Tandai Sudah Diambil</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Tandai Honor Sudah Diambil</DialogTitle>
          <DialogDescription>
            Isi data sesuai tangagl diambil honor.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 flex flex-col"
          >
            <FormField
              control={form.control}
              name="tanggal_diambil"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Tanggal Diambil</FormLabel>
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
                            format(field.value, "dd/MM/yyyy")
                          ) : (
                            <span>Pick a date</span>
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
            <Button className="ms-auto" type="submit">
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export const BelumDiambil = ({ idAslabHonor, aslabId, tahunSemesterId }) => {
  const { toast } = useToast();
  const { setData } = useHonor();

  const handleMarkAsNotTaken = async () => {
    try {
      // Pass null as the tanggal_diambil to mark as not taken
      const result = await updateHonor(
        idAslabHonor,
        null,
        aslabId,
        tahunSemesterId
      );

      console.log(result);

      if (result.success) {
        toast({
          title: "Berhasil",
          description: "Honor berhasil ditandai belum diambil",
          variant: "success",
        });
        setData(result.data);
      } else {
        toast({
          title: "Gagal",
          description:
            result.error || "Terjadi kesalahan saat memperbarui status honor",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Terjadi kesalahan: " + error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <Button variant="outline" onClick={handleMarkAsNotTaken}>
      Tandai Belum Diambil
    </Button>
  );
};
