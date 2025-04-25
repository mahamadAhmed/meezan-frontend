
import { useState } from "react";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Calendar, User, Clock, Trash2, Edit2, Eye } from "lucide-react";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { Agency } from "../types/agency";
import { toast } from "sonner";
import { ConfirmationDialog } from "@/components/ui/confirmation-dialog";

interface AgencyCardProps {
  agency: Agency;
  onDelete: (id: number) => void;
  onEdit: (agency: Agency) => void;
  onView: (agency: Agency) => void;
}

export const AgencyCard = ({ agency, onDelete, onEdit, onView }: AgencyCardProps) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleDelete = () => {
    setConfirmOpen(true);
  };

  const confirmDelete = () => {
    setIsDeleting(true);
    onDelete(agency.id);
    toast.success("تم حذف الوكالة بنجاح");
    setIsDeleting(false);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "غير محدد";
    try {
      return format(new Date(dateString), "dd MMMM yyyy", { locale: ar });
    } catch {
      return dateString;
    }
  };

  return (
    <>
      <Card className="bg-white border border-slate-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200">
        <CardContent className="p-5">
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <Badge 
                variant={agency.status === "سارية" ? "default" : "destructive"}
                className="px-2 py-1"
              >
                {agency.status}
              </Badge>
              <div className="font-bold text-lg text-slate-800">
                {agency.agencyNumber || "بدون رقم"}
              </div>
            </div>

            <div className="grid gap-3 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-slate-400" />
                <span className="font-medium">العميل:</span>
                <span>{agency.clientName}</span>
              </div>

              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-slate-400" />
                <span className="font-medium">الوكيل:</span>
                <span>{agency.agentName || "غير محدد"}</span>
              </div>

              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span className="font-medium">تاريخ الإصدار:</span>
                <span>{formatDate(agency.issueDate || "")}</span>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-400" />
                <span className="font-medium">تاريخ الانتهاء:</span>
                <span>{formatDate(agency.expiryDate || "")}</span>
              </div>

              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-slate-400" />
                <span className="font-medium">الوصف:</span>
                <span className="truncate">{agency.description}</span>
              </div>
            </div>

            <div className="pt-4 border-t flex justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onView(agency)}
                className="bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100 hover:text-blue-700"
              >
                <Eye className="w-4 h-4 ml-1" />
                عرض
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(agency)}
                className="bg-yellow-50 text-yellow-600 border-yellow-200 hover:bg-yellow-100 hover:text-yellow-700"
              >
                <Edit2 className="w-4 h-4 ml-1" />
                تعديل
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleDelete}
                disabled={isDeleting}
                className="bg-red-50 text-red-600 border-red-200 hover:bg-red-100 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4 ml-1" />
                حذف
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <ConfirmationDialog
        open={confirmOpen}
        onOpenChange={setConfirmOpen}
        title="حذف الوكالة"
        description="هل أنت متأكد من حذف هذه الوكالة؟ لا يمكن التراجع عن هذا الإجراء."
        confirmLabel="حذف"
        cancelLabel="إلغاء"
        onConfirm={confirmDelete}
        isLoading={isDeleting}
      />
    </>
  );
};
