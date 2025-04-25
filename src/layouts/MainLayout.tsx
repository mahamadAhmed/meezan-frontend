
import { ReactNode } from "react";
import { Header } from "@/modules/layout/components/Header";
import { Sidebar } from "@/modules/layout/components/Sidebar";
import { Navbar } from "@/modules/layout/components/Navbar";
import { Footer } from "@/modules/layout/components/Footer";
import { LogoutDialog } from "@/modules/layout/components/LogoutDialog";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";
import { FiHome, FiUser, FiFileText, FiCalendar, FiClipboard, FiPaperclip, FiLayers, FiUsers, FiDollarSign, FiBriefcase } from "react-icons/fi";

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const handleLogout = () => {
    toast.success("تم تسجيل الخروج بنجاح");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
    setIsLogoutDialogOpen(false);
  };

  const menuItems = [
    { title: "الرئيسية", path: "/", icon: FiHome },
    { title: "العملاء", path: "/customers", icon: FiUser },
    { title: "القضايا", path: "/cases", icon: FiFileText },
    { title: "الجلسات", path: "/sessions", icon: FiCalendar },
    { title: "المهام", path: "/tasks", icon: FiClipboard },
    { title: "الوكالات", path: "/agencies", icon: FiPaperclip },
    { title: "النماذج", path: "/templates", icon: FiLayers },
    { title: "طلبات الموظفين", path: "/employee-requests", icon: FiUsers },
    { title: "الموظفون", path: "/employees", icon: FiUsers },
    { title: "المعاملات المالية", path: "/financial", icon: FiDollarSign },
    { title: "المساعد القانوني", path: "/legal-assistant", icon: FiBriefcase }
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Header 
        toggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
        openLogoutDialog={() => setIsLogoutDialogOpen(true)} 
      />
      
      <Sidebar 
        menuItems={menuItems} 
        isOpen={isMobileMenuOpen} 
        toggleSidebar={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
        isActive={isActive} 
        openLogoutDialog={() => setIsLogoutDialogOpen(true)} 
      />
      
      <Navbar menuItems={menuItems} isActive={isActive} />
      
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
      
      <Footer />
      
      <LogoutDialog 
        isOpen={isLogoutDialogOpen} 
        onClose={() => setIsLogoutDialogOpen(false)} 
        onLogout={handleLogout} 
      />
    </div>
  );
};

export default MainLayout;
