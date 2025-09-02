"use client";

import * as React from "react";
import { Check, ChevronsUpDown, Plus, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";

export function AslabPicker({ options = [], value = [], onChange, currentAslabId = null }) {
  const selectedAslabs = value || [];

  const handleAddAslab = (aslabObj) => {
    if (!aslabObj || selectedAslabs.some((a) => a.value === aslabObj.value)) return;
    onChange([...selectedAslabs, aslabObj]);
  };

  const handleRemoveAslab = (aslabId) => {
    onChange(selectedAslabs.filter((a) => a.value !== aslabId));
  };

  const availableOptions = options.filter((option) => !selectedAslabs.some((a) => a.value === option.value));

  return (
    <div className="space-y-3">
      {/* Display selected assistants */}
      {selectedAslabs.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedAslabs.map((aslab) => {
            const isCurrentAslab = currentAslabId && aslab.value === currentAslabId;
            return (
              <Badge key={aslab.value} variant="secondary" className="px-3 py-1.5">
                {aslab.label}
                {!isCurrentAslab && (
                  <Button
                    // key={`remove-${aslab.value}`}
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveAslab(aslab.value)}
                    className="h-auto p-0 pl-1.5"
                  >
                    <X className="h-3 w-3" />
                    <span className="sr-only">Remove</span>
                  </Button>
                )}
              </Badge>
            );
          })}
        </div>
      )}

      {/* Combobox for selecting a new assistant */}
      <AslabCombobox
        options={availableOptions}
        onSelect={(val) => {
          const aslabObj = options.find((o) => o.value === val);
          handleAddAslab(aslabObj);
        }}
        placeholder="Tambahkan Aslab..."
      />
    </div>
  );
}

function AslabCombobox({ options, onSelect, placeholder }) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
          <div className="flex items-center">
            <Plus className="mr-2 h-4 w-4" />
            {placeholder}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0" align="start" side="bottom">
        <Command className="w-full">
          <CommandInput placeholder="Cari nama atau NIM..." className="h-9" />
          <CommandList>
            <CommandEmpty>Tidak ditemukan.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={`${option.label} ${option.nim || ""}`}
                  onSelect={() => {
                    onSelect(option.value);
                    setValue("");
                    setOpen(false);
                  }}
                >
                  {option.label}
                  <Check className={cn("ml-auto", value === option.value ? "opacity-100" : "opacity-0")} />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
