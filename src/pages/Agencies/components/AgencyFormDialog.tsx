
import { ModalForm } from "@/components/ui/modal-form";
import { Agency, AgencyFormValues } from "../types/agency";
import { AgencyForm } from "./AgencyForm";

interface AgencyFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: AgencyFormValues) => void;
  initialData?: Agency;
  isLoading?: boolean;
}

export function AgencyFormDialog({
  open,
  onOpenChange,
  onSubmit,
  initialData,
  isLoading = false,
}: AgencyFormDialogProps) {
  const handleSubmit = (data: AgencyFormValues) => {
    onSubmit(data);
  };

  return (
    <ModalForm
      title={initialData ? "تعديل وكالة" : "إضافة وكالة جديدة"}
      description={initialData ? "تعديل بيانات الوكالة" : "قم بإدخال بيانات الوكالة الجديدة"}
      open={open}
      onOpenChange={onOpenChange}
      includeCloseButton={true}
      variant="large"
    >
      <AgencyForm
        onSubmit={handleSubmit}
        initialData={initialData}
        isLoading={isLoading}
      />
    </ModalForm>
  );
}
