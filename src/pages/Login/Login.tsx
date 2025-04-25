
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/shared/components/ui/card";
import { Label } from "@/components/ui/label";
import { FiBriefcase, FiUser, FiLock, FiLogIn } from "react-icons/fi";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // هنا يمكن إضافة التحقق من بيانات تسجيل الدخول في بيئة حقيقية
    setTimeout(() => {
      setIsLoading(false);
      toast.success("تم تسجيل الدخول بنجاح");
      navigate("/"); // التوجيه إلى لوحة التحكم
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4" dir="rtl">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary text-white mb-4">
            <FiBriefcase size={32} />
          </div>
          <h1 className="text-2xl font-bold text-slate-800">نظام إدارة المكتب القانوني</h1>
          <p className="text-slate-500 mt-2">سجل دخولك للوصول إلى لوحة التحكم</p>
        </div>

        <Card className="border-0 shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl text-center">تسجيل الدخول</CardTitle>
            <CardDescription className="text-center">
              أدخل بيانات حسابك للوصول إلى لوحة التحكم
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">البريد الإلكتروني</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-500">
                    <FiUser />
                  </div>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="أدخل بريدك الإلكتروني"
                    className="pr-10"
                    required
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">كلمة المرور</Label>
                  <a href="#" className="text-sm text-primary hover:underline">
                    نسيت كلمة المرور؟
                  </a>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-500">
                    <FiLock />
                  </div>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="أدخل كلمة المرور"
                    className="pr-10"
                    required
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    جاري تسجيل الدخول...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    <FiLogIn className="ml-2" />
                    تسجيل الدخول
                  </span>
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-slate-500">أو</span>
              </div>
            </div>
            <Button variant="outline" className="w-full">
              إنشاء حساب جديد
            </Button>
          </CardFooter>
        </Card>

        <p className="text-center mt-6 text-sm text-slate-500">
          © {new Date().getFullYear()} نظام إدارة المكتب القانوني. جميع الحقوق محفوظة.
        </p>
      </div>
    </div>
  );
};

export default Login;
