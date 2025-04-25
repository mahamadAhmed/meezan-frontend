
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/shared/utils/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "الاسم يجب أن يكون أكثر من حرفين.",
  }),
  email: z.string().email({
    message: "الرجاء إدخال بريد إلكتروني صحيح.",
  }),
  phone: z.string().min(10, {
    message: "رقم الهاتف يجب أن يكون على الأقل 10 أرقام.",
  }),
  address: z.string().optional(),
  nationalId: z.string().min(9, {
    message: "رقم الهوية يجب أن يكون على الأقل 9 أرقام.",
  }),
  attachments: z.array(z.instanceof(File)).optional(),
  // Add the missing fields needed by CustomerCreate.tsx
  type: z.enum(['فرد', 'شركة', 'مؤسسة']).default('فرد'),
  status: z.enum(['نشط', 'غير نشط', 'معلق']).default('نشط'),
  notes: z.string().optional(),
  joinDate: z.string().default(() => new Date().toISOString().split('T')[0]),
});

export interface CustomerFormValues extends z.infer<typeof formSchema> {}

export const CustomerForm = ({ 
  onSubmit, 
  initialValues,
  isLoading
}: { 
  onSubmit: (data: CustomerFormValues) => void;
  initialValues?: Partial<CustomerFormValues>;
  isLoading?: boolean;
}) => {
  const form = useForm<CustomerFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialValues?.name || "",
      email: initialValues?.email || "",
      phone: initialValues?.phone || "",
      address: initialValues?.address || "",
      nationalId: initialValues?.nationalId || "",
      attachments: initialValues?.attachments || [],
      type: initialValues?.type || "فرد",
      status: initialValues?.status || "نشط",
      notes: initialValues?.notes || "",
      joinDate: initialValues?.joinDate || new Date().toISOString().split('T')[0],
    },
    mode: "onChange",
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      form.setValue("attachments", files);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>الاسم</FormLabel>
              <FormControl>
                <Input placeholder="اسم العميل" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>البريد الإلكتروني</FormLabel>
              <FormControl>
                <Input type="email" placeholder="example@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>رقم الهاتف</FormLabel>
              <FormControl>
                <Input placeholder="05xxxxxxxx" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>العنوان</FormLabel>
              <FormControl>
                <Textarea placeholder="العنوان" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="nationalId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>رقم الهوية</FormLabel>
              <FormControl>
                <Input placeholder="رقم الهوية" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>نوع العميل</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر نوع العميل" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="فرد">فرد</SelectItem>
                  <SelectItem value="شركة">شركة</SelectItem>
                  <SelectItem value="مؤسسة">مؤسسة</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>حالة العميل</FormLabel>
              <Select 
                onValueChange={field.onChange} 
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر حالة العميل" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="نشط">نشط</SelectItem>
                  <SelectItem value="غير نشط">غير نشط</SelectItem>
                  <SelectItem value="معلق">معلق</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ملاحظات</FormLabel>
              <FormControl>
                <Textarea placeholder="ملاحظات إضافية" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="joinDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>تاريخ الانضمام</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="attachments"
          render={() => (
            <FormItem>
              <FormLabel>المرفقات</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className={cn(
                    "file:border-0 file:bg-popover file:text-popover-foreground",
                    form.formState.errors.attachments ? "border-destructive" : "border-input"
                  )}
                />
              </FormControl>
              <FormDescription>
                يمكنك إرفاق ملفات مثل العقود أو الوثائق الأخرى ذات الصلة.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "جاري الحفظ..." : "حفظ"}
        </Button>
      </form>
    </Form>
  );
};

export default CustomerForm;
