
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { FiPlus, FiSearch } from "react-icons/fi";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Customer } from "@/types/customer";
import { SmsForm } from "./components/SmsForm";
import { toast } from "sonner";
import { Input } from "@/shared/components/ui/input";
import { CustomerTable } from "./components/CustomerTable";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/shared/components/ui/alert-dialog";

export const Customers = () => {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState<Customer[]>([
    {
      id: 1,
      name: "أحمد محمد",
      email: "ahmed@example.com",
      phone: "0555123456",
      address: "الرياض",
      type: "فرد",
      status: "نشط",
      notes: "عميل مهم",
      joinDate: "2023-01-01",
      attachments: [],
    },
    {
      id: 2,
      name: "شركة التقنية",
      email: "info@tech.com",
      phone: "0555112233",
      address: "جدة",
      type: "شركة",
      status: "غير نشط",
      notes: "عميل جديد",
      joinDate: "2023-02-15",
      attachments: [],
    },
    {
      id: 3,
      name: "خالد ابراهيم",
      email: "khalid@test.com",
      phone: "0555445566",
      address: "الدمام",
      type: "فرد",
      status: "نشط",
      notes: "عميل قديم",
      joinDate: "2023-03-20",
      attachments: [],
    },
    {
      id: 4,
      name: "مؤسسة الأمل",
      email: "info@alamal.com",
      phone: "0566778899",
      address: "الرياض",
      type: "مؤسسة",
      status: "نشط",
      notes: "",
      joinDate: "2023-04-10",
      attachments: [],
    },
    {
      id: 5,
      name: "سارة العلي",
      email: "sara@example.com",
      phone: "0577889900",
      address: "جدة",
      type: "فرد",
      status: "معلق",
      notes: "",
      joinDate: "2023-05-05",
      attachments: [],
    },
  ]);
  
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isSmsOpen, setIsSmsOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [smsLoading, setSmsLoading] = useState(false);
  const [search, setSearch] = useState("");

  const handleSendSms = (values: { message: string }) => {
    setSmsLoading(true);
    setTimeout(() => {
      setSmsLoading(false);
      setIsSmsOpen(false);
      toast.success(`تم إرسال الرسالة إلى ${selectedCustomer?.name}`);
    }, 1500);
  };

  const handleDeleteCustomer = () => {
    if (selectedCustomer) {
      setCustomers((prev) => prev.filter((c) => c.id !== selectedCustomer.id));
      toast.success("تم حذف العميل بنجاح");
      setIsDeleteDialogOpen(false);
      setSelectedCustomer(null);
    }
  };

  const handleOpenSms = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsSmsOpen(true);
  };

  const handleOpenDeleteDialog = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsDeleteDialogOpen(true);
  };

  const handleViewFinancial = (customer: Customer) => {
    navigate(`/customers/${customer.id}/financial`);
  };

  const handleViewDetails = (customer: Customer) => {
    navigate(`/customers/${customer.id}`);
  };

  const handleEditCustomer = (customer: Customer) => {
    navigate(`/customers/${customer.id}/edit`);
  };

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(search.toLowerCase()) ||
    customer.phone.includes(search) ||
    (customer.email && customer.email.toLowerCase().includes(search.toLowerCase())) ||
    customer.address.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="container mx-auto py-6">
        <Card className="shadow-sm border border-slate-200">
          <CardHeader className="bg-slate-50 flex flex-row items-center justify-between space-y-0 pb-4">
            <div>
              <CardTitle className="text-2xl font-bold">العملاء</CardTitle>
              <p className="text-slate-500 mt-1 text-sm">إدارة ومتابعة بيانات العملاء</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative w-[300px]">
                <FiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  className="pr-10 border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary"
                  placeholder="بحث عن عميل..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <Button 
                className="bg-primary hover:bg-primary/90"
                onClick={() => navigate('/customers/create')}
              >
                <FiPlus className="ml-2 h-4 w-4" />
                إضافة عميل
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <CustomerTable 
              customers={filteredCustomers}
              onDelete={handleOpenDeleteDialog}
              onSendSms={handleOpenSms}
              onViewFinancial={handleViewFinancial}
              onEdit={handleEditCustomer}
              onView={handleViewDetails}
            />
          </CardContent>
        </Card>
      </div>
      
      {selectedCustomer && (
        <>
          <SmsForm
            open={isSmsOpen}
            onOpenChange={setIsSmsOpen}
            customer={selectedCustomer}
            onSubmit={handleSendSms}
            isLoading={smsLoading}
          />
          
          <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>هل أنت متأكد من حذف هذا العميل؟</AlertDialogTitle>
                <AlertDialogDescription>
                  سيتم حذف العميل "{selectedCustomer.name}" وجميع البيانات المرتبطة به. هذا الإجراء لا يمكن التراجع عنه.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>إلغاء</AlertDialogCancel>
                <AlertDialogAction 
                  onClick={handleDeleteCustomer}
                  className="bg-red-500 hover:bg-red-600"
                >
                  حذف
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      )}
    </MainLayout>
  );
};
