
import { useState } from "react";
import { FiUser, FiEdit, FiUpload, FiMail, FiPhone, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { Button } from "@/shared/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Separator } from "@/shared/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar";
import { toast } from "sonner";
import MainLayout from "@/layouts/MainLayout";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const passwordSchema = z.object({
  currentPassword: z.string().min(1, "كلمة المرور الحالية مطلوبة"),
  newPassword: z.string().min(8, "كلمة المرور الجديدة يجب أن تكون 8 أحرف على الأقل"),
  confirmPassword: z.string()
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "كلمتا المرور غير متطابقتين",
  path: ["confirmPassword"],
});

const Profile = () => {
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const form = useForm<z.infer<typeof passwordSchema>>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    }
  });

  const user = {
    name: "محمد الأحمد",
    email: "mohammed@example.com",
    phone: "0512345678",
    role: "محامي",
    joinDate: "2022-05-10",
    initials: "م أ"
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIsUploading(true);
      
      setTimeout(() => {
        const file = e.target.files![0];
        const imageUrl = URL.createObjectURL(file);
        setProfileImage(imageUrl);
        setIsUploading(false);
        toast.success("تم تحديث الصورة الشخصية بنجاح");
      }, 1000);
    }
  };

  const togglePasswordVisibility = (field: 'current' | 'new' | 'confirm') => {
    setShowPassword(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const onPasswordSubmit = (values: z.infer<typeof passwordSchema>) => {
    toast.success("تم تحديث كلمة المرور بنجاح");
    form.reset();
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">الملف الشخصي</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Info Card */}
          <Card className="md:col-span-1">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <FiUser className="ml-2" />
                المعلومات الأساسية
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 flex flex-col items-center text-center">
              <div className="relative group">
                <Avatar className="h-24 w-24 border-2 border-primary/20">
                  <AvatarImage src={profileImage || "/placeholder-avatar.jpg"} alt={user.name} />
                  <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                    {user.initials}
                  </AvatarFallback>
                </Avatar>
                
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button 
                    variant="secondary" 
                    size="icon" 
                    className="h-8 w-8 bg-background/60 backdrop-blur-sm hover:bg-background/90"
                    onClick={() => document.getElementById('profile-image-upload')?.click()}
                    disabled={isUploading}
                  >
                    <FiEdit className="h-4 w-4" />
                  </Button>
                  <input 
                    type="file" 
                    id="profile-image-upload" 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </div>
              </div>
              
              <h2 className="text-xl font-bold mt-4">{user.name}</h2>
              <p className="text-muted-foreground">{user.role}</p>
              
              <Separator className="my-4" />
              
              <div className="w-full space-y-2 text-right">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">البريد الإلكتروني:</span>
                  <span className="font-medium">{user.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">رقم الهاتف:</span>
                  <span className="font-medium">{user.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">تاريخ الانضمام:</span>
                  <span className="font-medium">{new Date(user.joinDate).toLocaleDateString('ar-SA')}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security Card */}
          <Card className="md:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <FiLock className="ml-2" />
                الأمان
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onPasswordSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="currentPassword"
                    render={({ field }) => (
                      <FormItem className="relative">
                        <FormLabel>كلمة المرور الحالية</FormLabel>
                        <div className="relative">
                          <FormControl>
                            <Input
                              type={showPassword.current ? "text" : "password"}
                              {...field}
                              className="pl-10"
                            />
                          </FormControl>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute left-2 top-1/2 -translate-y-1/2"
                            onClick={() => togglePasswordVisibility('current')}
                          >
                            {showPassword.current ? <FiEyeOff className="h-4 w-4" /> : <FiEye className="h-4 w-4" />}
                          </Button>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem className="relative">
                        <FormLabel>كلمة المرور الجديدة</FormLabel>
                        <div className="relative">
                          <FormControl>
                            <Input
                              type={showPassword.new ? "text" : "password"}
                              {...field}
                              className="pl-10"
                            />
                          </FormControl>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute left-2 top-1/2 -translate-y-1/2"
                            onClick={() => togglePasswordVisibility('new')}
                          >
                            {showPassword.new ? <FiEyeOff className="h-4 w-4" /> : <FiEye className="h-4 w-4" />}
                          </Button>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem className="relative">
                        <FormLabel>تأكيد كلمة المرور الجديدة</FormLabel>
                        <div className="relative">
                          <FormControl>
                            <Input
                              type={showPassword.confirm ? "text" : "password"}
                              {...field}
                              className="pl-10"
                            />
                          </FormControl>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="absolute left-2 top-1/2 -translate-y-1/2"
                            onClick={() => togglePasswordVisibility('confirm')}
                          >
                            {showPassword.confirm ? <FiEyeOff className="h-4 w-4" /> : <FiEye className="h-4 w-4" />}
                          </Button>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-end">
                    <Button type="submit">تحديث كلمة المرور</Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;
