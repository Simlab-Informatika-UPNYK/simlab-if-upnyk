"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function MahasiswaCombobox({
  data = [],
  value,
  onSelect,
  placeholder = "Pilih mahasiswa...",
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          // className="w-full justify-between"
          className="w-[300px] justify-between"
        >
          {value ? `${value.nama} - ${value.nim}` : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Cari mahasiswa..." className="h-9" />
          <CommandList>
            <CommandEmpty>Tidak ditemukan</CommandEmpty>
            <CommandGroup>
              {data.map((mahasiswa) => (
                <CommandItem
                  key={mahasiswa.nim}
                  value={mahasiswa}
                  onSelect={() => {
                    onSelect(mahasiswa);
                    setOpen(false);
                  }}
                >
                  {mahasiswa.nama} - {mahasiswa.nim}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
