
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, FileText, FileCheck, Clock, Building, X, DownloadCloud, ExternalLink } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/shared/utils/utils";
import { ar } from "date-fns/locale";
import { Agency } from "../types/agency";

interface AgencyDetailsDialogProps {
  agency: Agency;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AgencyDetailsDialog({
  agency,
  open,
  onOpenChange,
}: AgencyDetailsDialogProps) {
  // Create a default agency with all required properties for type safety
  const defaultAgency: Agency = {
    id: 0,
    title: "",
    clientName: "",
    description: "",
    createdAt: "",
    status: "منتهية",
    agencyNumber: "",
    clientId: 0,
    agentName: "",
    issueDate: "",
    expiryDate: "",
    details: "",
    attachments: []
  };
  
  // Mock clients for displaying client name
  const mockClients = [
    { id: 1, name: "محمد العتيبي" },
    { id: 2, name: "أحمد السالم" },
    { id: 3, name: "خالد المالكي" },
    { id: 4, name: "ناصر القحطاني" },
    { id: 5, name: "عبدالله العنزي" },
  ];
  
  // Ensure we have a valid agency object with default values if needed
  const safeAgency: Agency = agency || defaultAgency;
  
  const formatDate = (dateString: string) => {
    if (!dateString) return "غير محدد";
    
    try {
      return format(new Date(dateString), "PPP", { locale: ar });
    } catch (error) {
      return dateString;
    }
  };

  // Ensure attachments are always handled as an array
  const safeAttachments = Array.isArray(safeAgency.attachments) ? safeAgency.attachments : [];

  // Get client name from the mockClients array
  const clientName = safeAgency.clientName || mockClients.find(c => c.id === safeAgency.clientId)?.name || "غير محدد";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader className="flex flex-row items-start justify-between">
          <DialogTitle className="text-xl font-bold">تفاصيل الوكالة</DialogTitle>
          <DialogClose asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full">
              <X className="h-4 w-4" />
            </Button>
          </DialogClose>
        </DialogHeader>
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 bg-slate-50 p-4 rounded-lg">
            <div className="flex items-center gap-2">
              <h3 className="text-2xl font-bold text-slate-800">
                {safeAgency.title}
              </h3>
              <div className="text-lg text-slate-500">{safeAgency.agencyNumber}</div>
            </div>
            <Badge
              className={cn(
                "w-fit text-sm px-3 py-1",
                safeAgency.status === "سارية"
                  ? "bg-emerald-50 text-emerald-600 border-emerald-200 hover:bg-emerald-100"
                  : "bg-rose-50 text-rose-600 border-rose-200 hover:bg-rose-100"
              )}
            >
              {safeAgency.status === "سارية" ? 
                <span className="flex items-center gap-1"><FileCheck className="w-3.5 h-3.5" /> {safeAgency.status}</span> : 
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {safeAgency.status}</span>
              }
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-slate-600">
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 rounded-lg bg-slate-50 border border-slate-100">
                <Building className="w-5 h-5 text-indigo-500" />
                <div className="flex flex-col">
                  <span className="text-xs text-slate-500">العميل</span>
                  <span className="font-medium text-slate-800">{clientName}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-lg bg-slate-50 border border-slate-100">
                <User className="w-5 h-5 text-indigo-500" />
                <div className="flex flex-col">
                  <span className="text-xs text-slate-500">الوكيل</span>
                  <span className="font-medium text-slate-800">{safeAgency.agentName || "غير محدد"}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 rounded-lg bg-slate-50 border border-slate-100">
                <Calendar className="w-5 h-5 text-emerald-500" />
                <div className="flex flex-col">
                  <span className="text-xs text-slate-500">تاريخ الإصدار</span>
                  <span className="font-medium text-slate-800" dir="ltr">
                    {formatDate(safeAgency.issueDate || "")}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 rounded-lg bg-slate-50 border border-slate-100">
                <Calendar className="w-5 h-5 text-rose-500" />
                <div className="flex flex-col">
                  <span className="text-xs text-slate-500">تاريخ الانتهاء</span>
                  <span className="font-medium text-slate-800" dir="ltr">
                    {formatDate(safeAgency.expiryDate || "")}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h4 className="font-medium flex items-center gap-2 text-slate-700 mb-2">
              <FileText className="w-5 h-5 text-slate-500" />
              الوصف
            </h4>
            <p className="text-slate-600 whitespace-pre-line bg-slate-50 p-4 rounded-lg border border-slate-100">
              {safeAgency.description || "لا يوجد وصف مضاف"}
            </p>
          </div>

          {safeAgency.details && (
            <div className="space-y-2">
              <h4 className="font-medium flex items-center gap-2 text-slate-700 mb-2">
                <FileText className="w-5 h-5 text-slate-500" />
                التفاصيل
              </h4>
              <p className="text-slate-600 whitespace-pre-line bg-slate-50 p-4 rounded-lg border border-slate-100">
                {safeAgency.details}
              </p>
            </div>
          )}

          <div className="space-y-2">
            <h4 className="font-medium flex items-center gap-2 text-slate-700 mb-2">
              <FileText className="w-5 h-5 text-slate-500" />
              المرفقات
            </h4>
            
            {safeAttachments.length > 0 ? (
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-slate-50 px-4 py-2 border-b text-sm font-medium text-slate-600">
                  الملفات المرفقة
                </div>
                <div className="divide-y">
                  {safeAttachments.map((file, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="w-5 h-5 text-indigo-500" />
                        <span className="text-slate-700 truncate">
                          {file}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm" className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 h-8">
                          <DownloadCloud className="w-4 h-4 mr-1" />
                          <span>تحميل</span>
                        </Button>
                        <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-700 hover:bg-slate-50 h-8">
                          <ExternalLink className="w-4 h-4 mr-1" />
                          <span>فتح</span>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-8 bg-slate-50 rounded-lg border border-dashed border-slate-200 flex flex-col items-center">
                <FileText className="w-10 h-10 mb-3 text-slate-300" />
                <p className="text-slate-500">لا توجد مرفقات</p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
