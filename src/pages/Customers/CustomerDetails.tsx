
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Customer } from "@/types/customer";
import { FiArrowRight, FiEdit, FiDollarSign } from "react-icons/fi";
import { Separator } from "@/shared/components/ui/separator";
import { Badge } from "@/shared/components/ui/badge";

export default function CustomerDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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

  return (
    <MainLayout>
      <div className="container mx-auto py-6">
        <Card className="shadow-sm border border-slate-200">
          <CardHeader className="bg-slate-50 flex flex-row items-center justify-between space-y-0 pb-4">
            <div>
              <CardTitle className="text-2xl font-bold">تفاصيل العميل</CardTitle>
              <p className="text-slate-500 mt-1 text-sm">عرض بيانات العميل وتفاصيل الاتصال</p>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                onClick={() => navigate(`/customers/${id}/financial`)}
              >
                <FiDollarSign className="ml-2 h-4 w-4" />
                المعاملات المالية
              </Button>
              <Button 
                variant="secondary"
                onClick={() => navigate(`/customers/${id}/edit`)}
              >
                <FiEdit className="ml-2 h-4 w-4" />
                تعديل البيانات
              </Button>
              <Button 
                variant="outline"
                onClick={() => navigate('/customers')}
              >
                <FiArrowRight className="ml-2 h-4 w-4" />
                العودة
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">{customer.name}</h2>
              <Badge 
                className={
                  customer.status === "نشط" 
                    ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-100" 
                    : customer.status === "معلق"
                    ? "bg-amber-100 text-amber-800 hover:bg-amber-100"
                    : "bg-slate-100 text-slate-800 hover:bg-slate-100"
                }
              >
                {customer.status}
              </Badge>
            </div>
            
            <Separator className="my-4" />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">معلومات الاتصال</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-slate-500">البريد الإلكتروني</p>
                    <p className="font-medium">{customer.email || "غير متوفر"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">رقم الهاتف</p>
                    <p className="font-medium">{customer.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">العنوان</p>
                    <p className="font-medium">{customer.address}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3">معلومات العميل</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-slate-500">نوع العميل</p>
                    <p className="font-medium">{customer.type}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">تاريخ الانضمام</p>
                    <p className="font-medium">{customer.joinDate}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">ملاحظات</p>
                    <p className="font-medium">{customer.notes || "لا توجد ملاحظات"}</p>
                  </div>
                </div>
              </div>
            </div>

            {customer.attachments && customer.attachments.length > 0 && (
              <>
                <Separator className="my-6" />
                <div>
                  <h3 className="text-lg font-semibold mb-3">المرفقات</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {customer.attachments.map((attachment, index) => (
                      <div key={index} className="border rounded-md p-3 flex items-center">
                        <div className="bg-slate-100 p-2 rounded-md mr-3">
                          {/* Icon based on file type would go here */}
                        </div>
                        <div>
                          <p className="font-medium truncate">{attachment}</p>
                          <p className="text-xs text-slate-500">مرفق {index + 1}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
