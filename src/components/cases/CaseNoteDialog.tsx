
import { useState } from "react";
import { Case } from "@/types/case";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/shared/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/shared/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

interface CaseNoteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  caseData: Case;
  onAddNote: (note: string) => void;
}

export const CaseNoteDialog = ({
  open,
  onOpenChange,
  caseData,
  onAddNote
}: CaseNoteDialogProps) => {
  const [note, setNote] = useState("");
  
  const handleSave = () => {
    if (!note.trim()) {
      toast.error("الرجاء إدخال ملاحظة");
      return;
    }
    
    onAddNote(note);
    onOpenChange(false);
    setNote("");
    toast.success("تمت إضافة الملاحظة بنجاح");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>إضافة ملاحظة جديدة</DialogTitle>
        </DialogHeader>
        <div className="py-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="note">الملاحظة</Label>
            <Textarea 
              id="note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="أدخل ملاحظتك هنا..."
              rows={5}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            إلغاء
          </Button>
          <Button onClick={handleSave}>
            إضافة الملاحظة
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
