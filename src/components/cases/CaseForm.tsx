
import React, { useState, useEffect } from 'react';
import { useForm, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/shared/components/ui/textarea";
import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { MultiSelect } from "@/components/ui/multi-select";
import { Case, CaseStatus, FeeType } from "@/types/case";
import { FiSave, FiX } from "react-icons/fi";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";

const MOCK_LAWYERS = [
  { id: 1, name: "محمد أحمد" },
  { id: 2, name: "سارة خالد" },
  { id: 3, name: "عبدالله محمد" },
];

interface CaseFormProps {
  initialData?: Case;
  onSubmit: (data: any) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

interface CaseFormData {
  caseNumber: string;
  title: string;
  clientName: string;
  type: string;
  court: string;
  createdAt: string;
  status: CaseStatus;
  description: string;
  lawyers: number[];
  nextSession?: string;
  feeType: FeeType;
  feeAmount?: number;
  feePercentage?: number;
  caseValue?: number;
  notes?: string;
}

export const CaseForm = ({
  initialData,
  onSubmit,
  onCancel,
  isSubmitting = false,
}: CaseFormProps) => {
  const [clients, setClients] = React.useState<{ id: number; name: string; }[]>([]);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const storedClients = localStorage.getItem('customers');
    if (storedClients) {
      setClients(JSON.parse(storedClients));
    }
  }, []);

  const { register, handleSubmit, control, formState: { errors }, watch, setValue } = useForm<CaseFormData>({
    defaultValues: {
      caseNumber: initialData?.caseNumber || "",
      title: initialData?.title || "",
      clientName: initialData?.clientName || "",
      type: initialData?.type || "",
      court: initialData?.court || "",
      createdAt: initialData?.createdAt || new Date().toISOString().split('T')[0],
      status: initialData?.status || "نشطة",
      description: initialData?.description || "",
      lawyers: initialData?.lawyers?.map(l => l.id) || [],
      nextSession: initialData?.nextSession,
      feeType: initialData?.fees?.type || "fixed",
      feeAmount: initialData?.fees?.type === "fixed" ? initialData.fees.amount : undefined,
      feePercentage: initialData?.fees?.type === "percentage" ? initialData.fees.percentage : undefined,
      caseValue: initialData?.fees?.caseValue,
      notes: initialData?.notes?.map(note => typeof note === 'string' ? note : note.content).join('\n') || "",
    }
  });

  const feeType = watch("feeType");
  const caseValue = watch("caseValue");
  const feePercentage = watch("feePercentage");

  useEffect(() => {
    if (feeType === "percentage" && caseValue && feePercentage) {
      const estimatedAmount = (caseValue * feePercentage) / 100;
      console.log(`Estimated fee: ${estimatedAmount} (${feePercentage}% of ${caseValue})`);
    }
  }, [feeType, caseValue, feePercentage]);

  const onFormSubmit = (data: CaseFormData) => {
    const formattedData = {
      ...data,
      lawyers: MOCK_LAWYERS.filter(l => data.lawyers.includes(l.id)),
      fees: {
        type: data.feeType,
        status: initialData?.fees?.status || "pending",
        ...(data.feeType === "fixed" ? { amount: data.feeAmount } : {}),
        ...(data.feeType === "percentage" ? { 
          percentage: data.feePercentage,
          caseValue: data.caseValue,
        } : {})
      }
    };
    onSubmit(formattedData);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
      <Card className="border border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle>البيانات الأساسية</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="caseNumber">رقم القضية <span className="text-red-500">*</span></Label>
              <Input
                id="caseNumber"
                {...register("caseNumber", { required: "رقم القضية مطلوب" })}
              />
              {errors.caseNumber && <p className="text-red-500 text-sm">{errors.caseNumber.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">عنوان القضية <span className="text-red-500">*</span></Label>
              <Input
                id="title"
                {...register("title", { required: "عنوان القضية مطلوب" })}
              />
              {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="clientName">اسم العميل <span className="text-red-500">*</span></Label>
              <Controller
                name="clientName"
                control={control}
                rules={{ required: "اسم العميل مطلوب" }}
                render={({ field }) => (
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full justify-between"
                      >
                        {field.value
                          ? clients.find((client) => client.name === field.value)?.name || field.value
                          : "اختر العميل..."}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-full p-0">
                      <Command>
                        <CommandInput placeholder="ابحث عن عميل..." className="h-9" />
                        <CommandEmpty>لم يتم العثور على عميل</CommandEmpty>
                        <CommandGroup>
                          {clients.map((client) => (
                            <CommandItem
                              key={client.id}
                              onSelect={() => {
                                field.onChange(client.name);
                                setOpen(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  "ml-2 h-4 w-4",
                                  field.value === client.name ? "opacity-100" : "opacity-0"
                                )}
                              />
                              {client.name}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                )}
              />
              {errors.clientName && <p className="text-red-500 text-sm">{errors.clientName.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="court">المحكمة <span className="text-red-500">*</span></Label>
              <Input
                id="court"
                {...register("court", { required: "اسم المحكمة مطلوب" })}
                placeholder="أدخل اسم المحكمة"
              />
              {errors.court && <p className="text-red-500 text-sm">{errors.court.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="lawyers">المحامون المسؤولون</Label>
            <Controller
              name="lawyers"
              control={control}
              render={({ field }) => (
                <MultiSelect
                  value={field.value}
                  onChange={field.onChange}
                  options={MOCK_LAWYERS.map(lawyer => ({
                    value: lawyer.id,
                    label: lawyer.name
                  }))}
                  placeholder="اختر المحامين"
                />
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="type">نوع القضية <span className="text-red-500">*</span></Label>
              <Input
                id="type"
                {...register("type", { required: "نوع القضية مطلوب" })}
              />
              {errors.type && <p className="text-red-500 text-sm">{errors.type.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">حالة القضية <span className="text-red-500">*</span></Label>
              <Controller
                name="status"
                control={control}
                rules={{ required: "حالة القضية مطلوبة" }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر الحالة" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="نشطة">نشطة</SelectItem>
                      <SelectItem value="قيد المعالجة">قيد المعالجة</SelectItem>
                      <SelectItem value="مغلقة">مغلقة</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.status && <p className="text-red-500 text-sm">{errors.status.message}</p>}
            </div>
          </div>

          <div className="space-y-4">
            <Label htmlFor="fees">الرسوم</Label>
            <div className="space-y-4 p-4 bg-slate-50 rounded-md">
              <Controller
                name="feeType"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="نوع الرسوم" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fixed">مبلغ ثابت</SelectItem>
                      <SelectItem value="percentage">نسبة من قيمة القضية</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              
              {feeType === "fixed" && (
                <div className="space-y-2">
                  <Label htmlFor="feeAmount">المبلغ الثابت</Label>
                  <Input
                    id="feeAmount"
                    type="number"
                    {...register("feeAmount", { 
                      valueAsNumber: true,
                      validate: value => feeType === "fixed" && (!value || value <= 0) ? "يجب تحديد المبلغ" : true 
                    })}
                    placeholder="أدخل المبلغ"
                  />
                  {errors.feeAmount && <p className="text-red-500 text-sm">{errors.feeAmount.message}</p>}
                </div>
              )}

              {feeType === "percentage" && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="feePercentage">النسبة المئوية</Label>
                    <Input
                      id="feePercentage"
                      type="number"
                      {...register("feePercentage", { 
                        valueAsNumber: true,
                        validate: value => feeType === "percentage" && (!value || value <= 0 || value > 100) ? "يجب تحديد نسبة صحيحة بين 1 و 100" : true
                      })}
                      placeholder="أدخل النسبة المئوية"
                      min="0"
                      max="100"
                    />
                    {errors.feePercentage && <p className="text-red-500 text-sm">{errors.feePercentage.message}</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="caseValue">قيمة القضية (اختياري)</Label>
                    <Input
                      id="caseValue"
                      type="number"
                      {...register("caseValue", { valueAsNumber: true })}
                      placeholder="أدخل قيمة القضية"
                    />
                  </div>
                  
                  {feePercentage && caseValue && (
                    <div className="p-3 bg-primary/10 rounded-md text-sm">
                      <p>القيمة التقديرية للرسوم: <strong>{((caseValue * feePercentage) / 100).toLocaleString('ar-SA')} ر.س</strong> ({feePercentage}% من {caseValue.toLocaleString('ar-SA')})</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border border-slate-200 shadow-sm">
        <CardHeader>
          <CardTitle>تفاصيل القضية</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="description">وصف القضية <span className="text-red-500">*</span></Label>
            <Textarea
              id="description"
              {...register("description", { required: "وصف القضية مطلوب" })}
              rows={5}
            />
            {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">ملاحظات</Label>
            <Textarea
              id="notes"
              {...register("notes")}
              placeholder="أضف ملاحظاتك هنا..."
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-3">
        <Button type="submit" className="bg-primary hover:bg-primary/90" disabled={isSubmitting}>
          {isSubmitting ? (
            <div className="flex items-center">
              <div className="animate-spin mr-2 w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
              جاري الحفظ...
            </div>
          ) : (
            <>
              <FiSave className="ml-2 h-4 w-4" />
              حفظ
            </>
          )}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          <FiX className="ml-2 h-4 w-4" />
          إلغاء
        </Button>
      </div>
    </form>
  );
};
