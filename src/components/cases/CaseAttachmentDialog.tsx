
import { useState } from "react";
import { Case } from "@/types/case";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/shared/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { FileUpload } from "@/components/ui/file-upload";
import { toast } from "sonner";

interface CaseAttachmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  caseData: Case;
  onAttachFile: (files: FileList) => void;
}

export const CaseAttachmentDialog = ({
  open,
  onOpenChange,
  caseData,
  onAttachFile
}: CaseAttachmentDialogProps) => {
  const [files, setFiles] = useState<FileList | null>(null);
  
  const handleFileSelect = (selectedFiles: FileList) => {
    setFiles(selectedFiles);
  };
  
  const handleSave = () => {
    if (!files || files.length === 0) {
      toast.error("الرجاء اختيار ملف واحد على الأقل");
      return;
    }
    
    onAttachFile(files);
    onOpenChange(false);
    setFiles(null);
    toast.success("تم إرفاق الملفات بنجاح");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>إرفاق ملفات للقضية</DialogTitle>
        </DialogHeader>
        <div className="py-4 space-y-4">
          <div className="space-y-2">
            <Label>الملفات</Label>
            <FileUpload 
              onFileSelect={handleFileSelect} 
              label="اختر الملفات للإرفاق"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
            />
            {files && files.length > 0 && (
              <div className="mt-2">
                <p className="text-sm text-gray-500">تم اختيار {files.length} ملف</p>
                <ul className="text-sm list-disc list-inside mt-1">
                  {Array.from(files).map((file, index) => (
                    <li key={index} className="text-gray-700">
                      {file.name} ({Math.round(file.size / 1024)} KB)
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            إلغاء
          </Button>
          <Button onClick={handleSave}>
            إرفاق الملفات
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
