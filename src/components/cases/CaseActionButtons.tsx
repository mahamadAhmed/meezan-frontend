
import { Button } from "@/components/ui/button";
import { 
  FiEdit, 
  FiPaperclip, 
  FiChevronsRight, 
  FiUser, 
  FiMessageCircle,
  FiX 
} from "react-icons/fi";
import { Case } from "@/types/case";

interface CaseActionButtonsProps {
  caseData: Case;
  onEdit: () => void;
  onAddNote: () => void;
  onAttachFile: () => void;
  onChangeStatus: () => void;
  onAssignLawyer: () => void;
}

export const CaseActionButtons = ({
  caseData,
  onEdit,
  onAddNote,
  onAttachFile,
  onChangeStatus,
  onAssignLawyer
}: CaseActionButtonsProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      <Button variant="outline" onClick={onEdit}>
        <FiEdit className="ml-2 h-4 w-4" />
        تعديل القضية
      </Button>
      <Button variant="outline" onClick={onAddNote}>
        <FiMessageCircle className="ml-2 h-4 w-4" />
        إضافة ملاحظة
      </Button>
      <Button variant="outline" onClick={onAttachFile}>
        <FiPaperclip className="ml-2 h-4 w-4" />
        إرفاق ملف
      </Button>
      <Button variant="outline" onClick={onChangeStatus}>
        <FiChevronsRight className="ml-2 h-4 w-4" />
        تغيير الحالة
      </Button>
      <Button variant="outline" onClick={onAssignLawyer}>
        <FiUser className="ml-2 h-4 w-4" />
        تعيين محامي
      </Button>
    </div>
  );
};
