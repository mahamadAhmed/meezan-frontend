
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { FileUpload } from "@/components/ui/file-upload";
import type { FinancialRecordFormValues } from "@/types/customer";

// Interface for Case with amount
interface CaseWithAmount {
  id: number;
  title?: string;
  amount: number;
}

interface FinancialTransactionFormProps {
  onSubmit: (data: FinancialRecordFormValues) => void;
  isLoading: boolean;
  cases: CaseWithAmount[];
  defaultValues?: Partial<FinancialRecordFormValues> & { 
    attachments?: (string | File)[]
  };
}

export function FinancialTransactionForm({
  onSubmit,
  isLoading,
  cases,
  defaultValues
}: FinancialTransactionFormProps) {
  const [isPercentage, setIsPercentage] = useState(defaultValues?.isPercentage || false);
  const [formData, setFormData] = useState<Partial<FinancialRecordFormValues>>({
    type: "دفعة",
    status: "معلقة",
    date: new Date().toISOString().split('T')[0],
    ...defaultValues
  });
  const [files, setFiles] = useState<File[]>([]);
  const [existingAttachments, setExistingAttachments] = useState<string[]>([]);

  // When defaultValues changes (like when editing a transaction), set any existing attachments
  useEffect(() => {
    if (defaultValues?.attachments && Array.isArray(defaultValues.attachments)) {
      // Filter out string attachments (existing ones) and file attachments (newly added)
      const stringAttachments = defaultValues.attachments.filter(
        attachment => typeof attachment === 'string'
      ) as string[];
      
      if (stringAttachments.length > 0) {
        setExistingAttachments(stringAttachments);
      }
    }
  }, [defaultValues]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.description) return;
    
    // If using percentage, calculate the final amount
    let finalAmount: number;
    if (isPercentage) {
      if (!formData.caseId || !formData.percentageAmount) return;
      const selectedCase = cases.find(c => c.id === formData.caseId);
      if (!selectedCase) return;
      finalAmount = (selectedCase.amount * (formData.percentageAmount / 100));
    } else {
      if (!formData.amount) return;
      finalAmount = formData.amount;
    }

    // Convert date to string if it's a Date object
    const dateValue: string = typeof formData.date === 'string' 
      ? formData.date 
      : formData.date && 'toISOString' in formData.date  // Check if date has toISOString method
        ? (formData.date as Date).toISOString().split('T')[0] 
        : new Date().toISOString().split('T')[0];

    const submitData: FinancialRecordFormValues = {
      amount: finalAmount,
      isPercentage,
      percentageAmount: isPercentage ? formData.percentageAmount : undefined,
      caseId: isPercentage ? formData.caseId : undefined,
      date: dateValue,
      type: formData.type as "دفعة" | "فاتورة" | "استرداد" | "مطالبة",
      description: formData.description as string,
      status: formData.status as "مدفوعة" | "معلقة" | "ملغية",
      notes: formData.notes,
      attachments: files.length > 0 ? files : undefined,
      existingAttachments: existingAttachments.length > 0 ? existingAttachments : undefined,
      customerId: formData.customerId,
      sourceType: formData.sourceType,
      employeeId: formData.employeeId,
      claimType: formData.claimType
    };

    onSubmit(submitData);
  };

  const handleFileSelect = (fileList: FileList) => {
    setFiles(Array.from(fileList));
  };

  const handleRemoveExistingAttachment = (indexToRemove: number) => {
    setExistingAttachments(prev => prev.filter((_, index) => index !== indexToRemove));
  };

  return (
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
                      {case_.title || `قضية رقم ${case_.id}`}
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
            value={formData.amount || ''}
            onChange={(e) => setFormData({ ...formData, amount: Number(e.target.value) })}
            placeholder="أدخل المبلغ"
          />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <option value="مطالبة">مطالبة</option>
          </select>
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
      </div>

      <div className="space-y-2">
        <Label>التاريخ</Label>
        <Input
          type="date"
          value={typeof formData.date === 'string' 
            ? formData.date 
            : formData.date && 'toISOString' in formData.date
                ? (formData.date as Date).toISOString().split('T')[0]
                : new Date().toISOString().split('T')[0]}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          placeholder="أدخل التاريخ"
        />
      </div>

      <div className="space-y-2">
        <Label>الوصف</Label>
        <Textarea
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
        {existingAttachments.length > 0 && (
          <div className="mt-2 space-y-1 p-2 border rounded-md bg-gray-50">
            <p className="text-sm font-medium">المرفقات الحالية:</p>
            {existingAttachments.map((attachment, index) => (
              <div key={index} className="text-sm text-muted-foreground flex items-center justify-between">
                <div className="flex items-center">
                  <span className="mr-2">📎</span>
                  {attachment}
                </div>
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm" 
                  className="h-6 w-6 p-0"
                  onClick={() => handleRemoveExistingAttachment(index)}
                >
                  <span className="sr-only">إزالة</span>
                  ✕
                </Button>
              </div>
            ))}
          </div>
        )}
        <FileUpload
          onFileSelect={handleFileSelect}
          label="اختر المرفقات الجديدة"
        />
        {files.length > 0 && (
          <div className="mt-2 space-y-1">
            <p className="text-sm font-medium">مرفقات جديدة:</p>
            {files.map((file, index) => (
              <div key={index} className="text-sm text-muted-foreground">
                {file.name}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-end gap-2">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "جاري الحفظ..." : "حفظ"}
        </Button>
      </div>
    </form>
  );
}
