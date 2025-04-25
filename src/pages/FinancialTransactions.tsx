import { useState, useEffect } from "react";
import { toast } from "sonner";
import MainLayout from "@/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DollarSign,
  Book,
  Calendar as CalendarIcon,
  Eye,
  Pencil,
  Trash2,
  Plus,
  Filter,
  RefreshCcw,
  X
} from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { FinancialTransactionForm } from "@/pages/Customers/components/FinancialTransactionForm";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import type { FinancialRecord, FinancialRecordFormValues } from "@/types/customer";
import { FinancialTransactionsAdvancedFilter, AdvancedFilterValues } from "@/pages/FinancialTransactionsAdvancedFilter";

interface CaseWithAmount {
  id: number;
  title?: string;
  amount: number;
}

type EditingTransactionType = FinancialRecord | (Partial<FinancialRecordFormValues> & { 
  id: number;
  attachments?: (string | File)[];
});

export default function FinancialTransactions() {
  const [financialRecords, setFinancialRecords] = useState<FinancialRecord[]>([
    {
      id: 1001,
      customerId: 1,
      amount: 4000,
      date: "2024-04-01",
      type: "دفعة",
      description: "رسوم استشارة",
      status: "مدفوعة",
      caseTitle: "قضية نزاع إيجار",
      sourceType: "case"
    },
    {
      id: 1002,
      customerId: 2,
      amount: 2300,
      isPercentage: true,
      percentageAmount: 12,
      caseId: 5,
      date: "2024-04-05",
      type: "فاتورة",
      description: "رسوم نسبة مئوية من القضية",
      status: "معلقة",
      caseTitle: "مطالبة حقوق تجارية",
      sourceType: "case"
    },
    {
      id: 1003,
      customerId: 3,
      amount: 1500,
      date: "2024-03-12",
      type: "مطالبة",
      description: "مطالبة مستحقات متأخرة",
      status: "مدفوعة",
      sourceType: "employee",
      employeeId: 2,
      employeeName: "سارة خالد",
      claimType: "مستحقات"
    },
    {
      id: 1004,
      customerId: 4,
      amount: 2600,
      date: "2024-03-15",
      type: "استرداد",
      description: "استرداد دفعة زائدة",
      status: "معلقة",
      sourceType: "employee",
      employeeId: 1,
      employeeName: "أحمد محمد",
      claimType: "دفعة"
    },
    {
      id: 1005,
      customerId: 1,
      amount: 850,
      date: "2024-02-14",
      type: "دفعة",
      description: "دفعة إضافية",
      status: "مدفوعة",
      sourceType: "case",
      caseTitle: "دعوى عمالية"
    }
  ]);
  const [filterTab, setFilterTab] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [isAddTransactionOpen, setIsAddTransactionOpen] = useState(false);
  const [viewingTransaction, setViewingTransaction] = useState<FinancialRecord | null>(null);
  const [editingTransaction, setEditingTransaction] = useState<EditingTransactionType | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [transactionToDelete, setTransactionToDelete] = useState<FinancialRecord | null>(null);
  const [cases, setCases] = useState<CaseWithAmount[]>([]);
  const [advancedFilterOpen, setAdvancedFilterOpen] = useState(false);
  const [advancedFilters, setAdvancedFilters] = useState<AdvancedFilterValues>({});
  const [filteredRecords, setFilteredRecords] = useState<FinancialRecord[]>([]);

  useEffect(() => {
    const casesJSON = localStorage.getItem("cases");
    const loadedCases = casesJSON ? JSON.parse(casesJSON) : [];
    const casesWithAmount: CaseWithAmount[] = loadedCases.map((c: any) => ({
      id: c.id,
      title: c.title,
      amount: c.fees?.caseValue || 0
    }));
    setCases(casesWithAmount);
  }, []);

  useEffect(() => {
    const applyFilters = () => {
      let filteredData = [...financialRecords];
      
      switch (filterTab) {
        case "paid":
          filteredData = filteredData.filter((r) => r.status === "مدفوعة");
          break;
        case "pending":
          filteredData = filteredData.filter((r) => r.status === "معلقة");
          break;
        case "percentage":
          filteredData = filteredData.filter((r) => r.isPercentage);
          break;
        case "claims":
          filteredData = filteredData.filter((r) => r.type === "مطالبة" || r.sourceType === "employee");
          break;
        case "refunds":
          filteredData = filteredData.filter((r) => r.type === "استرداد");
          break;
        case "invoices":
          filteredData = filteredData.filter((r) => r.type === "فاتورة");
          break;
        case "payments":
          filteredData = filteredData.filter((r) => r.type === "دفعة");
          break;
        default:
          break;
      }
      
      filteredData = filteredData.filter(record => matchesAdvancedFilters(record));
      
      filteredData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      
      setFilteredRecords(filteredData);
    };
    
    applyFilters();
  }, [financialRecords, filterTab, advancedFilters]);

  const customers = [
    { id: 1, name: "محمد أحمد" },
    { id: 2, name: "شركة الخليج للتجارة" },
    { id: 3, name: "مؤسسة النور للاستشارات" },
    { id: 4, name: "أحمد محمود" },
  ];
  const employees = [
    { id: 1, name: "أحمد محمد", role: "محامي" },
    { id: 2, name: "سارة خالد", role: "محامي" },
    { id: 3, name: "فهد العتيبي", role: "اداري" },
    { id: 4, name: "خالد محمود", role: "محاسب" },
  ];

  const getCustomerName = (customerId: number) => {
    const customer = customers.find(c => c.id === customerId);
    return customer ? customer.name : "غير معروف";
  };

  const getEmployeeName = (employeeId?: number) => {
    if (!employeeId) return "غير معروف";
    const employee = employees.find(e => e.id === employeeId);
    return employee ? employee.name : "غير معروف";
  };

  const handleFilterChange = (value: string) => {
    setFilterTab(value);
  };

  function matchesAdvancedFilters(record: FinancialRecord): boolean {
    if (advancedFilters.type) {
      if (advancedFilters.type === "percentage" && !record.isPercentage) return false;
      if (advancedFilters.type === "claim" && record.type !== "مطالبة" && record.sourceType !== "employee") return false;
      if (advancedFilters.type === "fixed" && record.isPercentage) return false;
      if (advancedFilters.type === "invoice" && record.type !== "فاتورة") return false;
      if (advancedFilters.type === "payment" && record.type !== "دفعة") return false;
      if (advancedFilters.type === "refund" && record.type !== "استرداد") return false;
    }
    
    if (advancedFilters.minAmount && record.amount < parseFloat(advancedFilters.minAmount)) return false;
    if (advancedFilters.maxAmount && record.amount > parseFloat(advancedFilters.maxAmount)) return false;
    
    if (advancedFilters.status && record.status !== advancedFilters.status) return false;
    
    if (advancedFilters.linkedEntity) {
      if (advancedFilters.linkedEntity === "case" && record.sourceType !== "case") return false;
      if (advancedFilters.linkedEntity === "employee" && record.sourceType !== "employee") return false;
    }
    
    if (advancedFilters.month || advancedFilters.year) {
      const recordDate = new Date(record.date);
      const recordMonth = recordDate.getMonth() + 1;
      const recordYear = recordDate.getFullYear();
      
      if (advancedFilters.month && recordMonth !== advancedFilters.month) return false;
      if (advancedFilters.year && recordYear !== advancedFilters.year) return false;
    }
    
    return true;
  }

  const getTotalPaid = () => {
    return filteredRecords
      .filter(record => record.status === "مدفوعة")
      .reduce((total, record) => {
        if (record.type === "دفعة") {
          return total + record.amount;
        } else if (record.type === "استرداد") {
          return total - record.amount;
        }
        return total;
      }, 0);
  };

  const getTotalInvoices = () => {
    return filteredRecords
      .filter(record => record.type === "فاتورة")
      .reduce((total, record) => total + record.amount, 0);
  };

  const getTotalPending = () => {
    return filteredRecords
      .filter(record => record.status === "معلقة")
      .reduce((total, record) => total + record.amount, 0);
  };

  function renderActiveFiltersSummary() {
    const summary = [];
    if (advancedFilters.type) summary.push(`نوع: ${typeLabel(advancedFilters.type)}`);
    if (advancedFilters.status) summary.push(`الحالة: ${advancedFilters.status}`);
    if (advancedFilters.minAmount) summary.push(`≥ ${advancedFilters.minAmount} ر.س`);
    if (advancedFilters.maxAmount) summary.push(`≤ ${advancedFilters.maxAmount} ر.س`);
    if (advancedFilters.linkedEntity) summary.push(`جهة الربط: ${advancedFilters.linkedEntity === "case" ? "قضية" : "موظف"}`);
    if (advancedFilters.month) {
      const monthNames = ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"];
      summary.push(`الشهر: ${monthNames[advancedFilters.month - 1]}`);
    }
    if (advancedFilters.year) summary.push(`السنة: ${advancedFilters.year}`);
    
    return summary.length ? (
      <div className="flex flex-wrap gap-2 mb-3 pt-1 text-xs rtl:flex-row-reverse">
        {summary.map((item) => (
          <span
            key={item}
            className="bg-accent text-accent-foreground px-2 py-1 rounded border dark:bg-zinc-900 dark:border-zinc-700"
          >{item}</span>
        ))}
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setAdvancedFilters({})} 
          className="text-rose-600 hover:bg-rose-100 dark:hover:bg-zinc-800 flex items-center gap-1"
        >
          <X className="h-3 w-3" /> مسح الفلاتر
        </Button>
      </div>
    ) : null;
  }

  function typeLabel(key: string) {
    switch (key) {
      case "percentage": return "النسبة المتبقية";
      case "claim": return "مطالبة";
      case "fixed": return "مبلغ ثابت";
      case "invoice": return "فاتورة";
      case "payment": return "دفعة";
      case "refund": return "استرداد";
      default: return "";
    }
  }

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success("تم تحديث البيانات بنجاح");
    }, 1000);
  };

  const handleAddTransaction = (data: FinancialRecordFormValues) => {
    setIsLoading(true);

    setTimeout(() => {
      const formattedDate = typeof data.date === 'string'
        ? data.date
        : data.date instanceof Date
          ? data.date.toISOString().split('T')[0]
          : new Date().toISOString().split('T')[0];

      const finalAttachments: string[] = [];
      
      if (data.existingAttachments && data.existingAttachments.length > 0) {
        finalAttachments.push(...data.existingAttachments);
      }
      
      if (data.attachments && data.attachments.length > 0) {
        finalAttachments.push(...data.attachments.map(file => {
          if (typeof file === 'string') return file;
          return file.name;
        }));
      }

      if (editingTransaction) {
        const updatedTransaction: FinancialRecord = {
          id: editingTransaction.id,
          customerId: ('customerId' in editingTransaction) ? editingTransaction.customerId : (data.customerId || 1),
          amount: data.amount,
          date: formattedDate,
          type: data.type,
          description: data.description,
          status: data.status,
          sourceType: data.sourceType,
          employeeId: data.employeeId,
          employeeName: data.employeeId ? getEmployeeName(data.employeeId) : undefined,
          claimType: data.claimType,
          isPercentage: data.isPercentage,
          percentageAmount: data.percentageAmount,
          caseId: data.caseId,
          caseTitle: data.caseId ? (cases.find(c => c.id === data.caseId)?.title || 'قضية بدون عنوان') : undefined,
          notes: data.notes,
          attachments: finalAttachments.length > 0 ? finalAttachments : undefined
        };

        const updatedRecords = financialRecords.map(record => 
          record.id === editingTransaction.id ? updatedTransaction : record
        );
        
        setFinancialRecords(updatedRecords);
        localStorage.setItem("financialRecords", JSON.stringify(updatedRecords));
        toast.success("تم تحديث المعاملة المالية بنجاح");
      } else {
        const newTransaction: FinancialRecord = {
          id: financialRecords.length + 1 + Date.now(),
          customerId: data.customerId || 1,
          amount: data.amount,
          date: formattedDate,
          type: data.type,
          description: data.description,
          status: data.status,
          sourceType: data.sourceType,
          employeeId: data.employeeId,
          employeeName: data.employeeId ? getEmployeeName(data.employeeId) : undefined,
          claimType: data.claimType,
          isPercentage: data.isPercentage,
          percentageAmount: data.percentageAmount,
          caseId: data.caseId,
          caseTitle: data.caseId ? (cases.find(c => c.id === data.caseId)?.title || 'قضية بدون عنوان') : undefined,
          notes: data.notes,
          attachments: finalAttachments.length > 0 ? finalAttachments : undefined
        };

        const updatedRecords = [newTransaction, ...financialRecords];
        setFinancialRecords(updatedRecords);
        localStorage.setItem("financialRecords", JSON.stringify(updatedRecords));
        toast.success("تمت إضافة المعاملة المالية بنجاح");
      }

      setIsLoading(false);
      setIsAddTransactionOpen(false);
      setEditingTransaction(null);
    }, 800);
  };

  const handleEditTransaction = (transaction: FinancialRecord) => {
    const formCompatibleTransaction: Partial<FinancialRecordFormValues> & { 
      id: number; 
      attachments?: (string | File)[];
    } = {
      ...transaction,
      id: typeof transaction.id === 'string' ? parseInt(transaction.id) : transaction.id,
      attachments: transaction.attachments || [],
    };
    
    setEditingTransaction(formCompatibleTransaction);
    setIsAddTransactionOpen(true);
  };

  const handleViewTransaction = (transaction: FinancialRecord) => {
    setViewingTransaction(transaction);
  };

  const handleDeleteClick = (transaction: FinancialRecord) => {
    setTransactionToDelete(transaction);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (transactionToDelete) {
      const updatedRecords = financialRecords.filter(
        record => record.id !== transactionToDelete.id
      );
      setFinancialRecords(updatedRecords);
      localStorage.setItem("financialRecords", JSON.stringify(updatedRecords));
      setIsDeleteDialogOpen(false);
      setTransactionToDelete(null);
      toast.success("تم حذف المعاملة المالية بنجاح");
    }
  };

  const statSummaryCards = [
    {
      label: "إجمالي المدفوعات",
      amount: getTotalPaid(),
      icon: <DollarSign className="h-8 w-8 text-green-400" />,
      className: "from-green-50 dark:from-zinc-900 to-white dark:to-zinc-800 border-green-200 dark:border-zinc-600 text-green-800 dark:text-green-300 shadow-green-100",
    },
    {
      label: "إجمالي الفواتير",
      amount: getTotalInvoices(),
      icon: <Book className="h-8 w-8 text-blue-400" />,
      className: "from-blue-50 dark:from-zinc-900 to-white dark:to-zinc-800 border-blue-200 dark:border-zinc-600 text-blue-800 dark:text-blue-300 shadow-blue-100",
    },
    {
      label: "المبالغ المعلقة",
      amount: getTotalPending(),
      icon: <CalendarIcon className="h-8 w-8 text-yellow-400" />,
      className: "from-yellow-50 dark:from-zinc-900 to-white dark:to-zinc-800 border-yellow-200 dark:border-zinc-600 text-yellow-800 dark:text-yellow-300 shadow-yellow-100",
    }
  ];

  const financialColumns = [
    {
      key: "linked",
      header: "مرتبطة بـ",
      cell: (record: FinancialRecord) => (
        <span>
          {record.sourceType === "case"
            ? <span>قضية: <span className="font-semibold">{record.caseTitle || "--"}</span></span>
            : record.sourceType === "employee"
              ? <span>موظف: <span className="font-semibold">{record.employeeName || "--"}</span></span>
              : "--"
          }
        </span>
      ),
    },
    {
      key: "amount",
      header: "المبلغ",
      cell: (record: FinancialRecord) => (
        <span className="font-semibold text-right font-mono">
          {record.amount.toLocaleString('ar-SA')} ر.س
        </span>
      ),
    },
    {
      key: "type",
      header: "النوع",
      cell: (record: FinancialRecord) => (
        <span className={`inline-flex items-center rounded px-2 py-0.5 text-xs gap-1
          ${
            record.isPercentage
              ? "bg-purple-100 text-purple-800"
              : record.type === "مطالبة"
                ? "bg-blue-100 text-blue-800"
                : record.type === "فاتورة"
                  ? "bg-green-100 text-green-800"
                  : record.type === "استرداد"
                    ? "bg-amber-100 text-amber-800"
                    : "bg-gray-100 text-gray-700"
          }`
        }>
          {record.isPercentage ? (
            <>
              <span>النسبة</span>
              <DollarSign className="ml-1 h-3 w-3" />
            </>
          ) : record.type === "مطالبة" ? (
            <>
              <span>مطالبة</span>
              <Book className="ml-1 h-3 w-3" />
            </>
          ) : record.type === "دفعة" ? (
            <>
              <span>دفعة</span>
              <DollarSign className="ml-1 h-3 w-3" />
            </>
          ) : record.type === "فاتورة" ? (
            <>
              <span>فاتورة</span>
              <DollarSign className="ml-1 h-3 w-3" />
            </>
          ) : record.type === "استرداد" ? (
            <>
              <span>استرداد</span>
              <DollarSign className="ml-1 h-3 w-3" />
            </>
          ) : (
            <>
              <span>مبلغ ثابت</span>
              <DollarSign className="ml-1 h-3 w-3" />
            </>
          )}
        </span>
      ),
    },
    {
      key: "date",
      header: "التاريخ الميلادي",
      cell: (record: FinancialRecord) => (
        <span className="font-mono px-1">{record.date}</span>
      ),
    },
    {
      key: "status",
      header: "الحالة",
      cell: (record: FinancialRecord) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
          ${record.status === "مدفوعة"
            ? "bg-green-100 text-green-800"
            : record.status === "معلقة"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-red-100 text-red-800"
          }`}>
          {record.status}
        </span>
      ),
    },
    {
      key: "actions",
      header: "الإجراءات",
      cell: (record: FinancialRecord) => (
        <div className="flex items-center justify-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleViewTransaction(record)}
            className="text-sky-600 hover:text-sky-700 hover:bg-sky-50 focus:ring-2 focus:ring-sky-300"
          >
            <Eye className="h-4 w-4" />
            <span className="sr-only">عرض</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleEditTransaction(record)}
            className="text-amber-600 hover:text-amber-700 hover:bg-amber-50 focus:ring-2 focus:ring-amber-300"
          >
            <Pencil className="h-4 w-4" />
            <span className="sr-only">تعديل</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleDeleteClick(record)}
            className="text-rose-600 hover:text-rose-700 hover:bg-rose-50 focus:ring-2 focus:ring-rose-300"
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">حذف</span>
          </Button>
        </div>
      ),
    },
  ];

  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full"></div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4 mb-7">
        {statSummaryCards.map((stat) => (
          <div
            key={stat.label}
            className={`
              flex flex-col gap-2
              p-5 rounded-2xl border bg-gradient-to-tr ${stat.className}
              shadow transition-transform hover:-translate-y-1 hover:shadow-lg
              min-w-[220px]
            `}
          >
            <div className="flex items-center gap-2">
              <span className="text-lg font-semibold">{stat.label}</span>
              {stat.icon}
            </div>
            <span className="text-3xl font-bold ltr:font-mono rtl:font-sans mt-2">
              {stat.amount.toLocaleString("ar-SA")} ر.س
            </span>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">المعاملات المالية</h1>
          <p className="text-slate-500 dark:text-slate-300 mt-1">جدول المعاملات المالية والمطالبات المالية</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={handleRefresh}
            disabled={isLoading}
          >
            <RefreshCcw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
            <span>تحديث</span>
          </Button>
          <Button
            variant="outline"
            className="flex items-center gap-2"
            onClick={() => setAdvancedFilterOpen(true)}
          >
            <Filter className="w-4 h-4" />
            <span>فلترة متقدمة</span>
          </Button>
          <Button
            className="flex items-center gap-2"
            onClick={() => {
              setEditingTransaction(null);
              setIsAddTransactionOpen(true);
            }}
          >
            <Plus className="w-4 h-4" />
            <span>إضافة معاملة</span>
          </Button>
        </div>
      </div>

      {renderActiveFiltersSummary()}

      <Tabs value={filterTab} onValueChange={handleFilterChange} className="mb-6">
        <TabsList className="bg-slate-100 dark:bg-zinc-900 w-full overflow-x-auto flex whitespace-nowrap rounded-lg border border-slate-200 dark:border-zinc-700">
          <TabsTrigger value="all" className="flex-grow font-bold data-[state=active]:bg-white data-[state=active]:dark:bg-zinc-800 data-[state=active]:shadow-sm">الكل</TabsTrigger>
          <TabsTrigger value="paid" className="flex-grow font-bold data-[state=active]:bg-white data-[state=active]:dark:bg-zinc-800">المدفوعة</TabsTrigger>
          <TabsTrigger value="pending" className="flex-grow font-bold data-[state=active]:bg-white data-[state=active]:dark:bg-zinc-800">المعلقة</TabsTrigger>
          <TabsTrigger value="percentage" className="flex-grow font-bold data-[state=active]:bg-white data-[state=active]:dark:bg-zinc-800">رسوم النسبة المتبقية</TabsTrigger>
          <TabsTrigger value="claims" className="flex-grow font-bold data-[state=active]:bg-white data-[state=active]:dark:bg-zinc-800">مطالبات الموظفين</TabsTrigger>
          <TabsTrigger value="refunds" className="flex-grow font-bold data-[state=active]:bg-white data-[state=active]:dark:bg-zinc-800">المستردات</TabsTrigger>
          <TabsTrigger value="invoices" className="flex-grow font-bold data-[state=active]:bg-white data-[state=active]:dark:bg-zinc-800">الفواتير</TabsTrigger>
          <TabsTrigger value="payments" className="flex-grow font-bold data-[state=active]:bg-white data-[state=active]:dark:bg-zinc-800">المدفوعات</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 rounded-xl overflow-x-auto">
        {filteredRecords.length === 0 ? (
          <div className="p-8 text-center">
            <CalendarIcon className="mx-auto h-12 w-12 text-muted-foreground mb-3" />
            <h3 className="text-lg font-medium">لا توجد معاملات مالية مطابقة</h3>
            <p className="text-sm text-muted-foreground mt-2">
              لم يتم العثور على أي معاملات مالية تطابق المعايير المحددة.
            </p>
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-4"
              onClick={() => {
                setAdvancedFilters({});
                setFilterTab("all");
              }}
            >
              إزالة جميع الفلاتر
            </Button>
          </div>
        ) : (
          <DataTable
            data={filteredRecords}
            columns={financialColumns}
            isLoading={isLoading}
          />
        )}
      </div>

      <FinancialTransactionsAdvancedFilter
        open={advancedFilterOpen}
        onClose={() => setAdvancedFilterOpen(false)}
        onApply={(filters) => setAdvancedFilters(filters)}
        currentFilters={advancedFilters}
      />

      <Dialog open={!!viewingTransaction} onOpenChange={(open) => !open && setViewingTransaction(null)}>
        <DialogContent className="w-full max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">تفاصيل المعاملة المالية</DialogTitle>
            <DialogDescription>
              {viewingTransaction && (
                <div className="mt-4 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">النوع</p>
                      <p className="font-semibold">
                        {viewingTransaction.isPercentage 
                          ? "النسبة المتبقية" 
                          : viewingTransaction.type}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">المبلغ</p>
                      <p className="font-semibold font-mono">
                        {viewingTransaction.amount.toLocaleString('ar-SA')} ر.س
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">الحالة</p>
                      <p className="font-semibold">{viewingTransaction.status}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">التاريخ</p>
                      <p className="font-semibold">{viewingTransaction.date}</p>
                    </div>
                    {viewingTransaction.sourceType === "case" && (
                      <div>
                        <p className="text-sm text-muted-foreground">القضية المرتبطة</p>
                        <p className="font-semibold">{viewingTransaction.caseTitle || "--"}</p>
                      </div>
                    )}
                    {viewingTransaction.sourceType === "employee" && (
                      <div>
                        <p className="text-sm text-muted-foreground">الموظف المرتبط</p>
                        <p className="font-semibold">{viewingTransaction.employeeName || "--"}</p>
                      </div>
                    )}
                    {viewingTransaction.isPercentage && viewingTransaction.percentageAmount && (
                      <div>
                        <p className="text-sm text-muted-foreground">النسبة المئوية</p>
                        <p className="font-semibold">{viewingTransaction.percentageAmount}%</p>
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">الوصف</p>
                    <p className="font-semibold">{viewingTransaction.description}</p>
                  </div>
                  {viewingTransaction.notes && (
                    <div>
                      <p className="text-sm text-muted-foreground">ملاحظات إضافية</p>
                      <p>{viewingTransaction.notes}</p>
                    </div>
                  )}
                  {viewingTransaction.attachments && viewingTransaction.attachments.length > 0 && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">المرفقات</p>
                      <div className="space-y-1">
                        {viewingTransaction.attachments.map((attachment, index) => (
                          <div key={index} className="flex items-center gap-2 p-2 rounded-md bg-muted">
                            <Button variant="ghost" size="sm" className="text-blue-600">
                              <span>{attachment}</span>
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      <Dialog open={isAddTransactionOpen} onOpenChange={(open) => !open && setIsAddTransactionOpen(false)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              {editingTransaction ? "تعديل معاملة مالية" : "إضافة معاملة مالية جديدة"}
            </DialogTitle>
            <DialogDescription>
              {editingTransaction 
                ? "قم بتعديل بيانات المعاملة المالية أدناه"
                : "قم بإدخال بيانات المعاملة المالية الجديدة"
              }
            </DialogDescription>
          </DialogHeader>
          <FinancialTransactionForm
            onSubmit={handleAddTransaction}
            isLoading={isLoading}
            cases={cases}
            defaultValues={editingTransaction ? {
              ...editingTransaction,
              attachments: editingTransaction.attachments as (string | File)[]
            } : undefined}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteDialogOpen} onOpenChange={(open) => !open && setIsDeleteDialogOpen(false)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-rose-600">تأكيد الحذف</DialogTitle>
            <DialogDescription>
              هل أنت متأكد من رغبتك في حذف هذه المعاملة المالية؟ لا يمكن التراجع عن هذا الإجراء.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              إلغاء
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              تأكيد الحذف
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </MainLayout>
  );
}
