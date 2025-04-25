
import { useState, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { 
  FiMenu, 
  FiMoon, 
  FiSun, 
  FiBell, 
  FiLogOut, 
  FiUser,
} from "react-icons/fi";
import { Scale } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar";
import { Button } from "@/shared/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/shared/components/ui/dropdown-menu";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/shared/components/ui/tooltip";
import { useTheme } from "@/shared/hooks/use-theme";
import { Badge } from "@/shared/components/ui/badge";

interface HeaderProps {
  toggleMobileMenu: () => void;
  openLogoutDialog: () => void;
}

export function Header({ toggleMobileMenu, openLogoutDialog }: HeaderProps) {
  const { theme, setTheme } = useTheme();
  const [notifications, setNotifications] = useState<{ id: string; message: string; read: boolean }[]>([
    { id: '1', message: 'تم جدولة جلسة جديدة', read: false },
    { id: '2', message: 'تم إضافة مهمة جديدة', read: false },
  ]);
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  
  const user = {
    name: "محمد الأحمد",
    email: "mohammed@example.com",
    role: "محامي",
    initials: "م أ"
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;
  
  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  return (
    <header className="sticky top-0 z-40 border-b bg-background shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleMobileMenu}
              className="md:hidden"
              aria-label="فتح القائمة"
            >
              <FiMenu className="h-5 w-5" />
            </Button>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link to="/" className="flex items-center justify-center w-10 h-10" aria-label="مكتب المحاماة">
                    <Scale className="h-6 w-6 text-primary" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>مكتب المحاماة</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>

          <div className="flex items-center space-x-4 space-x-reverse">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    aria-label="تبديل الوضع المظلم"
                  >
                    {theme === "dark" ? (
                      <FiSun className="h-5 w-5" />
                    ) : (
                      <FiMoon className="h-5 w-5" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>تبديل المظهر</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <div className="relative" ref={notificationsRef}>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setShowNotifications(!showNotifications)}
                      aria-label="الإشعارات"
                      className="relative"
                    >
                      <FiBell className="h-5 w-5" />
                      {unreadCount > 0 && (
                        <Badge 
                          variant="destructive" 
                          className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                        >
                          {unreadCount}
                        </Badge>
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>الإشعارات</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              {showNotifications && (
                <div className="absolute left-0 mt-2 w-80 rounded-md border bg-card shadow-lg">
                  <div className="flex items-center justify-between p-2 border-b">
                    <h3 className="font-medium">الإشعارات</h3>
                    {unreadCount > 0 && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={markAllAsRead}
                        className="text-xs h-7"
                      >
                        قراءة الكل
                      </Button>
                    )}
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="p-4 text-center text-muted-foreground">
                        لا توجد إشعارات
                      </div>
                    ) : (
                      notifications.map((notification) => (
                        <div 
                          key={notification.id}
                          className={`p-3 border-b hover:bg-muted/50 cursor-pointer ${
                            !notification.read ? 'bg-primary/5' : ''
                          }`}
                          onClick={() => markAsRead(notification.id)}
                        >
                          <p className="text-sm">{notification.message}</p>
                          <p className="text-xs text-muted-foreground mt-1">منذ 5 دقائق</p>
                        </div>
                      ))
                    )}
                  </div>
                  <div className="p-2 border-t text-center">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-xs h-7 w-full text-muted-foreground"
                      onClick={() => {
                        setShowNotifications(false);
                        navigate('/notifications');
                      }}
                    >
                      عرض جميع الإشعارات
                    </Button>
                  </div>
                </div>
              )}
            </div>

            <DropdownMenu>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="relative h-10 w-10 rounded-full border-2 border-transparent ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground hover:border-primary/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        aria-label="الملف الشخصي"
                      >
                        <Avatar className="h-9 w-9">
                          <AvatarImage src="/placeholder-avatar.jpg" alt={user.name} />
                          <AvatarFallback className="bg-primary/10 text-primary font-medium">
                            {user.initials}
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>الملف الشخصي</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <DropdownMenuContent align="end" className="w-56">
                <div className="flex items-center justify-start gap-2 p-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder-avatar.jpg" alt={user.name} />
                    <AvatarFallback className="bg-primary/10 text-primary font-medium text-xs">
                      {user.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col space-y-0.5">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.role}</p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="cursor-pointer flex items-center">
                    <FiUser className="mr-2 h-4 w-4" />
                    <span>الملف الشخصي</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={openLogoutDialog} className="cursor-pointer text-destructive focus:text-destructive">
                  <FiLogOut className="mr-2 h-4 w-4" />
                  <span>تسجيل الخروج</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
