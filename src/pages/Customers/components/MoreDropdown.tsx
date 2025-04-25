
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { FiMoreVertical, FiEdit, FiTrash2, FiEye } from "react-icons/fi";

interface MoreDropdownProps {
  onEdit?: () => void;
  onDelete?: () => void;
  onView?: () => void;
}

export const MoreDropdown = ({ onEdit, onDelete, onView }: MoreDropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <FiMoreVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {onView && (
          <DropdownMenuItem onClick={onView}>
            <FiEye className="ml-2 h-4 w-4" />
            <span>عرض</span>
          </DropdownMenuItem>
        )}
        {onEdit && (
          <DropdownMenuItem onClick={onEdit}>
            <FiEdit className="ml-2 h-4 w-4" />
            <span>تعديل</span>
          </DropdownMenuItem>
        )}
        {onDelete && (
          <DropdownMenuItem 
            onClick={onDelete}
            className="text-red-600 focus:text-red-600"
          >
            <FiTrash2 className="ml-2 h-4 w-4" />
            <span>حذف</span>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
