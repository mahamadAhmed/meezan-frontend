
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Customer } from "@/types/customer";
import { FiArrowRight, FiSave } from "react-icons/fi";
import { toast } from "sonner";
import { CustomerForm, CustomerFormValues } from "./components/CustomerForm";

export default function CustomerEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Normally, you would fetch the customer from the API
  useEffect(() => {
    // Simulating an API call
    setIsLoading(true);
    setTimeout(() => {
      // This is mock data - in a real application, you would fetch from an API
      const mockCustomers: Customer[] = [
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
      ];
      
      const foundCustomer = mockCustomers.find(c => c.id === Number(id));
      if (foundCustomer) {
        setCustomer(foundCustomer);
      }
      setIsLoading(false);
    }, 1000);
  }, [id]);

  const handleSubmit = (data: CustomerFormValues) => {
    setIsSaving(true);

    // Simulate API call to update customer
    setTimeout(() => {
      // Here you would typically send the updated data to your API
      console.log("Updated customer data:", {
        ...customer,
        ...data
      });
      
      setIsSaving(false);
      toast.success("تم تحديث بيانات العميل بنجاح");
      navigate('/customers');
    }, 1500);
  };

  if (isLoading) {
    return (
      <MainLayout>
        <div className="container mx-auto py-8">
          <div className="flex justify-center items-center h-[400px]">
            <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!customer) {
    return (
      <MainLayout>
        <div className="container mx-auto py-8">
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <h3 className="text-lg font-medium text-gray-900">لم يتم العثور على العميل</h3>
                <p className="mt-2 text-sm text-gray-500">
                  العميل بالمعرف {id} غير موجود أو تم حذفه.
                </p>
                <div className="mt-6">
                  <Button onClick={() => navigate('/customers')}>
                    <FiArrowRight className="ml-2 h-4 w-4" />
                    العودة إلى قائمة العملاء
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </MainLayout>
    );
  }

  // Convert Customer to CustomerFormValues for the form
  const initialValues: Partial<CustomerFormValues> = {
    name: customer.name,
    email: customer.email,
    phone: customer.phone,
    address: customer.address,
    type: customer.type,
    status: customer.status,
    notes: customer.notes,
    joinDate: customer.joinDate,
    nationalId: "", // Add default value for required fields that might be missing in the Customer type
    // Handle attachments conversion if needed
  };

  return (
    <MainLayout>
      <div className="container mx-auto py-6">
        <Card className="shadow-sm border border-slate-200">
          <CardHeader className="bg-slate-50 flex flex-row items-center justify-between space-y-0 pb-4">
            <div>
              <CardTitle className="text-2xl font-bold">تعديل بيانات العميل</CardTitle>
              <p className="text-slate-500 mt-1 text-sm">تعديل بيانات العميل {customer.name}</p>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline"
                onClick={() => navigate('/customers')}
              >
                <FiArrowRight className="ml-2 h-4 w-4" />
                إلغاء
              </Button>
              <Button 
                onClick={() => document.getElementById('submit-form')?.click()}
                disabled={isSaving}
              >
                <FiSave className="ml-2 h-4 w-4" />
                {isSaving ? 'جاري الحفظ...' : 'حفظ التغييرات'}
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <CustomerForm 
              initialValues={initialValues}
              onSubmit={handleSubmit}
              isLoading={isSaving}
            />
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
