
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/shared/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, FileText, Calendar, Phone, MapPin, Clock, Download } from "lucide-react";
import type { Customer } from "@/types/customer";
import { format } from "date-fns";

interface CustomerDetailsProps {
  customer: Customer;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit?: () => void;
}

export function CustomerDetails({
  customer,
  open,
  onOpenChange,
  onEdit,
}: CustomerDetailsProps) {
  const handleEditClick = () => {
    onOpenChange(false);
    if (onEdit) onEdit();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <Eye className="h-6 w-6 text-primary" />
            تفاصيل العميل
          </DialogTitle>
          <DialogDescription>عرض كافة معلومات العميل</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">المعلومات الأساسية</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">الاسم:</span>
                <p className="font-medium">{customer.name}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">نوع العميل:</span>
                <p className="font-medium">{customer.type}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">الحالة:</span>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${
                      customer.status === "نشط"
                        ? "bg-green-100 text-green-800"
                        : customer.status === "غير نشط"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                >
                  {customer.status}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">تاريخ الانضمام:</span>
                <p className="font-medium">
                  {format(new Date(customer.joinDate), 'dd/MM/yyyy')}
                </p>
              </div>
              {customer.createdAt && (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">تاريخ الإنشاء:</span>
                  <p className="font-medium">{format(new Date(customer.createdAt), 'dd/MM/yyyy HH:mm')}</p>
                </div>
              )}
              {customer.updatedAt && (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">آخر تحديث:</span>
                  <p className="font-medium">{format(new Date(customer.updatedAt), 'dd/MM/yyyy HH:mm')}</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">معلومات الاتصال</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">رقم الهاتف:</span>
                <p className="font-medium">{customer.phone}</p>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">العنوان:</span>
                <p className="font-medium">{customer.address}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">ملاحظات</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {customer.notes || "لا توجد ملاحظات"}
              </p>
            </CardContent>
          </Card>

          {customer.attachments && customer.attachments.length > 0 && (
            <Card className="md:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">المرفقات</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {customer.attachments.map((attachment, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between gap-2 p-3 rounded-md border hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-2 overflow-hidden">
                        <FileText className="h-4 w-4 flex-shrink-0 text-muted-foreground" />
                        <span className="text-sm truncate">{attachment}</span>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8" title="تحميل الملف">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="mt-6 flex justify-end gap-2">
          {onEdit && (
            <Button 
              onClick={handleEditClick} 
              variant="outline"
              className="w-full sm:w-auto"
            >
              تعديل
            </Button>
          )}
          <Button
            onClick={() => onOpenChange(false)}
            variant="outline"
            className="w-full sm:w-auto"
          >
            إغلاق
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
