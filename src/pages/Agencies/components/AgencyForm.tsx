
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { CalendarIcon, PlusCircle, FileText } from "lucide-react";
import { ar } from "date-fns/locale";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/shared/components/ui/textarea";
import { Calendar } from "@/shared/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover";
import { cn } from "@/shared/utils/utils";
import { Agency, AgencyFormValues } from "../types/agency";
import { useState } from "react";
import { FileUploader } from "@/components/FileUploader";

const formSchema = z.object({
  title: z.string().min(2, { message: "يجب أن يكون العنوان أكثر من حرفين" }),
  clientName: z.string().min(2, { message: "يجب إدخال اسم العميل" }),
  agentName: z.string().min(2, { message: "يجب إدخال اسم الوكيل" }),
  description: z.string().min(5, { message: "يجب إدخال وصف الوكالة" }),
  status: z.enum(["سارية", "منتهية"]),
  agencyNumber: z.string().optional(),
  issueDate: z.date({ required_error: "يجب تحديد تاريخ الإصدار" }),
  expiryDate: z.date({ required_error: "يجب تحديد تاريخ الانتهاء" }),
  notes: z.string().optional(),
});

interface AgencyFormProps {
  onSubmit: (data: AgencyFormValues) => void;
  initialData?: Agency;
  isLoading?: boolean;
}

export function AgencyForm({ onSubmit, initialData, isLoading = false }: AgencyFormProps) {
  const [attachments, setAttachments] = useState<File[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData?.title || "",
      clientName: initialData?.clientName || "",
      agentName: initialData?.agentName || "",
      description: initialData?.description || "",
      status: initialData?.status || "سارية",
      agencyNumber: initialData?.agencyNumber || "",
      issueDate: initialData?.issueDate ? new Date(initialData.issueDate) : undefined,
      expiryDate: initialData?.expiryDate ? new Date(initialData.expiryDate) : undefined,
      notes: initialData?.notes || "",
    },
  });

  const handleFileChange = (file: File | null) => {
    if (file) {
      setAttachments([...attachments, file]);
    }
  };

  const handleFormSubmit = (data: z.infer<typeof formSchema>) => {
    // Here we ensure all required fields from AgencyFormValues are included
    const formData: AgencyFormValues = {
      title: data.title,
      clientName: data.clientName,
      agentName: data.agentName,
      description: data.description,
      status: data.status,
      agencyNumber: data.agencyNumber,
      issueDate: data.issueDate,
      expiryDate: data.expiryDate,
      notes: data.notes,
      attachments: attachments
    };
    
    onSubmit(formData);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>عنوان الوكالة</FormLabel>
                <FormControl>
                  <Input placeholder="عنوان الوكالة" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="agencyNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>رقم الوكالة</FormLabel>
                <FormControl>
                  <Input placeholder="AGN-001" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
            
          <FormField
            control={form.control}
            name="clientName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>اسم العميل</FormLabel>
                <FormControl>
                  <Input placeholder="اسم العميل" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
            
          <FormField
            control={form.control}
            name="agentName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>اسم الوكيل (المفوّض)</FormLabel>
                <FormControl>
                  <Input placeholder="اسم الوكيل" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
            
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>حالة الوكالة</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر حالة الوكالة" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="سارية">سارية</SelectItem>
                    <SelectItem value="منتهية">منتهية</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
            
          <FormField
            control={form.control}
            name="issueDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>تاريخ الإصدار</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-right font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP", { locale: ar })
                        ) : (
                          <span>اختر تاريخ الإصدار</span>
                        )}
                        <CalendarIcon className="mr-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      locale={ar}
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
            
          <FormField
            control={form.control}
            name="expiryDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>تاريخ الانتهاء</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-right font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP", { locale: ar })
                        ) : (
                          <span>اختر تاريخ الانتهاء</span>
                        )}
                        <CalendarIcon className="mr-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      locale={ar}
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>وصف الوكالة</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="وصف مختصر للوكالة"
                  className="min-h-[100px]"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="notes"
          render={({ field }) => (
            <FormItem>
              <FormLabel>ملاحظات إضافية (اختياري)</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="ملاحظات إضافية"
                  className="min-h-[100px]"
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-2">
          <FormLabel>المرفقات (اختياري)</FormLabel>
          <FileUploader
            onFileChange={handleFileChange}
            acceptedFileTypes=".pdf,.jpg,.jpeg,.png"
          />
          {attachments.length > 0 && (
            <div className="mt-2">
              <p className="text-sm font-medium">الملفات المرفقة:</p>
              <ul className="text-sm">
                {attachments.map((file, index) => (
                  <li key={index} className="flex items-center gap-1">
                    <FileText className="w-4 h-4 text-blue-500" />
                    {file.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <span className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full"></span>
                جاري الحفظ...
              </>
            ) : initialData ? (
              "تحديث الوكالة"
            ) : (
              <>
                <PlusCircle className="ml-2 h-4 w-4" />
                إضافة الوكالة
              </>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
