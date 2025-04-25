
import { Plus } from "lucide-react";
import { Button } from "@/shared/components/ui/button";

interface AddEmployeeButtonProps {
  onAdd: () => void;
}

const AddEmployeeButton = ({ onAdd }: AddEmployeeButtonProps) => {
  return (
    <Button
      onClick={onAdd}
      className="flex items-center gap-2"
      variant="default"
      size="default"
    >
      <Plus className="h-4 w-4" />
      <span>إضافة موظف</span>
    </Button>
  );
};

export default AddEmployeeButton;
