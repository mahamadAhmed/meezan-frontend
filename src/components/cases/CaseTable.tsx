
import { useState } from "react";
import { Link } from "react-router-dom";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Case, CaseStatus, statusColors } from "@/types/case";
import { FiEye, FiEdit, FiTrash2 } from "react-icons/fi";

// Mock case data - in a real application, this would come from an API
const MOCK_CASES: Case[] = [
  {
    id: 1,
    title: "قضية تعويض حادث مروري",
    caseNumber: "TRF/2025/001",
    status: "نشطة",
    clientName: "أحمد محمد",
    clientId: 101,
    createdAt: "2025-01-05",
    court: "المحكمة المرورية",
    nextSession: "2025-05-10",
    lawyers: [{ id: 1, name: "خالد العتيبي" }],
    type: "مدني",
    description: "قضية تعويض عن أضرار حادث مروري"
  },
  {
    id: 2,
    title: "نزاع على ملكية عقار",
    caseNumber: "PRO/2025/042",
    status: "قيد المعالجة",
    clientName: "سارة العبدالله",
    clientId: 102,
    createdAt: "2025-02-10",
    court: "محكمة الأحوال المدنية",
    nextSession: "2025-04-28",
    lawyers: [{ id: 2, name: "سارة المطيري" }],
    type: "عقاري",
    description: "نزاع حول ملكية أرض وعقار"
  },
  {
    id: 3,
    title: "قضية طلاق وحضانة",
    caseNumber: "FAM/2025/118",
    status: "نشطة",
    clientName: "منى الحربي",
    clientId: 103,
    createdAt: "2025-03-01",
    court: "محكمة الأحوال الشخصية",
    nextSession: "2025-05-15",
    lawyers: [{ id: 3, name: "محمد الشمري" }],
    type: "أحوال شخصية",
    description: "قضية طلاق وحضانة أطفال"
  },
  {
    id: 4,
    title: "نزاع تجاري",
    caseNumber: "COM/2025/076",
    status: "مغلقة",
    clientName: "شركة النور التجارية",
    clientId: 104,
    createdAt: "2025-01-20",
    court: "المحكمة التجارية",
    nextSession: null,
    lawyers: [{ id: 4, name: "نورة القحطاني" }],
    type: "تجاري",
    description: "نزاع تجاري بين شركتين"
  },
  {
    id: 5,
    title: "قضية عمالية",
    caseNumber: "LAB/2025/091",
    status: "نشطة",
    clientName: "خالد السعيد",
    clientId: 105,
    createdAt: "2025-02-25",
    court: "محكمة العمل",
    nextSession: "2025-05-05",
    lawyers: [{ id: 1, name: "خالد العتيبي" }],
    type: "عمالي",
    description: "نزاع عمالي مع شركة"
  }
];

interface CaseTableProps {
  filter: {
    status: string;
    lawyer: string;
    dateFrom: string;
    dateTo: string;
    search: string;
  };
}

const CaseTable = ({ filter }: CaseTableProps) => {
  const [cases, setCases] = useState<Case[]>(MOCK_CASES);
  
  // Apply filters to cases
  const filteredCases = cases.filter(caseItem => {
    // Filter by status
    if (filter.status !== "all" && caseItem.status !== filter.status) {
      return false;
    }
    
    // Filter by lawyer
    if (filter.lawyer !== "all" && 
        !caseItem.lawyers?.some(lawyer => lawyer.id.toString() === filter.lawyer)) {
      return false;
    }
    
    // Filter by date range
    if (filter.dateFrom && new Date(caseItem.createdAt) < new Date(filter.dateFrom)) {
      return false;
    }
    
    if (filter.dateTo && new Date(caseItem.createdAt) > new Date(filter.dateTo)) {
      return false;
    }
    
    // Filter by search
    if (filter.search) {
      const searchTerm = filter.search.toLowerCase();
      return (
        caseItem.title.toLowerCase().includes(searchTerm) ||
        caseItem.caseNumber.toLowerCase().includes(searchTerm) ||
        caseItem.clientName.toLowerCase().includes(searchTerm) ||
        caseItem.description.toLowerCase().includes(searchTerm)
      );
    }
    
    return true;
  });

  const handleDelete = (id: number) => {
    if (window.confirm("هل أنت متأكد من حذف هذه القضية؟")) {
      setCases(cases.filter(c => c.id !== id));
    }
  };

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>رقم القضية</TableHead>
            <TableHead>عنوان القضية</TableHead>
            <TableHead>العميل</TableHead>
            <TableHead>المحكمة</TableHead>
            <TableHead>الحالة</TableHead>
            <TableHead>الجلسة القادمة</TableHead>
            <TableHead>المحامي</TableHead>
            <TableHead>إجراءات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredCases.length > 0 ? (
            filteredCases.map((caseItem) => (
              <TableRow key={caseItem.id}>
                <TableCell className="font-medium">{caseItem.caseNumber}</TableCell>
                <TableCell>{caseItem.title}</TableCell>
                <TableCell>{caseItem.clientName}</TableCell>
                <TableCell>{caseItem.court}</TableCell>
                <TableCell>
                  <Badge className={`${statusColors[caseItem.status as CaseStatus]} text-white`}>
                    {caseItem.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {caseItem.nextSession ? caseItem.nextSession : "لا يوجد"}
                </TableCell>
                <TableCell>
                  {caseItem.lawyers?.length > 0 
                    ? caseItem.lawyers.map(l => l.name).join(', ') 
                    : "غير معين"}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Link to={`/cases/${caseItem.id}`}>
                      <Button variant="ghost" size="icon" title="عرض">
                        <FiEye className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Link to={`/cases/${caseItem.id}/edit`}>
                      <Button variant="ghost" size="icon" title="تعديل">
                        <FiEdit className="w-4 h-4" />
                      </Button>
                    </Link>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      title="حذف"
                      onClick={() => handleDelete(caseItem.id)}
                    >
                      <FiTrash2 className="w-4 h-4 text-red-500" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                لا توجد قضايا مطابقة لمعايير البحث
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      
      {filteredCases.length > 0 && (
        <div className="mt-4 text-sm text-muted-foreground text-center">
          إجمالي القضايا: {filteredCases.length}
        </div>
      )}
    </div>
  );
};

export default CaseTable;
