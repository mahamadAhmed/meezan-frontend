
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { ModalForm } from "@/components/ui/modal-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import type { FinancialRecord } from "@/types/customer";

const financialRecordSchema = z.object({
  amount: z.coerce.number().min(1, {
    message: "المبلغ يجب أن يكون أكبر من صفر",
  }),
  customerId: z.coerce.number({
    required_error: "يرجى اختيار العميل",
  }),
  date: z.string().min(1, {
    message: "التاريخ مطلوب",
  }),
  type: z.enum(["دفعة", "فاتورة", "استرداد"], {
    required_error: "يرجى اختيار نوع المعاملة",
  }),
  description: z.string().min(3, {
    message: "الوصف يجب أن يحتوي على 3 أحرف على الأقل",
  }),
  status: z.enum(["مدفوعة", "معلقة", "ملغية"], {
    required_error: "يرجى اختيار حالة المعاملة",
  }),
});

export type FinancialTransactionFormValues = z.infer<typeof financialRecordSchema>;

interface AddFinancialTransactionFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddTransaction: (data: FinancialTransactionFormValues) => void;
  isLoading: boolean;
  customers: { id: number; name: string }[];
}

export function AddFinancialTransactionForm({
  open,
  onOpenChange,
  onAddTransaction,
  isLoading,
  customers,
}: AddFinancialTransactionFormProps) {
  const form = useForm<FinancialTransactionFormValues>({
    resolver: zodResolver(financialRecordSchema),
    defaultValues: {
      amount: 0,
      customerId: 0,
      date: new Date().toISOString().split('T')[0],
      type: "دفعة",
      description: "",
      status: "معلقة",
    },
  });

  const handleSubmit = (data: FinancialTransactionFormValues) => {
    onAddTransaction(data);
    form.reset();
  };

  return (
    <ModalForm
      open={open}
      onOpenChange={onOpenChange}
      title="إضافة معاملة مالية جديدة"
      description="إدخال بيانات المعاملة المالية الجديدة"
      onSubmit={form.handleSubmit(handleSubmit)}
      submitLabel="إضافة المعاملة"
      isLoading={isLoading}
      variant="large"
    >
      <Form {...form}>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="customerId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>العميل</FormLabel>
                  <FormControl>
                    <select
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                      {...field}
                      value={field.value || ""}
                      onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : 0)}
                    >
                      <option value="" disabled>اختر العميل</option>
                      {customers.map((customer) => (
                        <option key={customer.id} value={customer.id}>
                          {customer.name}
                        </option>
                      ))}
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>المبلغ (ر.س)</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="أدخل المبلغ"
                      type="number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>التاريخ</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="أدخل التاريخ"
                      type="date"
                      {...field}
                    />
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
                  <FormLabel>نوع المعاملة</FormLabel>
                  <FormControl>
                    <select
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                      {...field}
                    >
                      <option value="دفعة">دفعة</option>
                      <option value="فاتورة">فاتورة</option>
                      <option value="استرداد">استرداد</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>الحالة</FormLabel>
                <FormControl>
                  <select
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                    {...field}
                  >
                    <option value="مدفوعة">مدفوعة</option>
                    <option value="معلقة">معلقة</option>
                    <option value="ملغية">ملغية</option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>الوصف</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="أدخل وصفًا للمعاملة المالية"
                    className="min-h-[80px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </Form>
    </ModalForm>
  );
}
