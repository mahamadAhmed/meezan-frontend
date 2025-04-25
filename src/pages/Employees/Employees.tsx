
import { useState } from "react";
import MainLayout from "@/layouts/MainLayout";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import EmployeeCard from "./EmployeeCard";
import { EmployeesFilter } from "./EmployeesFilter";
import AddEmployeeButton from "./AddEmployeeButton";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";
import { User, CircleUser } from "lucide-react";
import { Employee } from "@/types/customer";

const employeeFormSchema = z.object({
  name: z.string().min(2, { message: "اسم الموظف مطلوب" }),
  position: z.enum(["ادارة", "محامي", "محاسب", "غير ذلك"], { required_error: "المنصب مطلوب" }),
  jobTitle: z.string().min(2, { message: "العنوان الوظيفي مطلوب" }),
  email: z.string().email({ message: "الرجاء إدخال بريد إلكتروني صالح" }),
  phone: z.string().min(10, { message: "رقم الهاتف يجب أن يحتوي على 10 أرقام على الأقل" }),
  status: z.enum(["نشط", "في إجازة", "منتهي"], { required_error: "حالة الموظف مطلوبة" }),
  joinDate: z.string().min(1, { message: "تاريخ التعيين مطلوب" }),
});
type EmployeeFormValues = z.infer<typeof employeeFormSchema>;

const FILTER_OPTIONS = [
  { value: "all", label: "الكل", Icon: User },
  { value: "نشط", label: "نشط", Icon: User },
  { value: "في إجازة", label: "في إجازة", Icon: CircleUser },
  { value: "مستقال", label: "مستقبل", Icon: CircleUser },
];

const POSITION_OPTIONS = [
  { value: "ادارة", label: "ادارة" },
  { value: "محامي", label: "محامي" },
  { value: "محاسب", label: "محاسب" },
  { value: "غير ذلك", label: "غير ذلك" },
];

const Employees = () => {
  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: 1,
      name: "أحمد محمد",
      position: "محامي",
      email: "ahmed@lawfirm.com",
      phone: "0555123456",
      status: "نشط",
      joinDate: "2022-01-15",
      department: "القانون المدني",
      address: "الرياض، حي العليا",
      jobTitle: "محامي أول",
    },
    {
      id: 2,
      name: "سارة خالد",
      position: "ادارة",
      email: "sara@lawfirm.com",
      phone: "0555789012",
      status: "نشط",
      joinDate: "2022-03-20",
      department: "القانون التجاري",
      address: "جدة، حي النزهة",
      jobTitle: "مدير",
    },
    {
      id: 3,
      name: "محمد العتيبي",
      position: "محامي",
      email: "mohammad@lawfirm.com",
      phone: "0555345678",
      status: "في إجازة",
      joinDate: "2021-11-10",
      department: "القانون الجنائي",
      address: "الدمام، حي الشاطئ",
      jobTitle: "محامي مساعد",
    },
    {
      id: 4,
      name: "فاطمة العلي",
      position: "محاسب",
      email: "fatima@lawfirm.com",
      phone: "0555901234",
      status: "نشط",
      joinDate: "2023-01-05",
      department: "الإدارة",
      address: "الرياض، حي الروضة",
      jobTitle: "محاسب أول",
    },
  ]);

  const [activeFilter, setActiveFilter] = useState("all");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<EmployeeFormValues>({
    resolver: zodResolver(employeeFormSchema),
    defaultValues: {
      name: "",
      position: "محامي",
      email: "",
      phone: "",
      status: "نشط",
      joinDate: "",
      jobTitle: "",
    },
  });

  const handleAddEmployee = () => {
    form.reset({
      name: "",
      position: "محامي",
      email: "",
      phone: "",
      status: "نشط",
      joinDate: new Date().toISOString().split("T")[0],
      jobTitle: "",
    });
    setIsAddModalOpen(true);
  };

  const handleEditEmployee = (employee: Employee) => {
    setSelectedEmployee(employee);
    form.reset({
      name: employee.name,
      position: ["ادارة", "محامي", "محاسب", "غير ذلك"].includes(employee.position) ? (employee.position as any) : "غير ذلك",
      email: employee.email,
      phone: employee.phone,
      status: employee.status,
      joinDate: employee.joinDate,
      jobTitle: employee.jobTitle,
    });
    setIsEditModalOpen(true);
  };

  const handleDeleteEmployee = (employeeId: number) => {
    setIsSubmitting(true);
    setTimeout(() => {
      const updatedEmployees = employees.filter((emp) => emp.id !== employeeId);
      setEmployees(updatedEmployees);
      setIsSubmitting(false);
      toast.success("تم حذف الموظف بنجاح");
    }, 500);
  };

  const onAddEmployee = (data: EmployeeFormValues) => {
    setIsSubmitting(true);
    setTimeout(() => {
      const newEmployee: Employee = {
        id: Math.floor(Math.random() * 1000) + 10,
        name: data.name,
        position: data.position,
        email: data.email,
        phone: data.phone,
        status: data.status,
        joinDate: data.joinDate,
        department: "",
        address: "",
        jobTitle: data.jobTitle,
      };
      setEmployees([...employees, newEmployee]);
      setIsAddModalOpen(false);
      setIsSubmitting(false);
      form.reset();
      toast.success("تم إضافة الموظف بنجاح");
    }, 1000);
  };

  const onEditEmployee = (data: EmployeeFormValues) => {
    if (!selectedEmployee) return;
    setIsSubmitting(true);
    setTimeout(() => {
      const updatedEmployees = employees.map((emp) =>
        emp.id === selectedEmployee.id
          ? {
              ...emp,
              ...data,
              address: emp.address,
              jobTitle: data.jobTitle,
            }
          : emp
      );
      setEmployees(updatedEmployees);
      setIsEditModalOpen(false);
      setIsSubmitting(false);
      toast.success("تم تحديث بيانات الموظف بنجاح");
    }, 1000);
  };

  const filteredEmployees = activeFilter === "all"
    ? employees
    : employees.filter((emp) =>
        (activeFilter === "مستقال"
          ? emp.status === "منتهي"
          : emp.status === activeFilter)
      );

  return (
    <MainLayout>
      <div className="container rtl py-8 px-2 md:px-0">
        <div className="flex flex-col-reverse md:flex-row md:items-center md:justify-between gap-3 mb-10">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-black mb-1 leading-tight tracking-tight">
              الموظفون
            </h1>
            <div className="text-[#636681] text-base font-medium">إدارة بيانات الموظفين وحساباتهم</div>
          </div>
          <AddEmployeeButton onAdd={handleAddEmployee} />
        </div>
        <EmployeesFilter
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          filterOptions={FILTER_OPTIONS}
          employees={employees}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredEmployees.length === 0 && (
            <div className="col-span-full text-center py-16 text-[#b4b4b4]">
              لا يوجد موظفون تحت هذا التصنيف
            </div>
          )}
          {filteredEmployees.map(employee => (
            <EmployeeCard
              key={employee.id}
              employee={employee}
              onEdit={() => handleEditEmployee(employee)}
              onDelete={() => handleDeleteEmployee(employee.id)}
              onSendMessage={() => {}}
            />
          ))}
        </div>

        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogContent className="sm:max-w-[420px]">
            <DialogHeader>
              <DialogTitle>إضافة موظف جديد</DialogTitle>
              <DialogDescription>
                أدخل بيانات الموظف الجديد
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onAddEmployee)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>الاسم</FormLabel>
                      <FormControl>
                        <Input placeholder="أدخل اسم الموظف" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="position"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>المنصب</FormLabel>
                      <FormControl>
                        <select
                          {...field}
                          className="flex h-10 w-full rounded-lg border border-input bg-[#f6f8fa] text-[#23232a] px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
                        >
                          {POSITION_OPTIONS.map(opt => (
                            <option key={opt.value} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="jobTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>العنوان الوظيفي</FormLabel>
                      <FormControl>
                        <Input placeholder="مثلًا: محامي أول، مساعد إداري..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>البريد الإلكتروني</FormLabel>
                        <FormControl>
                          <Input placeholder="البريد الإلكتروني" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>رقم الهاتف</FormLabel>
                        <FormControl>
                          <Input placeholder="رقم الهاتف" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="joinDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>تاريخ التعيين</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>الحالة</FormLabel>
                        <FormControl>
                          <select
                            {...field}
                            className="flex h-10 w-full rounded-lg border border-input bg-[#f6f8fa] text-[#1A1F2C] px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
                          >
                            <option value="نشط">نشط</option>
                            <option value="في إجازة">في إجازة</option>
                            <option value="منتهي">مستقال</option>
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <DialogFooter>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-lg bg-black hover:bg-[#23232a] text-white font-bold py-2 transition"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">جاري الحفظ...</span>
                    ) : (
                      "إضافة الموظف"
                    )}
                  </button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>

        <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
          <DialogContent className="sm:max-w-[420px]">
            <DialogHeader>
              <DialogTitle>تعديل بيانات الموظف</DialogTitle>
              <DialogDescription>
                قم بتعديل بيانات الموظف
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onEditEmployee)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>الاسم</FormLabel>
                      <FormControl>
                        <Input placeholder="أدخل اسم الموظف" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="position"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>المنصب</FormLabel>
                      <FormControl>
                        <select
                          {...field}
                          className="flex h-10 w-full rounded-lg border border-input bg-[#f6f8fa] text-[#23232a] px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
                        >
                          {POSITION_OPTIONS.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                          ))}
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="jobTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>العنوان الوظيفي</FormLabel>
                      <FormControl>
                        <Input placeholder="مثلًا: محامي أول، مساعد إداري..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>البريد الإلكتروني</FormLabel>
                        <FormControl>
                          <Input placeholder="البريد الإلكتروني" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>رقم الهاتف</FormLabel>
                        <FormControl>
                          <Input placeholder="رقم الهاتف" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="joinDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>تاريخ التعيين</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>الحالة</FormLabel>
                        <FormControl>
                          <select
                            {...field}
                            className="flex h-10 w-full rounded-lg border border-input bg-[#f6f8fa] text-[#1A1F2C] px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
                          >
                            <option value="نشط">نشط</option>
                            <option value="في إجازة">في إجازة</option>
                            <option value="منتهي">مستقال</option>
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <DialogFooter>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full rounded-lg bg-black hover:bg-[#23232a] text-white font-bold py-2 transition"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">جاري الحفظ...</span>
                    ) : (
                      "حفظ التعديلات"
                    )}
                  </button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
};

export default Employees;
