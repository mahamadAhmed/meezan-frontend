import React, { useState } from "react";
import { 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell, 
  Table
} from "@/shared/components/ui/table";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger
} from "@/shared/components/ui/dropdown-menu";
import { 
  FiMoreVertical, 
  FiEdit, 
  FiTrash2, 
  FiMail, 
  FiDollarSign,
  FiEye
} from "react-icons/fi";
import type { Customer } from "@/types/customer";
import { format } from "date-fns";

interface CustomersListProps {
  customers: Customer[];
  onAdd: () => void;
  onEdit: (customer: Customer) => void;
  onDelete: (customer: Customer) => void;
  onSendSms: (customer: Customer) => void;
  onViewFinancial: (customer: Customer) => void;
  onViewDetails?: (customer: Customer) => void;
}

export function CustomersList({
  customers,
  onAdd,
  onEdit,
  onDelete,
  onSendSms,
  onViewFinancial,
  onViewDetails,
}: CustomersListProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<string>("all");

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.includes(searchTerm) ||
      customer.phone.includes(searchTerm);

    if (filter === "all") return matchesSearch;
    if (filter === "active") return matchesSearch && customer.status === "نشط";
    if (filter === "inactive") return matchesSearch && customer.status === "غير نشط";
    if (filter === "pending") return matchesSearch && customer.status === "معلق";
    if (filter === "individual") return matchesSearch && customer.type === "فرد";
    if (filter === "company") return matchesSearch && customer.type === "شركة";
    if (filter === "institution") return matchesSearch && customer.type === "مؤسسة";

    return matchesSearch;
  });

  const handleViewDetails = (customer: Customer) => {
    if (onViewDetails) {
      onViewDetails(customer);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="البحث عن عميل..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="flex-none">
          <select
            className="w-full p-2 border rounded-md"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">جميع العملاء</option>
            <option value="active">نشط</option>
            <option value="inactive">غير نشط</option>
            <option value="pending">معلق</option>
            <option value="individual">فرد</option>
            <option value="company">شركة</option>
            <option value="institution">مؤسسة</option>
          </select>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">اسم العميل</TableHead>
              <TableHead>رقم الهاتف</TableHead>
              <TableHead className="hidden md:table-cell">النوع</TableHead>
              <TableHead>الحالة</TableHead>
              <TableHead className="hidden lg:table-cell">تاريخ الانضمام</TableHead>
              <TableHead className="text-left">الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCustomers.length > 0 ? (
              filteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell className="font-medium">
                    {onViewDetails ? (
                      <button 
                        className="text-primary hover:underline text-right" 
                        onClick={() => handleViewDetails(customer)}
                      >
                        {customer.name}
                      </button>
                    ) : (
                      customer.name
                    )}
                  </TableCell>
                  <TableCell>{customer.phone}</TableCell>
                  <TableCell className="hidden md:table-cell">{customer.type}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${
                          customer.status === "نشط"
                            ? "bg-green-100 text-green-800"
                            : customer.status === "غير نشط"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                    >
                      {customer.status}
                    </span>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    {format(new Date(customer.joinDate), 'yyyy-MM-dd')}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-2">
                      {onViewDetails && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewDetails(customer)}
                          className="hidden sm:flex"
                        >
                          <FiEye className="ml-1 h-4 w-4" />
                          <span>عرض</span>
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onViewFinancial(customer)}
                        className="hidden sm:flex"
                      >
                        <FiDollarSign className="ml-1 h-4 w-4" />
                        <span>المعاملات</span>
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <FiMoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {onViewDetails && (
                            <DropdownMenuItem 
                              onClick={() => handleViewDetails(customer)}
                              className="sm:hidden"
                            >
                              <FiEye className="ml-2 h-4 w-4" />
                              <span>عرض التفاصيل</span>
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem 
                            onClick={() => onViewFinancial(customer)}
                            className="sm:hidden"
                          >
                            <FiDollarSign className="ml-2 h-4 w-4" />
                            <span>المعاملات المالية</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => onEdit(customer)}>
                            <FiEdit className="ml-2 h-4 w-4" />
                            <span>تعديل</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => onSendSms(customer)}>
                            <FiMail className="ml-2 h-4 w-4" />
                            <span>إرسال رسالة</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => onDelete(customer)}>
                            <FiTrash2 className="ml-2 h-4 w-4" />
                            <span>حذف</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  لا توجد بيانات للعرض
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {filteredCustomers.length > 0 && (
        <div className="text-sm text-muted-foreground">
          إجمالي النتائج: {filteredCustomers.length} عميل
        </div>
      )}
    </div>
  );
}
