
import React from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/shared/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { Customer } from "@/types/customer";
import { Link } from "react-router-dom";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger 
} from "@/shared/components/ui/tooltip";
import { 
  FiPhone, 
  FiDollarSign, 
  FiMessageSquare, 
  FiEye, 
  FiEdit, 
  FiTrash2 
} from "react-icons/fi";

interface CustomerTableProps {
  customers: Customer[];
  onDelete: (customer: Customer) => void;
  onSendSms: (customer: Customer) => void;
  onViewFinancial: (customer: Customer) => void;
  onEdit: (customer: Customer) => void;
  onView: (customer: Customer) => void;
}

export function CustomerTable({
  customers,
  onDelete,
  onSendSms,
  onViewFinancial,
  onEdit,
  onView
}: CustomerTableProps) {
  return (
    <div className="w-full overflow-hidden border-b border-gray-200 rounded-md">
      <Table>
        <TableHeader className="bg-slate-50">
          <TableRow>
            <TableHead className="w-[25%] text-right font-medium text-slate-700">اسم العميل</TableHead>
            <TableHead className="w-[20%] text-right font-medium text-slate-700">معلومات الاتصال</TableHead>
            <TableHead className="w-[15%] text-right font-medium text-slate-700">النوع</TableHead>
            <TableHead className="w-[15%] text-right font-medium text-slate-700">الحالة</TableHead>
            <TableHead className="w-[25%] text-center font-medium text-slate-700">الإجراءات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.length > 0 ? (
            customers.map((customer, index) => (
              <TableRow 
                key={customer.id} 
                className={index % 2 === 0 ? "bg-white" : "bg-slate-50/50"}
                data-customer-id={customer.id}
              >
                <TableCell className="py-4 font-medium text-slate-800">
                  {customer.name}
                </TableCell>
                <TableCell className="py-4">
                  <div className="flex items-center gap-2 text-slate-700">
                    <FiPhone className="text-slate-400" />
                    {customer.phone}
                  </div>
                </TableCell>
                <TableCell className="py-4 text-slate-700">
                  {customer.type}
                </TableCell>
                <TableCell className="py-4">
                  <Badge 
                    variant={customer.status === "نشط" ? "default" : 
                           customer.status === "معلق" ? "secondary" : "outline"}
                    className={
                      customer.status === "نشط" 
                        ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-100" 
                        : customer.status === "معلق"
                        ? "bg-amber-100 text-amber-800 hover:bg-amber-100"
                        : "bg-slate-100 text-slate-800 hover:bg-slate-100"
                    }
                  >
                    {customer.status}
                  </Badge>
                </TableCell>
                <TableCell className="py-3">
                  <div className="flex items-center justify-center gap-1">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-full hover:bg-sky-50"
                            onClick={() => onViewFinancial(customer)}
                          >
                            <FiDollarSign className="h-4 w-4 text-sky-600" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>المعاملات المالية</p>
                        </TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-full hover:bg-indigo-50"
                            onClick={() => onSendSms(customer)}
                          >
                            <FiMessageSquare className="h-4 w-4 text-indigo-600" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>إرسال رسالة</p>
                        </TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-full hover:bg-emerald-50"
                            onClick={() => onView(customer)}
                          >
                            <FiEye className="h-4 w-4 text-emerald-600" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>عرض التفاصيل</p>
                        </TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-full hover:bg-amber-50"
                            onClick={() => onEdit(customer)}
                          >
                            <FiEdit className="h-4 w-4 text-amber-600" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>تعديل البيانات</p>
                        </TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-full hover:bg-rose-50"
                            onClick={() => onDelete(customer)}
                          >
                            <FiTrash2 className="h-4 w-4 text-rose-600" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>حذف العميل</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="h-24 text-center text-gray-500">
                لا توجد بيانات للعرض
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      
      {customers.length > 0 && (
        <div className="py-3 px-4 text-sm text-gray-500 border-t">
          إجمالي النتائج: {customers.length} عميل
        </div>
      )}
    </div>
  );
}
