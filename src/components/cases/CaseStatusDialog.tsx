
import { useState } from "react";
import { Case, CaseStatus, statusColors } from "@/types/case";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/shared/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FiCheck } from "react-icons/fi";
import { toast } from "sonner";

interface CaseStatusDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  caseData: Case;
  onStatusChange: (newStatus: CaseStatus) => void;
}

export const CaseStatusDialog = ({
  open,
  onOpenChange,
  caseData,
  onStatusChange
}: CaseStatusDialogProps) => {
  const [selectedStatus, setSelectedStatus] = useState<CaseStatus>(caseData.status);
  
  const statusOptions: CaseStatus[] = ["نشطة", "قيد المعالجة", "مغلقة"];
  
  const handleSave = () => {
    onStatusChange(selectedStatus);
    onOpenChange(false);
    toast.success("تم تغيير حالة القضية بنجاح");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>تغيير حالة القضية</DialogTitle>
        </DialogHeader>
        <div className="py-4 space-y-4">
          <div className="flex flex-col gap-3">
            <p className="text-sm text-gray-500">الحالة الحالية:</p>
            <Badge className={`${statusColors[caseData.status]} text-white w-fit`}>
              {caseData.status}
            </Badge>
          </div>
          
          <div className="flex flex-col gap-3">
            <p className="text-sm text-gray-500">اختر الحالة الجديدة:</p>
            <div className="flex flex-wrap gap-2">
              {statusOptions.map((status) => (
                <Badge 
                  key={status}
                  className={`${statusColors[status]} text-white cursor-pointer ${
                    selectedStatus === status ? 'ring-2 ring-offset-2' : ''
                  }`}
                  onClick={() => setSelectedStatus(status)}
                >
                  {status}
                  {selectedStatus === status && (
                    <FiCheck className="mr-1 h-3 w-3" />
                  )}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            إلغاء
          </Button>
          <Button onClick={handleSave}>
            حفظ التغييرات
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
