
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { FiFilter, FiSearch, FiX } from "react-icons/fi";

interface CaseFilterProps {
  filter: {
    status: string;
    lawyer: string;
    dateFrom: string;
    dateTo: string;
    search: string;
  };
  setFilter: (filter: any) => void;
}

const CaseFilter = ({ filter, setFilter }: CaseFilterProps) => {
  const [showFilters, setShowFilters] = useState(false);

  const handleStatusChange = (value: string) => {
    setFilter({ ...filter, status: value });
  };

  const handleLawyerChange = (value: string) => {
    setFilter({ ...filter, lawyer: value });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter({ ...filter, search: e.target.value });
  };

  const handleDateFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter({ ...filter, dateFrom: e.target.value });
  };

  const handleDateToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter({ ...filter, dateTo: e.target.value });
  };

  const resetFilters = () => {
    setFilter({
      status: "all",
      lawyer: "all",
      dateFrom: "",
      dateTo: "",
      search: "",
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="بحث في القضايا..."
            className="pl-10 w-full"
            value={filter.search}
            onChange={handleSearchChange}
          />
        </div>
        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={() => setShowFilters(!showFilters)}
        >
          <FiFilter className="w-4 h-4" />
          <span>فلترة متقدمة</span>
        </Button>
        {(filter.status !== "all" ||
          filter.lawyer !== "all" ||
          filter.dateFrom !== "" ||
          filter.dateTo !== "") && (
          <Button
            variant="ghost"
            className="flex items-center gap-2 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950"
            onClick={resetFilters}
          >
            <FiX className="w-4 h-4" />
            <span>إعادة ضبط</span>
          </Button>
        )}
      </div>

      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 border rounded-md bg-muted/30">
          <div className="space-y-2">
            <Label htmlFor="status">حالة القضية</Label>
            <Select value={filter.status} onValueChange={handleStatusChange}>
              <SelectTrigger id="status">
                <SelectValue placeholder="جميع الحالات" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الحالات</SelectItem>
                <SelectItem value="نشطة">نشطة</SelectItem>
                <SelectItem value="قيد المعالجة">قيد المعالجة</SelectItem>
                <SelectItem value="مغلقة">مغلقة</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="lawyer">المحامي المسؤول</Label>
            <Select value={filter.lawyer} onValueChange={handleLawyerChange}>
              <SelectTrigger id="lawyer">
                <SelectValue placeholder="جميع المحامين" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع المحامين</SelectItem>
                <SelectItem value="1">خالد العتيبي</SelectItem>
                <SelectItem value="2">سارة المطيري</SelectItem>
                <SelectItem value="3">محمد الشمري</SelectItem>
                <SelectItem value="4">نورة القحطاني</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="dateFrom">من تاريخ</Label>
            <Input
              id="dateFrom"
              type="date"
              value={filter.dateFrom}
              onChange={handleDateFromChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dateTo">إلى تاريخ</Label>
            <Input
              id="dateTo"
              type="date"
              value={filter.dateTo}
              onChange={handleDateToChange}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CaseFilter;
