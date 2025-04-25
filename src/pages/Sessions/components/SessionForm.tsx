import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Textarea } from "@/shared/components/ui/textarea";
import { 
  ChevronDown, 
  CalendarIcon, 
  MapPinIcon, 
  FileTextIcon, 
  ClockIcon, 
  BriefcaseIcon
} from "lucide-react";
import { Case } from "@/types/case";
import { SessionStatus } from "@/types/case";
import { Label } from "@/components/ui/label";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export interface SessionFormValues {
  title: string;
  date: Date;
  time: string;
  location: string;
  caseId: string;
  status: SessionStatus;
  notes?: string;
}

interface SessionFormProps {
  onSubmit: (data: SessionFormValues) => void;
  isSubmitting: boolean;
  cases: Case[];
}

export const SessionForm = ({ onSubmit, isSubmitting, cases = [] }: SessionFormProps) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [caseId, setCaseId] = useState("");
  const [status, setStatus] = useState<SessionStatus>("قادمة");
  const [notes, setNotes] = useState("");
  const [openCaseSelector, setOpenCaseSelector] = useState(false);

  const safeCases = Array.isArray(cases) ? cases : [];

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(e.target.value);
    setDate(newDate);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const formData: SessionFormValues = {
      title,
      date,
      time,
      location,
      caseId,
      status,
      notes
    };
    
    onSubmit(formData);
  };

  const handleCaseSelect = (selectedCaseNumber: string) => {
    setCaseId(selectedCaseNumber);
    setOpenCaseSelector(false);
    
    const selectedCase = safeCases.find(c => c.caseNumber === selectedCaseNumber);
    
    if (selectedCase) {
      setTitle(`جلسة ${selectedCase.type} - ${selectedCase.clientName}`);
      if (selectedCase.court) {
        setLocation(selectedCase.court);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-2">
            <Label htmlFor="case-select">القضية المرتبطة <span className="text-red-500">*</span></Label>
            <Popover open={openCaseSelector} onOpenChange={setOpenCaseSelector}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={openCaseSelector}
                  className="w-full justify-between bg-white"
                >
                  <div className="flex items-center gap-2">
                    <BriefcaseIcon className="w-4 h-4 text-blue-500" />
                    {caseId ? caseId : "اختر القضية"}
                  </div>
                  <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0" align="start">
                <Command>
                  <CommandInput placeholder="ابحث عن قضية..." />
                  <CommandList>
                    <CommandEmpty>لم يتم العثور على أي قضايا</CommandEmpty>
                    <CommandGroup>
                      {safeCases.map((caseItem) => (
                        <CommandItem
                          key={caseItem.caseNumber}
                          onSelect={() => handleCaseSelect(caseItem.caseNumber)}
                          className="cursor-pointer"
                        >
                          <div className="flex flex-col w-full">
                            <div className="flex items-center justify-between">
                              <span className="font-medium">{caseItem.caseNumber}</span>
                              <span className="text-sm text-slate-500">{caseItem.type}</span>
                            </div>
                            <span className="text-sm">{caseItem.clientName}</span>
                          </div>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">عنوان الجلسة <span className="text-red-500">*</span></Label>
            <div className="relative">
              <FileTextIcon className="absolute right-3 top-3 text-slate-400 h-4 w-4" />
              <Input
                id="title"
                placeholder="عنوان الجلسة"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="pr-10"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">تاريخ الجلسة <span className="text-red-500">*</span></Label>
              <div className="relative">
                <CalendarIcon className="absolute right-3 top-3 text-slate-400 h-4 w-4" />
                <Input
                  id="date"
                  type="date"
                  value={date.toISOString().split("T")[0]}
                  onChange={handleDateChange}
                  className="pr-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">وقت الجلسة <span className="text-red-500">*</span></Label>
              <div className="relative">
                <ClockIcon className="absolute right-3 top-3 text-slate-400 h-4 w-4" />
                <Input
                  id="time"
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="pr-10"
                  required
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">مكان الجلسة <span className="text-red-500">*</span></Label>
            <div className="relative">
              <MapPinIcon className="absolute right-3 top-3 text-slate-400 h-4 w-4" />
              <Input
                id="location"
                placeholder="مكان الجلسة"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="pr-10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">حالة الجلسة <span className="text-red-500">*</span></Label>
            <Select
              value={status}
              onValueChange={(value) => setStatus(value as SessionStatus)}
              required
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="اختر حالة الجلسة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="قادمة">قادمة</SelectItem>
                <SelectItem value="قيد التنفيذ">قيد التنفيذ</SelectItem>
                <SelectItem value="منتهية">منتهية</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">ملاحظات إضافية</Label>
            <Textarea
              id="notes"
              placeholder="أدخل أي ملاحظات إضافية هنا..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              className="resize-none"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting} className="bg-blue-600 hover:bg-blue-700">
          {isSubmitting ? "جاري الحفظ..." : "حفظ الجلسة"}
        </Button>
      </div>
    </form>
  );
};

export default SessionForm;
