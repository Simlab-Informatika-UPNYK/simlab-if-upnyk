"use client";

import * as React from "react";
import { Check, ChevronsUpDown, Plus, X } from "lucide-react";
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
import { Badge } from "@/components/ui/badge";

export function AslabPicker({ options = [], value = [], onChange }) {
  const [selectedAslabs, setSelectedAslabs] = React.useState(value || []);

  // Keep local state in sync with form state
  React.useEffect(() => {
    console.log(options);
    setSelectedAslabs(value || []);
  }, [value]);

  // Update parent form when local state changes
  const updateValue = (newValue) => {
    setSelectedAslabs(newValue);
    onChange(newValue);
  };

  // Add a new item to the list
  const handleAddAslab = (aslabId) => {
    if (!aslabId || selectedAslabs.includes(aslabId)) return;
    updateValue([...selectedAslabs, aslabId]);
  };

  // Remove an item from the list
  const handleRemoveAslab = (aslabId) => {
    updateValue(selectedAslabs.filter((id) => id !== aslabId));
  };

  // Get the remaining available options (not yet selected)
  const availableOptions = options.filter(
    (option) => !selectedAslabs.includes(option.value)
  );

  return (
    <div className="space-y-3">
      {/* Display selected assistants */}
      {selectedAslabs.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedAslabs.map((aslabId) => {
            const aslab = options.find((o) => o.value === aslabId);
            return (
              <Badge key={aslabId} variant="secondary" className="px-3 py-1.5">
                {aslab
                  ? `${aslab.label} (${aslab.nim || aslab.value})`
                  : aslabId}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleRemoveAslab(aslabId)}
                  className="h-auto p-0 pl-1.5"
                >
                  <X className="h-3 w-3" />
                  <span className="sr-only">Remove</span>
                </Button>
              </Badge>
            );
          })}
        </div>
      )}

      {/* Combobox for selecting a new assistant */}
      <AslabCombobox
        options={availableOptions}
        onSelect={handleAddAslab}
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
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
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
                  {option.label} ({option.nim})
                  <Check
                    className={cn(
                      "ml-auto",
                      value === option.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
