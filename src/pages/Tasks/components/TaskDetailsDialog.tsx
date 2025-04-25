
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FileText, User, Calendar, Clock, Briefcase } from "lucide-react";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/shared/utils/utils";

interface TaskDetailsDialogProps {
  task: {
    id: number;
    title: string;
    description: string;
    dueDate: string;
    time: string;
    assignee: string;
    priority: "عالية" | "متوسطة" | "منخفضة";
    caseNumber?: string;
    status: "جديدة" | "قيد التنفيذ" | "مكتملة";
    attachments?: string[];
  };
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const priorityColors = {
  "عالية": "bg-rose-500 hover:bg-rose-600",
  "متوسطة": "bg-amber-500 hover:bg-amber-600",
  "منخفضة": "bg-emerald-500 hover:bg-emerald-600",
};

const statusColors = {
  "جديدة": "bg-blue-500 hover:bg-blue-600",
  "قيد التنفيذ": "bg-amber-500 hover:bg-amber-600",
  "مكتملة": "bg-emerald-500 hover:bg-emerald-600",
};

export function TaskDetailsDialog({ task, open, onOpenChange }: TaskDetailsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl">تفاصيل المهمة</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <h3 className="font-bold text-lg text-slate-800">{task.title}</h3>
            <div className="flex gap-2 mt-2">
              <Badge className={cn(priorityColors[task.priority], "text-white")}>
                الأهمية: {task.priority}
              </Badge>
              <Badge className={cn(statusColors[task.status], "text-white")}>
                {task.status}
              </Badge>
            </div>
          </div>

          {task.description && (
            <div className="flex items-start gap-2 text-slate-600">
              <FileText className="w-5 h-5 text-slate-400 mt-0.5" />
              <p>{task.description}</p>
            </div>
          )}

          <div className="flex items-center gap-2 text-slate-600">
            <Calendar className="w-5 h-5 text-slate-400" />
            <span>{format(new Date(task.dueDate), "PPP", { locale: ar })}</span>
          </div>

          <div className="flex items-center gap-2 text-slate-600">
            <Clock className="w-5 h-5 text-slate-400" />
            <span>{task.time}</span>
          </div>

          <div className="flex items-center gap-2 text-slate-600">
            <User className="w-5 h-5 text-slate-400" />
            <span>{task.assignee}</span>
          </div>
          
          {task.caseNumber && (
            <div className="flex items-center gap-2 text-slate-600">
              <Briefcase className="w-5 h-5 text-slate-400" />
              <span>رقم القضية: {task.caseNumber}</span>
            </div>
          )}

          {task.attachments && task.attachments.length > 0 && (
            <div className="border rounded-lg p-4">
              <h4 className="font-medium mb-2">المرفقات:</h4>
              <ul className="space-y-2">
                {task.attachments.map((file, index) => (
                  <li key={index} className="text-blue-600 hover:underline">
                    <a href={file} target="_blank" rel="noopener noreferrer">
                      {file.split("/").pop()}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
