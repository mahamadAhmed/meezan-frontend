
import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { 
  Command, 
  CommandEmpty, 
  CommandGroup,
  CommandInput, 
  CommandItem, 
  CommandList 
} from "@/components/ui/command";
import { FiX, FiSearch, FiCheck } from "react-icons/fi";

interface Option {
  value: number;
  label: string;
}

interface MultiSelectProps {
  options: Option[];
  value: number[];
  onChange: (value: number[]) => void;
  placeholder?: string;
}

export function MultiSelect({
  options = [],
  value = [],
  onChange,
  placeholder = "اختر..."
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);

  // Ensure options and value are always arrays, even if they're undefined
  const safeOptions = Array.isArray(options) ? options : [];
  const safeValue = Array.isArray(value) ? value : [];

  // Safely filter selected items
  const selectedItems = safeOptions.filter((option) => 
    safeValue.includes(option.value)
  );

  const handleItemRemove = (itemValue: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (onChange) {
      const newValue = safeValue.filter((v) => v !== itemValue);
      onChange(newValue);
    }
  };

  const handleItemSelect = (itemValue: number) => {
    if (onChange) {
      const newValue = safeValue.includes(itemValue)
        ? safeValue.filter((v) => v !== itemValue)
        : [...safeValue, itemValue];
      onChange(newValue);
    }
  };

  return (
    <div className="space-y-2">
      <div
        className="border rounded-md p-2 min-h-[38px] cursor-text flex flex-wrap gap-2"
        onClick={() => setOpen(true)}
      >
        {selectedItems.length > 0 ? (
          selectedItems.map((item) => (
            <Badge
              key={item.value}
              variant="secondary"
              className="flex items-center gap-1 bg-slate-100 hover:bg-slate-200 text-slate-800"
            >
              {item.label}
              <button
                type="button"
                className="hover:bg-slate-300 rounded-full p-0.5"
                onClick={(e) => handleItemRemove(item.value, e)}
              >
                <FiX className="h-3 w-3" />
              </button>
            </Badge>
          ))
        ) : (
          <span className="text-slate-500">{placeholder}</span>
        )}
      </div>
      {open && (
        <div className="z-50 fixed inset-0">
          <div className="fixed inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg overflow-hidden min-w-[300px] max-w-[400px]">
            <Command>
              <div className="flex items-center border-b px-3">
                <FiSearch className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                <CommandInput placeholder="بحث..." className="border-0" />
              </div>
              <CommandList className="max-h-[300px] overflow-auto">
                <CommandEmpty>لا توجد نتائج</CommandEmpty>
                <CommandGroup>
                  {safeOptions.map((option) => (
                    <CommandItem
                      key={option.value}
                      onSelect={() => handleItemSelect(option.value)}
                      className="cursor-pointer p-2"
                    >
                      <div className="flex items-center gap-2 w-full">
                        <div className="flex h-4 w-4 items-center justify-center rounded border border-primary mr-2">
                          {safeValue.includes(option.value) && <FiCheck className="h-3 w-3" />}
                        </div>
                        {option.label}
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </div>
        </div>
      )}
    </div>
  );
}
