
import React from "react";
import { User, Check } from "lucide-react";
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
import { Button } from "@/components/ui/button";
import { cn } from "@/shared/utils/utils";

// Define a safe list of customers to ensure it's always an array
const customers = [
  { id: 1, name: "محمد أحمد" },
  { id: 2, name: "شركة الخليج للتجارة" },
  { id: 3, name: "مؤسسة النور للاستشارات" },
  { id: 4, name: "أحمد محمود" },
];

interface ClientSelectProps {
  value: number | null;
  onChange: (value: number) => void;
}

export function ClientSelect({ value, onChange }: ClientSelectProps) {
  const [open, setOpen] = React.useState(false);
  
  // Safely find the selected client, handling null/undefined
  const selectedClient = value !== null && value !== undefined
    ? customers.find(c => c.id === value) || null
    : null;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedClient ? (
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 shrink-0 opacity-50" />
              <span>{selectedClient.name}</span>
            </div>
          ) : (
            <span className="text-muted-foreground">اختر العميل...</span>
          )}
          <User className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0" align="start">
        <Command>
          <CommandInput placeholder="ابحث عن العميل..." className="h-9" />
          <CommandEmpty>لم يتم العثور على عميل</CommandEmpty>
          <CommandGroup>
            {/* Ensure we're iterating over a valid array */}
            {Array.isArray(customers) && customers.map((customer) => (
              <CommandItem
                key={customer.id}
                value={customer.name}
                onSelect={() => {
                  onChange(customer.id);
                  setOpen(false);
                }}
              >
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 shrink-0 opacity-50" />
                  <span>{customer.name}</span>
                  {value === customer.id && (
                    <Check className="ml-auto h-4 w-4" />
                  )}
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
