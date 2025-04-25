import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import type { Customer } from "@/types/customer";

const smsFormSchema = z.object({
  message: z.string().min(10, {
    message: "الرسالة يجب أن تحتوي على 10 أحرف على الأقل",
  }),
});

export type SmsFormValues = z.infer<typeof smsFormSchema>;

interface SmsFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customer: Customer;
  onSubmit: (values: SmsFormValues) => void;
  isLoading: boolean;
}

export function SmsForm({
  open,
  onOpenChange,
  customer,
  onSubmit,
  isLoading,
}: SmsFormProps) {
  const form = useForm<SmsFormValues>({
    resolver: zodResolver(smsFormSchema),
    defaultValues: {
      message: `عزيزي العميل ${customer.name}، نشكرك على ثقتك في مكتبنا.`,
    },
  });

  const handleSmsSubmit = (values: SmsFormValues) => {
    onSubmit(values);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>إرسال رسالة SMS</DialogTitle>
          <DialogDescription>
            إرسال رسالة SMS مخصصة إلى العميل {customer.name}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSmsSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>الرسالة</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="أدخل نص الرسالة"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <span className="animate-pulse">جاري الإرسال...</span>
                ) : (
                  "إرسال الرسالة"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
