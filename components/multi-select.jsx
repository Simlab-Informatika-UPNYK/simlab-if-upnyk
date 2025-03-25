"use client";

import * as React from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function MultiSelect({
  placeholder,
  options = [],
  value = [],
  onChange,
  ...props
}) {
  const [open, setOpen] = React.useState(false);
  // Ensure we always initialize with an array
  const [selectedValues, setSelectedValues] = React.useState(Array.isArray(value) ? value : []);

  // Update selectedValues when value prop changes, ensuring it's always an array
  React.useEffect(() => {
    setSelectedValues(Array.isArray(value) ? value : []);
  }, [value]);

  const handleSelect = (optionValue) => {
    // Ensure selectedValues is always treated as an array
    const currentValues = Array.isArray(selectedValues) ? selectedValues : [];
    
    const newSelectedValues = currentValues.includes(optionValue)
      ? currentValues.filter((v) => v !== optionValue)
      : [...currentValues, optionValue];

    setSelectedValues(newSelectedValues);
    onChange(newSelectedValues);
  };

  const handleRemove = (optionValue) => {
    // Ensure selectedValues is always treated as an array
    const currentValues = Array.isArray(selectedValues) ? selectedValues : [];
    
    const newSelectedValues = currentValues.filter((v) => v !== optionValue);
    setSelectedValues(newSelectedValues);
    onChange(newSelectedValues);
  };

  // Ensure options is always an array
  const safeOptions = Array.isArray(options) ? options : [];
  // Ensure selectedValues is always an array
  const safeSelectedValues = Array.isArray(selectedValues) ? selectedValues : [];

  return (
    <Popover open={open} onOpenChange={setOpen} {...props}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          <div className="flex flex-wrap gap-1">
            {safeSelectedValues.length > 0 ? (
              safeSelectedValues.map((selectedValue) => {
                const option = safeOptions.find((o) => o.value === selectedValue);
                return (
                  <Badge
                    key={selectedValue}
                    variant="secondary"
                    className="mr-1 mb-1"
                  >
                    {option?.label || selectedValue}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="ml-1 h-auto p-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemove(selectedValue);
                      }}
                    >
                      <X className="h-3 w-3" />
                      <span className="sr-only">Remove</span>
                    </Button>
                  </Badge>
                );
              })
            ) : (
              <span className="text-muted-foreground">{placeholder}</span>
            )}
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search..." />
          <CommandEmpty>No item found.</CommandEmpty>
          <CommandGroup className="max-h-64 overflow-auto">
            {safeOptions.map((option) => (
              <CommandItem
                key={option.value}
                value={option.value}
                onSelect={() => handleSelect(option.value)}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    safeSelectedValues.includes(option.value)
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
                {option.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}