
import React from "react";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Mail, Phone, Edit, Trash2, MessageSquare } from "lucide-react";

// Employee interface kept as is

interface Employee {
  id: number;
  name: string;
  email: string;
  phone: string;
  jobTitle: string;
  position: string;
  role?: string;
  department: string;
  joinDate: string;
  status: "active" | "vacation" | "leave" | "terminated" | "نشط" | "في إجازة" | "منتهي";
  imageUrl?: string;
}

interface EmployeeCardProps {
  employee: Employee;
  onEdit: (employee: Employee) => void;
  onDelete: (employee: Employee) => void;
  onSendMessage: (employee: Employee) => void;
}

export default function EmployeeCard({ employee, onEdit, onDelete, onSendMessage }: EmployeeCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
      case "نشط":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case "vacation":
      case "في إجازة":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      case "leave":
        return "bg-amber-100 text-amber-800 hover:bg-amber-200";
      case "terminated":
      case "منتهي":
        return "bg-red-100 text-red-800 hover:bg-red-200";
      default:
        return "bg-slate-100 text-slate-800";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "active": return "نشط";
      case "vacation": return "إجازة";
      case "leave": return "غياب";
      case "terminated": return "منتهي";
      default: return status;
    }
  };

  return (
    <Card className="h-full flex flex-col shadow-md border border-slate-100">
      <CardContent className="pt-6 pb-4 flex-1 flex flex-col">
        <div className="flex flex-col items-center text-center mb-4">
          <Avatar className="h-20 w-20 mb-2">
            <AvatarImage src={employee.imageUrl} alt={employee.name} />
            <AvatarFallback className="text-xl bg-primary/20 text-primary">
              {employee.name.substring(0, 2)}
            </AvatarFallback>
          </Avatar>
          <h3 className="text-lg font-bold text-slate-800">{employee.name}</h3>
          <span className="text-sm text-gray-500 mb-1">{employee.jobTitle}</span>
          <Badge className={`mt-1 ${getStatusColor(employee.status)}`}>
            {getStatusLabel(employee.status)}
          </Badge>
        </div>

        <div className="space-y-2 mt-2 flex-1 text-sm">
          <div className="flex items-center justify-center text-slate-600">
            <Mail size={16} className="mr-1.5 text-[#7E69AB]" />
            <span className="truncate">{employee.email}</span>
          </div>
          <div className="flex items-center justify-center text-slate-600">
            <Phone size={16} className="mr-1.5 text-[#7E69AB]" />
            <span className="ltr:ml-1 rtl:mr-1">{employee.phone}</span>
          </div>
        </div>

        <div className="flex flex-row gap-2 mt-6 justify-center">
          <Button
            size="sm"
            variant="ghost"
            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-3"
            onClick={() => onSendMessage(employee)}
          >
            <MessageSquare className="h-4 w-4 mr-1" />
            <span className="hidden sm:inline">رسالة</span>
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="text-amber-600 hover:text-amber-700 hover:bg-amber-50 px-3"
            onClick={() => onEdit(employee)}
          >
            <Edit className="h-4 w-4 mr-1" />
            <span className="hidden sm:inline">تعديل</span>
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="text-red-600 hover:text-red-700 hover:bg-red-50 px-3"
            onClick={() => onDelete(employee)}
          >
            <Trash2 className="h-4 w-4 mr-1" />
            <span className="hidden sm:inline">حذف</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
