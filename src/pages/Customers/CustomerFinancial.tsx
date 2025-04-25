
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Customer, FinancialRecord } from "@/types/customer";
import { FiArrowRight, FiEye, FiPlus } from "react-icons/fi";
import { DataTable } from "@/components/ui/data-table";

export default function CustomerFinancial() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [financialRecords, setFinancialRecords] = useState<FinancialRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Normally, you would fetch the customer and financial records from the API
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
      ];
      
      const foundCustomer = mockCustomers.find(c => c.id === Number(id));
      
      const mockFinancialRecords: FinancialRecord[] = [
        {
          id: 1,
          customerId: 1,
          amount: 5000,
          date: "2023-06-15",
          type: "دفعة",
          description: "دفعة مقدمة",
          status: "مدفوعة",
        },
        {
          id: 2,
          customerId: 1,
          amount: 2500,
          date: "2023-07-20",
          type: "فاتورة",
          description: "فاتورة خدمات قانونية",
          status: "مدفوعة",
        },
        {
          id: 3,
          customerId: 2,
          amount: 7500,
          date: "2023-08-10",
          type: "دفعة",
          description: "دفعة أولى",
          status: "مدفوعة",
        },
        {
          id: 4,
          customerId: 1,
          amount: 1500,
          date: "2023-09-05",
          type: "فاتورة",
          description: "فاتورة متابعة قضية",
          status: "معلقة",
        },
      ];
      
      if (foundCustomer) {
        setCustomer(foundCustomer);
        // Filter financial records for this customer
        setFinancialRecords(mockFinancialRecords.filter(record => record.customerId === foundCustomer.id));
      }
      
      setIsLoading(false);
    }, 1000);
  }, [id]);

  const columns = [
    {
      key: "id",
      header: "رقم المعاملة",
      cell: (record: FinancialRecord) => <span>#{record.id}</span>,
    },
    {
      key: "amount",
      header: "المبلغ",
      cell: (record: FinancialRecord) => <span className="font-medium">{record.amount} ر.س</span>,
    },
    {
      key: "date",
      header: "التاريخ",
      cell: (record: FinancialRecord) => <span>{record.date}</span>,
    },
    {
      key: "type",
      header: "النوع",
      cell: (record: FinancialRecord) => <span>{record.type}</span>,
    },
    {
      key: "description",
      header: "الوصف",
      cell: (record: FinancialRecord) => <span>{record.description}</span>,
    },
    {
      key: "status",
      header: "الحالة",
      cell: (record: FinancialRecord) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
          ${
            record.status === "مدفوعة"
              ? "bg-green-100 text-green-800"
              : record.status === "معلقة"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {record.status}
        </span>
      ),
    },
  ];

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
              <CardTitle className="text-2xl font-bold">المعاملات المالية</CardTitle>
              <p className="text-slate-500 mt-1 text-sm">عرض سجل المعاملات المالية للعميل {customer.name}</p>
            </div>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline"
                onClick={() => navigate(`/customers/${id}`)}
              >
                <FiEye className="ml-2 h-4 w-4" />
                بيانات العميل
              </Button>
              <Button>
                <FiPlus className="ml-2 h-4 w-4" />
                إضافة معاملة
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
            <DataTable
              data={financialRecords}
              columns={columns}
              onView={(record) => console.log("View record:", record)}
              onEdit={(record) => console.log("Edit record:", record)}
              onDelete={(record) => console.log("Delete record:", record)}
            />

            {financialRecords.length > 0 && (
              <div className="mt-6 p-4 bg-slate-50 rounded-md">
                <div className="flex justify-between items-center">
                  <span className="font-medium">إجمالي المدفوعات:</span>
                  <span className="font-bold text-green-600">
                    {financialRecords
                      .filter(record => record.type === "دفعة" && record.status === "مدفوعة")
                      .reduce((sum, record) => sum + record.amount, 0)} ر.س
                  </span>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="font-medium">إجمالي الفواتير:</span>
                  <span className="font-bold text-red-600">
                    {financialRecords
                      .filter(record => record.type === "فاتورة")
                      .reduce((sum, record) => sum + record.amount, 0)} ر.س
                  </span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
