
import React from "react";
import { User, CircleUser } from "lucide-react";

interface FilterOption {
  value: string;
  label: string;
  Icon?: React.ElementType;
  count?: number;
}

interface EmployeesFilterProps {
  activeFilter: string;
  setActiveFilter: (v: string) => void;
  filterOptions: FilterOption[];
  employees: any[];
}

export const EmployeesFilter: React.FC<EmployeesFilterProps> = ({
  activeFilter,
  setActiveFilter,
  filterOptions,
  employees,
}) => {
  // Counting by filter for badge
  const getCount = (value: string) => {
    if (value === "all") return employees.length;
    if (value === "مستقال") return employees.filter(emp => emp.status === "منتهي").length;
    return employees.filter(emp => emp.status === value).length;
  };

  return (
    <div className="mb-8 flex flex-wrap gap-2 justify-end">
      {filterOptions.map((f) => (
        <button
          key={f.value}
          type="button"
          onClick={() => setActiveFilter(f.value)}
          className={`
            transition rounded-full px-5 py-1.5 border font-medium text-sm flex items-center
            ${activeFilter === f.value
              ? "bg-black text-white border-black shadow-md"
              : "bg-[#f6f8fa] text-[#222] border-[#f6f8fa] hover:bg-[#ebedf0]"
            }
          `}
        >
          {f.Icon ? <f.Icon className="w-4 h-4 ml-1 rtl:mr-1 opacity-65" /> : null}
          {f.label}
          <span className="mx-1 text-xs font-bold">({getCount(f.value)})</span>
        </button>
      ))}
    </div>
  );
};
