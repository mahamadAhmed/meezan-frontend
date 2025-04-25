
import { useState, useEffect } from "react";
import { Case } from "@/types/case";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/shared/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { MultiSelect } from "@/components/ui/multi-select";

// Mock lawyer data - this would come from an API in production
const MOCK_LAWYERS = [
  { id: 1, name: "خالد العتيبي" },
  { id: 2, name: "سارة المطيري" },
  { id: 3, name: "محمد الشمري" },
  { id: 4, name: "نورة القحطاني" },
  { id: 5, name: "أحمد السعيد" },
];

interface CaseLawyerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  caseData: Case;
  onAssignLawyer: (lawyerId: number, lawyerName: string) => void;
}

export const CaseLawyerDialog = ({
  open,
  onOpenChange,
  caseData,
  onAssignLawyer
}: CaseLawyerDialogProps) => {
  const [selectedLawyerId, setSelectedLawyerId] = useState<string>("");
  
  // Set current lawyer when dialog opens
  useEffect(() => {
    if (open && caseData.lawyers && caseData.lawyers.length > 0) {
      setSelectedLawyerId(caseData.lawyers[0].id.toString());
    } else if (open) {
      setSelectedLawyerId("");
    }
  }, [open, caseData]);
  
  const handleSave = () => {
    if (!selectedLawyerId) {
      toast.error("الرجاء اختيار محامي");
      return;
    }
    
    const lawyer = MOCK_LAWYERS.find(l => l.id.toString() === selectedLawyerId);
    if (lawyer) {
      onAssignLawyer(lawyer.id, lawyer.name);
      onOpenChange(false);
      toast.success("تم تعيين المحامي بنجاح");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>تعيين محامي للقضية</DialogTitle>
        </DialogHeader>
        <div className="py-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="lawyer">المحامي</Label>
            <Select 
              value={selectedLawyerId} 
              onValueChange={setSelectedLawyerId}
            >
              <SelectTrigger id="lawyer" className="w-full">
                <SelectValue placeholder="اختر محامي" />
              </SelectTrigger>
              <SelectContent>
                {MOCK_LAWYERS.map(lawyer => (
                  <SelectItem key={lawyer.id} value={lawyer.id.toString()}>
                    {lawyer.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {caseData.lawyers && caseData.lawyers.length > 0 && (
            <div className="pt-2 border-t">
              <p className="text-sm text-gray-500">المحامي الحالي:</p>
              <p className="font-medium">{caseData.lawyers[0].name}</p>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            إلغاء
          </Button>
          <Button onClick={handleSave}>
            تعيين المحامي
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
