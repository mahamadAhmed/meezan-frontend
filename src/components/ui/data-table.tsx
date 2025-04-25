
import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { FiEdit2, FiTrash2, FiEye } from "react-icons/fi";
import { Link } from "react-router-dom";

interface DataTableProps<T> {
  data: T[];
  columns: {
    key: string;
    header: string;
    cell: (item: T) => React.ReactNode;
  }[];
  onView?: (item: T) => void;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  viewLink?: (item: T) => string;
  isLoading?: boolean;
  hideActionButtons?: boolean;
}

export function DataTable<T extends { id: string | number }>({
  data = [],
  columns = [],
  onView,
  onEdit,
  onDelete,
  viewLink,
  isLoading = false,
  hideActionButtons = false,
}: DataTableProps<T>) {
  // Ensure data is always an array
  const safeData = Array.isArray(data) ? data : [];
  // Ensure columns is always an array
  const safeColumns = Array.isArray(columns) ? columns : [];
  
  if (isLoading) {
    return (
      <div className="p-8 text-center">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-slate-500">جاري تحميل البيانات...</p>
      </div>
    );
  }

  if (safeData.length === 0) {
    return (
      <div className="p-8 text-center border rounded-md">
        <p className="text-slate-500">لا توجد بيانات لعرضها</p>
      </div>
    );
  }

  return (
    <div className="border rounded-md overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            {safeColumns.map((column) => (
              <TableHead key={column.key} className="text-right font-medium bg-slate-50">
                {column.header}
              </TableHead>
            ))}
            {!hideActionButtons && (onView || onEdit || onDelete || viewLink) && (
              <TableHead className="text-center bg-slate-50">الإجراءات</TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {safeData.map((item) => (
            <TableRow key={item.id} className="hover:bg-slate-50">
              {safeColumns.map((column) => (
                <TableCell key={`${item.id}-${column.key}`} className="text-right">
                  {column.cell(item)}
                </TableCell>
              ))}
              {!hideActionButtons && (onView || onEdit || onDelete || viewLink) && (
                <TableCell className="text-center">
                  <div className="flex items-center justify-center gap-2">
                    {viewLink && (
                      <Button
                        variant="ghost"
                        size="icon"
                        asChild
                        className="h-8 w-8 rounded-full hover:bg-sky-50 hover:text-sky-600"
                      >
                        <Link to={viewLink(item)}>
                          <FiEye className="h-4 w-4" />
                        </Link>
                      </Button>
                    )}
                    {onView && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onView(item)}
                        className="h-8 w-8 rounded-full hover:bg-sky-50 hover:text-sky-600"
                      >
                        <FiEye className="h-4 w-4" />
                      </Button>
                    )}
                    {onEdit && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onEdit(item)}
                        className="h-8 w-8 rounded-full hover:bg-amber-50 hover:text-amber-600"
                      >
                        <FiEdit2 className="h-4 w-4" />
                      </Button>
                    )}
                    {onDelete && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDelete(item)}
                        className="h-8 w-8 rounded-full hover:bg-rose-50 hover:text-rose-600"
                      >
                        <FiTrash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
