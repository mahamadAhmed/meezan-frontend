
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

const customers = [
  { id: 1, name: "محمد أحمد" },
  { id: 2, name: "شركة الخليج للتجارة" },
  { id: 3, name: "مؤسسة النور للاستشارات" },
  { id: 4, name: "أحمد محمود" },
];

export function AgencyClientSelect({
  value = "",
  onChange,
}: {
  value?: string;
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = React.useState(false);
  
  const handleSelect = React.useCallback((currentValue: string) => {
    if (onChange) {
      onChange(currentValue === value ? "" : currentValue);
    }
    setOpen(false);
  }, [onChange, value]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value ? (
            <div className="flex items-center gap-2 truncate">
              <User className="h-4 w-4 shrink-0 opacity-50" />
              <span className="truncate">{value}</span>
            </div>
          ) : (
            <span className="text-muted-foreground">اختر العميل...</span>
          )}
          <User className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[calc(100vw-2rem)] max-w-[300px] p-0" align="start">
        <Command>
          <CommandInput placeholder="ابحث عن العميل..." className="h-9" />
          <CommandEmpty>لم يتم العثور على عميل</CommandEmpty>
          <CommandGroup className="overflow-y-auto max-h-[200px]">
            {customers.map((customer) => (
              <CommandItem
                key={customer.id}
                value={customer.name}
                onSelect={() => handleSelect(customer.name)}
                className="flex items-center gap-2 px-3 py-2"
              >
                <User className="h-4 w-4 shrink-0 opacity-50" />
                <span>{customer.name}</span>
                {value === customer.name && (
                  <Check className="ml-auto h-4 w-4" />
                )}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
