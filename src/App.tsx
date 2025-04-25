
import { Toaster } from "@/shared/components/ui/toaster";
import { Toaster as Sonner } from "sonner";
import { TooltipProvider } from "@/shared/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/shared/components/theme/ThemeProvider";

import Dashboard from "./pages/Dashboard";
import Cases from "./pages/Cases/Cases";
import Customers from "./pages/Customers";
import CustomerCreate from "./pages/Customers/CustomerCreate";
import CustomerDetails from "./pages/Customers/CustomerDetails";
import CustomerEdit from "./pages/Customers/CustomerEdit";
import CustomerFinancial from "./pages/Customers/CustomerFinancial";
import Sessions from "./pages/Sessions";
import SessionCreate from "./pages/Sessions/SessionCreate";
import Tasks from "./pages/Tasks";
import { Agencies } from "./pages/Agencies";
import Templates from "./pages/Templates";
import Employees from "./pages/Employees";
import CaseDetails from "./pages/Cases/CaseDetails";
import CaseEdit from "./pages/Cases/CaseEdit";
import CaseCreate from "./pages/Cases/CaseCreate";
import FinancialTransactions from "./pages/FinancialTransactions";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import EmployeeRequests from "./pages/EmployeeRequests";
import LegalAssistant from "./pages/LegalAssistant";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="light">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            
            {/* Protected Routes */}
            <Route path="/" element={<Dashboard />} />
            <Route path="/cases" element={<Cases />} />
            <Route path="/cases/create" element={<CaseCreate />} />
            <Route path="/cases/:id" element={<CaseDetails />} />
            <Route path="/cases/:id/edit" element={<CaseEdit />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/customers/create" element={<CustomerCreate />} />
            <Route path="/customers/:id" element={<CustomerDetails />} />
            <Route path="/customers/:id/edit" element={<CustomerEdit />} />
            <Route path="/customers/:id/financial" element={<CustomerFinancial />} />
            <Route path="/sessions" element={<Sessions />} />
            <Route path="/sessions/create" element={<SessionCreate />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/agencies" element={<Agencies />} />
            <Route path="/templates" element={<Templates />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/financial" element={<FinancialTransactions />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/employee-requests" element={<EmployeeRequests />} />
            <Route path="/legal-assistant" element={<LegalAssistant />} />
            
            {/* Fallback */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
