import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Card, CardHeader, CardTitle, CardContent } from "@/shared/components/ui/card";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/shared/components/ui/form";
import { Textarea } from "@/shared/components/ui/textarea";
import { Button } from "@/shared/components/ui/button";
import { FileUpload } from "@/components/ui/file-upload";
import { toast } from "sonner";
import MainLayout from "@/layouts/MainLayout";

const REQUEST_TYPES = [
  { value: "اجازة", label: "طلب إجازة" },
  { value: "مالية", label: "مطالبة مالية" },
  { value: "اخرى", label: "أخرى" }
];

type EmployeeRequestForm = {
  type: string;
  description: string;
};

const EmployeeRequests: React.FC = () => {
  const [attachments, setAttachments] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const form = useForm<EmployeeRequestForm>({
    defaultValues: {
      type: "",
      description: "",
    },
  });

  const handleFileSelect = (files: FileList) => {
    setAttachments(Array.from(files));
  };

  const onSubmit = (data: EmployeeRequestForm) => {
    setLoading(true);
    // هنا ممكن رفع الطلب إلى السيرفر مستقبلًا
    console.log("Form data:", data);
    console.log("Attachments:", attachments);
    
    setTimeout(() => {
      setLoading(false);
      toast.success("تم إرسال طلبك بنجاح");
      form.reset();
      setAttachments([]);
    }, 1200);
  };

  return (
    <MainLayout>
      <div className="flex justify-center items-center min-h-[80vh] px-2">
        <Card className="w-full max-w-lg mx-auto shadow-lg bg-white rounded-lg">
          <CardHeader>
            <CardTitle className="text-right text-lg font-bold">طلبات الموظفين</CardTitle>
            <FormDescription className="text-right text-sm text-muted-foreground">
              يمكنك هنا إنشاء طلب (إجازة، مطالبة مالية، أو أخرى) وإرفاق ما يلزم.
            </FormDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                {/* نوع الطلب */}
                <FormField
                  control={form.control}
                  name="type"
                  rules={{ required: "يرجى اختيار نوع الطلب" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-right">نوع الطلب<span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <select
                          {...field}
                          className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 bg-white text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition"
                        >
                          <option value="">اختر نوع الطلب...</option>
                          {REQUEST_TYPES.map((t) => (
                            <option key={t.value} value={t.value}>{t.label}</option>
                          ))}
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* وصف الطلب */}
                <FormField
                  control={form.control}
                  name="description"
                  rules={{ required: "يرجى إدخال تفاصيل الطلب" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-right">محتوى الطلب<span className="text-red-500">*</span></FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="اكتب تفاصيل الطلب هنا..."
                          {...field}
                          rows={4}
                          className="resize-none"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {/* رفع المرفقات */}
                <FormItem>
                  <FormLabel className="text-right">المرفقات (اختياري)</FormLabel>
                  <FormControl>
                    <FileUpload
                      label="إرفاق ملفات"
                      onFileSelect={handleFileSelect}
                      accept="image/*,application/pdf"
                    />
                  </FormControl>
                  {attachments.length > 0 && (
                    <ul className="mt-2 list-disc pr-5 space-y-1 text-sm text-muted-foreground">
                      {attachments.map((file, i) => (
                        <li key={i}>{file.name}</li>
                      ))}
                    </ul>
                  )}
                </FormItem>
                
                <div className="flex justify-end">
                  <Button type="submit" className="w-full sm:w-auto" disabled={loading}>
                    {loading ? "جارٍ الإرسال..." : "إرسال الطلب"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default EmployeeRequests;
