
import { Link } from "react-router-dom";
import { FiBriefcase, FiMenu, FiLogOut, FiMessageSquare } from "react-icons/fi";
import { Button } from "@/shared/components/ui/button";

interface MenuItem {
  title: string;
  path: string;
  icon: React.ComponentType<any>;
}

interface SidebarProps {
  menuItems: MenuItem[];
  isOpen: boolean;
  toggleSidebar: () => void;
  isActive: (path: string) => boolean;
  openLogoutDialog: () => void;
}

export function Sidebar({ menuItems, isOpen, toggleSidebar, isActive, openLogoutDialog }: SidebarProps) {
  const allMenuItems = [
    ...menuItems,
    { 
      title: "المساعد القانوني",
      path: "/legal-assistant",
      icon: FiMessageSquare 
    }
  ];

  return (
    <>
      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 dark:bg-black/50 z-20 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Mobile Nav */}
      <div className={`fixed inset-y-0 right-0 w-64 bg-card shadow-lg z-30 transform transition-transform duration-300 lg:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FiBriefcase className="text-primary text-xl" />
              <h2 className="font-bold text-foreground">القائمة</h2>
            </div>
            <button 
              onClick={toggleSidebar}
              className="p-2 rounded-md hover:bg-accent"
            >
              <FiMenu className="text-foreground" />
            </button>
          </div>
          <div className="flex-1 overflow-auto py-2">
            {allMenuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-4 py-3 text-sm ${isActive(item.path) ? 'bg-primary/10 text-primary font-medium' : 'text-foreground hover:bg-accent'}`}
                onClick={toggleSidebar}
              >
                <item.icon className="ml-3" />
                {item.title}
              </Link>
            ))}
          </div>
          <div className="p-4 border-t border-border">
            <Button 
              variant="outline" 
              className="w-full justify-start text-red-500 border-red-200 dark:border-red-900 hover:bg-red-50 dark:hover:bg-red-950 hover:text-red-600"
              onClick={() => {
                toggleSidebar();
                openLogoutDialog();
              }}
            >
              <FiLogOut className="ml-2" />
              تسجيل الخروج
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
