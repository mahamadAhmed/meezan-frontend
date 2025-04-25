
import { Link } from "react-router-dom";
import { Bot } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/shared/components/ui/tooltip";

interface MenuItem {
  title: string;
  path: string;
  icon: React.ComponentType<any>;
}

interface NavbarProps {
  menuItems: MenuItem[];
  isActive: (path: string) => boolean;
}

export function Navbar({ menuItems, isActive }: NavbarProps) {
  const updatedMenuItems = menuItems.map(item => {
    if (item.path === '/legal-assistant') {
      return { ...item, icon: Bot };
    }
    return item;
  });

  return (
    <div className="bg-card border-b border-border shadow-sm hidden lg:block">
      <div className="container mx-auto px-4">
        <div className="flex items-center space-x-1 space-x-reverse overflow-x-auto py-2 text-sm">
          <TooltipProvider>
            {updatedMenuItems.map((item) => (
              <Tooltip key={item.path}>
                <TooltipTrigger asChild>
                  <Link 
                    to={item.path} 
                    className={`px-3 py-2 rounded-md flex items-center transition-colors ${
                      isActive(item.path)
                        ? 'bg-primary/10 text-primary font-medium'
                        : 'hover:bg-accent text-foreground'
                    }`}
                  >
                    <item.icon className="ml-1" />
                    {item.title}
                  </Link>
                </TooltipTrigger>
                {item.path === '/legal-assistant' && (
                  <TooltipContent>المساعد القانوني الذكي</TooltipContent>
                )}
              </Tooltip>
            ))}
          </TooltipProvider>
        </div>
      </div>
    </div>
  );
}
