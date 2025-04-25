
import { FiChevronDown } from "react-icons/fi";
import { Button } from "@/shared/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/shared/components/ui/dropdown-menu";
import { FiMenu, FiUser, FiFileText, FiCalendar, FiClipboard, FiSettings } from "react-icons/fi";

interface PageHeaderProps {
  title: string;
}

export function PageHeader({ title }: PageHeaderProps) {
  return (
    <div className="bg-card border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-foreground">{title}</h2>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 transition-colors flex items-center text-sm">
                <FiMenu className="ml-2" />
                إجراءات سريعة
                <FiChevronDown className="mr-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem>
                <span className="flex items-center"><FiUser className="ml-2 h-4 w-4" /> إضافة عميل</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span className="flex items-center"><FiFileText className="ml-2 h-4 w-4" /> إنشاء قضية</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span className="flex items-center"><FiCalendar className="ml-2 h-4 w-4" /> جدولة جلسة</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span className="flex items-center"><FiClipboard className="ml-2 h-4 w-4" /> إضافة مهمة</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <span className="flex items-center"><FiSettings className="ml-2 h-4 w-4" /> الإعدادات</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
