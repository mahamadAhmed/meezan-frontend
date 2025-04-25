
import React, { useState } from "react";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

interface AdvancedFilterValues {
  type?: string;
  status?: string;
  minAmount?: string;
  maxAmount?: string;
  linkedEntity?: string;
  month?: number;
  year?: number;
}

interface Props {
  open: boolean;
  onClose: () => void;
  onApply: (filters: AdvancedFilterValues) => void;
  currentFilters: AdvancedFilterValues;
}

const typeOptions = [
  { value: "", label: "الكل" },
  { value: "percentage", label: "النسبة المتبقية" },
  { value: "claim", label: "مطالبة" },
  { value: "fixed", label: "مبلغ ثابت" },
  { value: "invoice", label: "فاتورة" },
  { value: "payment", label: "دفعة" },
  { value: "refund", label: "استرداد" },
];

const statusOptions = [
  { value: "", label: "الكل" },
  { value: "مدفوعة", label: "مدفوعة" },
  { value: "معلقة", label: "معلقة" },
];

const months = [
  { value: 1, label: "يناير" },
  { value: 2, label: "فبراير" },
  { value: 3, label: "مارس" },
  { value: 4, label: "أبريل" },
  { value: 5, label: "مايو" },
  { value: 6, label: "يونيو" },
  { value: 7, label: "يوليو" },
  { value: 8, label: "أغسطس" },
  { value: 9, label: "سبتمبر" },
  { value: 10, label: "أكتوبر" },
  { value: 11, label: "نوفمبر" },
  { value: 12, label: "ديسمبر" },
];

const years = [2023, 2024, 2025, 2026];

export function FinancialTransactionsAdvancedFilter({
  open,
  onClose,
  onApply,
  currentFilters,
}: Props) {
  const [filters, setFilters] = useState<AdvancedFilterValues>(currentFilters);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    onApply(filters);
    onClose();
  };

  const handleClear = () => {
    setFilters({});
    onApply({});
    onClose();
  };

  return (
    <Drawer open={open} onOpenChange={open => !open ? onClose() : undefined}>
      <DrawerContent className="max-w-lg mx-auto dark:bg-zinc-900 bg-white p-0 rounded-t-xl border border-slate-200 dark:border-zinc-700">
        <DrawerHeader>
          <DrawerTitle className="text-lg font-bold">فلترة متقدمة</DrawerTitle>
          <DrawerDescription>تصفية المعاملات المالية حسب معايير متعددة</DrawerDescription>
        </DrawerHeader>
        <form onSubmit={handleApply} className="p-6 flex flex-col gap-4">
          {/* النوع */}
          <div>
            <Label htmlFor="filter-type">نوع المعاملة</Label>
            <select
              id="filter-type"
              className="mt-2 block w-full rounded-md border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 p-2"
              value={filters.type || ""}
              onChange={e => setFilters({ ...filters, type: e.target.value })}
            >
              {typeOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          
          {/* الحالة */}
          <div>
            <Label htmlFor="filter-status">الحالة</Label>
            <select
              id="filter-status"
              className="mt-2 block w-full rounded-md border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 p-2"
              value={filters.status || ""}
              onChange={e => setFilters({ ...filters, status: e.target.value })}
            >
              {statusOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          
          {/* المبلغ */}
          <div className="flex gap-2">
            <div className="flex-1">
              <Label htmlFor="filter-minAmount">الحد الأدنى للمبلغ</Label>
              <Input
                id="filter-minAmount"
                type="number"
                placeholder="من"
                min={0}
                className="mt-2"
                value={filters.minAmount || ""}
                onChange={e => setFilters({ ...filters, minAmount: e.target.value })}
              />
            </div>
            <div className="flex-1">
              <Label htmlFor="filter-maxAmount">الحد الأعلى للمبلغ</Label>
              <Input
                id="filter-maxAmount"
                type="number"
                placeholder="إلى"
                min={0}
                className="mt-2"
                value={filters.maxAmount || ""}
                onChange={e => setFilters({ ...filters, maxAmount: e.target.value })}
              />
            </div>
          </div>
          
          {/* جهة الربط */}
          <div>
            <Label htmlFor="filter-linkedEntity">جهة الربط</Label>
            <select
              id="filter-linkedEntity"
              className="mt-2 block w-full rounded-md border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 p-2"
              value={filters.linkedEntity || ""}
              onChange={e => setFilters({ ...filters, linkedEntity: e.target.value })}
            >
              <option value="">الكل</option>
              <option value="case">قضية</option>
              <option value="employee">موظف</option>
            </select>
          </div>
          
          {/* تصفية حسب التاريخ */}
          <div className="mt-2">
            <h3 className="font-medium mb-2">تصفية حسب التاريخ</h3>
            <Separator className="mb-3" />
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="filter-month">الشهر</Label>
                <select
                  id="filter-month"
                  className="mt-2 block w-full rounded-md border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 p-2"
                  value={filters.month || ""}
                  onChange={e => setFilters({ ...filters, month: e.target.value ? Number(e.target.value) : undefined })}
                >
                  <option value="">كل الشهور</option>
                  {months.map(month => (
                    <option key={month.value} value={month.value}>{month.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="filter-year">السنة</Label>
                <select
                  id="filter-year"
                  className="mt-2 block w-full rounded-md border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 p-2"
                  value={filters.year || ""}
                  onChange={e => setFilters({ ...filters, year: e.target.value ? Number(e.target.value) : undefined })}
                >
                  <option value="">كل السنوات</option>
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <DrawerFooter className="flex gap-2 justify-end pt-4">
            <Button variant="outline" type="button" onClick={handleClear}>
              مسح الفلاتر
            </Button>
            <Button type="submit">تطبيق الفلاتر</Button>
            <DrawerClose />
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
}

export type { AdvancedFilterValues };
