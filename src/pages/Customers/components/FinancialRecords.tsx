import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/components/ui/button";
import { WalletCards, Plus, FileText, Download, Pencil, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/components/ui/table";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/shared/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import { FileUpload } from "@/components/ui/file-upload";
import { format } from "date-fns";
import type { Customer, FinancialRecord, FinancialRecordFormValues } from "@/types/customer";

interface Case {
  id: number;
  title: string;
  amount: number;
}

interface FinancialRecordsListProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customer: Customer;
  financialRecords: FinancialRecord[];
  onAddFinancialRecord: (data: FinancialRecordFormValues) => void;
  onUpdateFinancialRecord?: (id: number, data: FinancialRecordFormValues) => void;
  isLoading: boolean;
  cases?: Case[];
}

export function FinancialRecordsList({
  open,
  onOpenChange,
  customer,
  financialRecords,
  onAddFinancialRecord,
  onUpdateFinancialRecord,
  isLoading,
  cases = []
}: FinancialRecordsListProps) {
  const [showForm, setShowForm] = useState(false);
  const [editingRecord, setEditingRecord] = useState<FinancialRecord | null>(null);
  const [isPercentage, setIsPercentage] = useState(false);
  const [formData, setFormData] = useState<Partial<FinancialRecordFormValues>>({
    type: "دفعة",
    status: "معلقة",
    date: new Date().toISOString().split('T')[0],
  });
  const [files, setFiles] = useState<File[]>([]);
  const [recordAttachments, setRecordAttachments] = useState<string[]>([]);

  const customerRecords = financialRecords.filter(
    (record) => record.customerId === customer.id
  );

  const resetForm = () => {
    setFormData({
      type: "دفعة",
      status: "معلقة",
      date: new Date().toISOString().split('T')[0],
    });
    setFiles([]);
    setRecordAttachments([]);
    setIsPercentage(false);
  };

  const handleEdit = (record: FinancialRecord) => {
    // Convert string IDs to numbers if needed
    const recordId = typeof record.id === 'string' ? parseInt(record.id) : record.id;
    
    setEditingRecord(record);
    setFormData({
      amount: record.amount,
      date: record.date,
      type: record.type,
      description: record.description,
      status: record.status,
      notes: record.notes || "",
      caseId: record.caseId,
      percentageAmount: record.percentageAmount,
    });
    setIsPercentage(record.isPercentage || false);
    setRecordAttachments(record.attachments || []);
    setShowForm(true);
  };

  const handleFileSelect = (fileList: FileList) => {
    setFiles(Array.from(fileList));
  };

  const totalPaid = customerRecords
    .filter((record) => record.status === "مدفوعة")
    .reduce((sum, record) => sum + record.amount, 0);

  const totalPending = customerRecords
    .filter((record) => record.status === "معلقة")
    .reduce((sum, record) => sum + record.amount, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if ((!formData.amount && !isPercentage) || (!formData.percentageAmount && isPercentage) || !formData.description) {
      toast.error("يرجى إدخال جميع الحقول المطلوبة");
      return;
    }

    // Calculate final amount if using percentage
    let finalAmount: number;
    if (isPercentage) {
      if (!formData.caseId || !formData.percentageAmount) {
        toast.error("يرجى اختيار القضية والنسبة المئوية");
        return;
      }
      const selectedCase = cases.find(c => c.id === formData.caseId);
      if (!selectedCase) {
        toast.error("القضية المختارة غير موجودة");
        return;
      }
      finalAmount = (selectedCase.amount * (formData.percentageAmount / 100));
    } else {
      if (!formData.amount) {
        toast.error("يرجى إدخال المبلغ");
        return;
      }
      finalAmount = formData.amount;
    }
    
    const formattedDate = typeof formData.date === 'string'
      ? formData.date
      : formData.date 
        ? new Date(formData.date as any).toISOString().split('T')[0]
        : new Date().toISOString().split('T')[0];
    
    const recordData: FinancialRecordFormValues = {
      amount: finalAmount,
      isPercentage,
      percentageAmount: isPercentage ? formData.percentageAmount : undefined,
      caseId: isPercentage ? formData.caseId : undefined,
      date: formattedDate,
      type: formData.type as "دفعة" | "فاتورة" | "استرداد" | "مطالبة",
      description: formData.description as string,
      status: formData.status as "مدفوعة" | "معلقة" | "ملغية",
      notes: formData.notes,
      attachments: files.length > 0 ? files : undefined
    };

    if (editingRecord && onUpdateFinancialRecord) {
      // Convert string IDs to numbers if needed
      const recordId = typeof editingRecord.id === 'string' ? parseInt(editingRecord.id) : editingRecord.id;
      onUpdateFinancialRecord(recordId, recordData);
    } else {
      onAddFinancialRecord(recordData);
    }

    setShowForm(false);
    resetForm();
    setEditingRecord(null);
  };

  const handleCancel = () => {
    setShowForm(false);
    resetForm();
    setEditingRecord(null);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            <WalletCards className="h-6 w-6 text-primary" />
            السجلات المالية للعميل {customer.name}
          </DialogTitle>
          <DialogDescription>
            إدارة وعرض جميع المعاملات المالية الخاصة بالعميل
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-green-600">
                إجمالي المدفوعات
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{totalPaid} ريال</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-yellow-600">
                المبالغ المعلقة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{totalPending} ريال</p>
            </CardContent>
          </Card>
        </div>

        <div className="mb-4">
          <Button
            onClick={() => {
              setEditingRecord(null);
              resetForm();
              setShowForm(true);
            }}
            className="w-full md:w-auto"
            variant="outline"
          >
            <Plus className="h-4 w-4 mr-2" /> إضافة معاملة جديدة
          </Button>
        </div>

        {showForm && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">
                {editingRecord ? "تعديل المعاملة" : "إضافة معاملة جديدة"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex items-center justify-between space-x-2">
                  <Label htmlFor="percentage-mode">المبلغ كنسبة من قضية</Label>
                  <Switch
                    id="percentage-mode"
                    checked={isPercentage}
                    onCheckedChange={setIsPercentage}
                  />
                </div>

                {isPercentage ? (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>القضية</Label>
                        <Select
                          value={formData.caseId?.toString()}
                          onValueChange={(value) => setFormData({ ...formData, caseId: Number(value) })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="اختر القضية" />
                          </SelectTrigger>
                          <SelectContent>
                            {cases.map((case_) => (
                              <SelectItem key={case_.id} value={case_.id.toString()}>
                                {case_.title}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>النسبة المئوية (%)</Label>
                        <Input
                          type="number"
                          min="0"
                          max="100"
                          step="0.01"
                          value={formData.percentageAmount || ''}
                          onChange={(e) => setFormData({ ...formData, percentageAmount: Number(e.target.value) })}
                          placeholder="أدخل النسبة المئوية"
                        />
                      </div>
                    </div>
                    {formData.caseId && formData.percentageAmount && (
                      <div className="rounded-md bg-gray-50 p-4">
                        <p className="text-sm text-gray-600">
                          المبلغ المحسوب: {((cases.find(c => c.id === formData.caseId)?.amount || 0) * (formData.percentageAmount / 100)).toFixed(2)} ر.س
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Label>المبلغ</Label>
                    <Input
                      type="number"
                      required
                      value={formData.amount || ''}
                      onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
                      placeholder="أدخل المبلغ"
                    />
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>التاريخ</Label>
                    <Input
                      type="date"
                      required
                      value={typeof formData.date === 'string' ? formData.date : (formData.date as Date).toISOString().split('T')[0]}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>نوع المعاملة</Label>
                    <select
                      className="w-full p-2 border rounded-md"
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                    >
                      <option value="دفعة">دفعة</option>
                      <option value="فاتورة">فاتورة</option>
                      <option value="استرداد">استرداد</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>الحالة</Label>
                  <select
                    className="w-full p-2 border rounded-md"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  >
                    <option value="مدفوعة">مدفوعة</option>
                    <option value="معلقة">معلقة</option>
                    <option value="ملغية">ملغية</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>الوصف</Label>
                  <Textarea
                    required
                    value={formData.description || ''}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="أدخل وصف المعاملة"
                  />
                </div>
                <div className="space-y-2">
                  <Label>ملاحظات إضافية</Label>
                  <Textarea
                    value={formData.notes || ''}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="أدخل أي ملاحظات إضافية"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="block text-sm font-medium">المرفقات</Label>
                  {recordAttachments.length > 0 && (
                    <div className="mb-2 space-y-1 p-2 border rounded-md bg-gray-50">
                      <p className="text-sm font-medium">المرفقات الحالية:</p>
                      {recordAttachments.map((attachment, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center">
                            <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span className="text-sm">{attachment}</span>
                          </div>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                  <FileUpload 
                    onFileSelect={handleFileSelect}
                    label="إضافة مرفقات جديدة"
                  />
                  {files.length > 0 && (
                    <div className="mt-2 space-y-1">
                      <p className="text-sm font-medium">مرفقات جديدة للإضافة:</p>
                      {files.map((file, index) => (
                        <div key={index} className="text-sm text-muted-foreground">
                          {file.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex justify-end gap-2">
                  <Button type="button" variant="secondary" onClick={handleCancel}>
                    إلغاء
                  </Button>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "جاري الحفظ..." : (editingRecord ? "حفظ التعديلات" : "إضافة المعاملة")}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        <div className="rounded-lg border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">التاريخ</TableHead>
                <TableHead className="text-center">النوع</TableHead>
                <TableHead className="text-center">المبلغ</TableHead>
                <TableHead className="text-center hidden md:table-cell">الوصف</TableHead>
                <TableHead className="text-center">الحالة</TableHead>
                <TableHead className="text-center">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customerRecords.map((record) => (
                <TableRow key={record.id}>
                  <TableCell className="text-center">
                    {format(new Date(record.date), 'yyyy-MM-dd')}
                  </TableCell>
                  <TableCell className="text-center">{record.type}</TableCell>
                  <TableCell className="text-center">
                    {record.amount} ريال
                    {record.isPercentage && record.caseId && record.percentageAmount && (
                      <div className="text-xs text-muted-foreground">
                        ({record.percentageAmount}% من القضية)
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="text-center hidden md:table-cell max-w-[300px] truncate">
                    {record.description}
                  </TableCell>
                  <TableCell className="text-center">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${
                          record.status === "مدفوعة"
                            ? "bg-green-100 text-green-800"
                            : record.status === "معلقة"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                    >
                      {record.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(record)}
                      >
                        <Pencil className="h-4 w-4 mr-1" />
                        تعديل
                      </Button>
                      {record.attachments && record.attachments.length > 0 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          title="تنزيل المرفقات"
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {customerRecords.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground">
                    لا توجد سجلات مالية لهذا العميل
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="mt-6 flex justify-end">
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

export type { FinancialRecordFormValues };
