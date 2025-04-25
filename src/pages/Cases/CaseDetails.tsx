import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import MainLayout from "@/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { FiEdit2 } from "react-icons/fi";
import { Badge } from "@/components/ui/badge";
import {
  FiArrowRight,
  FiCalendar,
  FiClock,
  FiFileText,
  FiMapPin,
  FiUser,
  FiX,
  FiCheck,
  FiTag,
  FiInfo,
  FiCreditCard,
  FiList,
  FiPlus,
} from "react-icons/fi";

// نموذج بيانات القضية
interface Case {
  id: number;
  caseNumber: string;
  client: string;
  type: string;
  court: string;
  date: string;
  status: "نشطة" | "قيد المعالجة" | "مغلقة";
  description: string;
  judge?: string;
  lawyer?: string;
  nextSessionDate?: string;
  fees?: number;
}

// نموذج بيانات جلسة القضية
interface CaseSession {
  id: number;
  caseId: number;
  date: string;
  time: string;
  location: string;
  status: "قادمة" | "قيد التنفيذ" | "منتهية";
  notes: string;
}

// نموذج بيانات مستند القضية
interface CaseDocument {
  id: number;
  caseId: number;
  name: string;
  type: string;
  size: string;
  uploadDate: string;
  uploadedBy: string;
}

// ألوان حالة القضية
const statusColors: Record<string, string> = {
  "نشطة": "bg-emerald-500",
  "قيد المعالجة": "bg-amber-500",
  "مغلقة": "bg-rose-500",
};

// ألوان حالة الجلسة
const sessionStatusColors: Record<string, string> = {
  "قادمة": "bg-blue-500 hover:bg-blue-600",
  "قيد التنفيذ": "bg-amber-500 hover:bg-amber-600",
  "منتهية": "bg-emerald-500 hover:bg-emerald-600",
};

export default function CaseDetails() {
  const { id } = useParams<{ id: string }>();
  const [caseData, setCaseData] = useState<Case | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<Case | null>(null);
  const [sessions, setSessions] = useState<CaseSession[]>([]);
  const [documents, setDocuments] = useState<CaseDocument[]>([]);
  const [loading, setLoading] = useState(true);

  // محاكاة طلب API لجلب بيانات القضية
  useEffect(() => {
    // في التطبيق الفعلي، هذا سيكون طلب API
    setTimeout(() => {
      // جلب بيانات القضية
      const caseData: Case = {
        id: parseInt(id || "0"),
        caseNumber: "1452",
        client: "أحمد محمد",
        type: "قضية تجارية",
        court: "محكمة الرياض التجارية",
        date: "2024-03-15",
        status: "نشطة",
        description: "نزاع تجاري بين شركتين حول عقد توريد",
        judge: "عبدالله الشمري",
        lawyer: "خالد العتيبي",
        nextSessionDate: "2024-05-10",
        fees: 5000,
      };
      setCaseData(caseData);

      // جلب بيانات جلسات القضية
      const sessionData: CaseSession[] = [
        {
          id: 1,
          caseId: parseInt(id || "0"),
          date: "2024-04-15",
          time: "10:00 صباحاً",
          location: "محكمة الرياض التجارية - قاعة 3",
          status: "منتهية",
          notes: "تم تقديم المستندات المطلوبة وتحديد موعد الجلسة القادمة",
        },
        {
          id: 2,
          caseId: parseInt(id || "0"),
          date: "2024-05-10",
          time: "11:30 صباحاً",
          location: "محكمة الرياض التجارية - قاعة 5",
          status: "قادمة",
          notes: "يجب إحضار الشهود والمستندات الإضافية",
        },
      ];
      setSessions(sessionData);

      // جلب بيانات مستندات القضية
      const documentData: CaseDocument[] = [
        {
          id: 1,
          caseId: parseInt(id || "0"),
          name: "عقد التوريد",
          type: "PDF",
          size: "2.5 MB",
          uploadDate: "2024-03-20",
          uploadedBy: "خالد العتيبي",
        },
        {
          id: 2,
          caseId: parseInt(id || "0"),
          name: "محضر الاجتماع",
          type: "DOCX",
          size: "1.8 MB",
          uploadDate: "2024-03-22",
          uploadedBy: "سارة المطيري",
        },
        {
          id: 3,
          caseId: parseInt(id || "0"),
          name: "صور المستندات",
          type: "ZIP",
          size: "15.2 MB",
          uploadDate: "2024-03-25",
          uploadedBy: "خالد العتيبي",
        },
      ];
      setDocuments(documentData);

      // إنهاء التحميل
      setLoading(false);
    }, 1000);
  }, [id]);

  // دالة لتنسيق التاريخ بالأسلوب العربي
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, "d MMMM yyyy", { locale: ar });
    } catch (error) {
      return dateString;
    }
  };

  const handleEdit = () => {
    setEditForm(caseData);
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    if (editForm) {
      setCaseData(editForm);
      setIsEditing(false);
      toast.success("تم تحديث بيانات القضية بنجاح");
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full"></div>
        </div>
      </MainLayout>
    );
  }

  if (!caseData) {
    return (
      <MainLayout>
        <div className="text-center p-10">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">
            القضية غير موجودة
          </h2>
          <p className="text-slate-500 mb-6">
            لم يتم العثور على قضية بهذا الرقم المعرف
          </p>
          <Button asChild>
            <Link to="/cases">
              <FiArrowRight className="ml-2" />
              العودة إلى قائمة القضايا
            </Link>
          </Button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <Link to="/cases" className="text-slate-500 hover:text-primary">
              <FiArrowRight className="w-5 h-5" />
            </Link>
            <h1 className="text-2xl font-bold text-slate-800">
              قضية رقم {caseData?.caseNumber}
            </h1>
            <Badge className={`${caseData?.status ? statusColors[caseData.status] : ""} text-white`}>
              {caseData?.status}
            </Badge>
          </div>
          <p className="text-slate-500 mt-1">{caseData?.type}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleEdit}>
            <FiEdit2 className="ml-2 h-4 w-4" />
            تعديل
          </Button>
        </div>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>تعديل بيانات القضية</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label>رقم القضية</label>
              <Input
                value={editForm?.caseNumber || ""}
                onChange={(e) =>
                  setEditForm(prev => prev ? { ...prev, caseNumber: e.target.value } : null)
                }
              />
            </div>
            {/* Add more form fields for editing case details */}
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                إلغاء
              </Button>
              <Button onClick={handleSaveEdit}>
                حفظ التعديلات
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* العمود الأيمن - بيانات القضية */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>تفاصيل القضية</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-slate-500 mb-1">
                  العميل
                </h4>
                <div className="flex items-center">
                  <FiUser className="ml-2 text-slate-400" />
                  <p className="font-medium">{caseData.client}</p>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-slate-500 mb-1">
                  نوع القضية
                </h4>
                <div className="flex items-center">
                  <FiTag className="ml-2 text-slate-400" />
                  <p className="font-medium">{caseData.type}</p>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-slate-500 mb-1">
                  المحكمة
                </h4>
                <div className="flex items-center">
                  <FiMapPin className="ml-2 text-slate-400" />
                  <p className="font-medium">{caseData.court}</p>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium text-slate-500 mb-1">
                  تاريخ القضية
                </h4>
                <div className="flex items-center">
                  <FiCalendar className="ml-2 text-slate-400" />
                  <p className="font-medium">{formatDate(caseData.date)}</p>
                </div>
              </div>
              {caseData.nextSessionDate && (
                <div>
                  <h4 className="text-sm font-medium text-slate-500 mb-1">
                    الجلسة القادمة
                  </h4>
                  <div className="flex items-center">
                    <FiClock className="ml-2 text-slate-400" />
                    <p className="font-medium">
                      {formatDate(caseData.nextSessionDate)}
                    </p>
                  </div>
                </div>
              )}
              {caseData.judge && (
                <div>
                  <h4 className="text-sm font-medium text-slate-500 mb-1">
                    القاضي
                  </h4>
                  <div className="flex items-center">
                    <FiUser className="ml-2 text-slate-400" />
                    <p className="font-medium">{caseData.judge}</p>
                  </div>
                </div>
              )}
              {caseData.lawyer && (
                <div>
                  <h4 className="text-sm font-medium text-slate-500 mb-1">
                    المحامي المسؤول
                  </h4>
                  <div className="flex items-center">
                    <FiUser className="ml-2 text-slate-400" />
                    <p className="font-medium">{caseData.lawyer}</p>
                  </div>
                </div>
              )}
              {caseData.fees !== undefined && (
                <div>
                  <h4 className="text-sm font-medium text-slate-500 mb-1">
                    الرسوم
                  </h4>
                  <div className="flex items-center">
                    <FiCreditCard className="ml-2 text-slate-400" />
                    <p className="font-medium">{caseData.fees} ريال</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>وصف القضية</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-700">{caseData?.description}</p>
            </CardContent>
          </Card>
        </div>

        {/* العمود الأيسر - التبويبات */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="sessions">
            <TabsList className="mb-4">
              <TabsTrigger value="sessions">الجلسات</TabsTrigger>
              <TabsTrigger value="documents">المستندات</TabsTrigger>
              <TabsTrigger value="notes">الملاحظات</TabsTrigger>
            </TabsList>

            {/* تبويب الجلسات */}
            <TabsContent value="sessions">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle>جلسات القضية</CardTitle>
                  <Button size="sm">
                    <FiPlus className="ml-2 h-4 w-4" />
                    إضافة جلسة
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {sessions.map((session) => (
                      <div
                        key={session.id}
                        className="border border-slate-200 rounded-lg p-4"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center">
                            <FiCalendar className="ml-2 text-slate-400" />
                            <h3 className="font-semibold">
                              {formatDate(session.date)} | {session.time}
                            </h3>
                          </div>
                          <Badge
                            className={`${
                              sessionStatusColors[session.status]
                            } text-white`}
                          >
                            {session.status}
                          </Badge>
                        </div>

                        <div className="space-y-3 text-slate-700">
                          <div className="flex items-center">
                            <FiMapPin className="ml-2 text-slate-400" />
                            <span>{session.location}</span>
                          </div>

                          <div>
                            <h4 className="text-sm font-medium text-slate-500 mb-1">
                              ملاحظات:
                            </h4>
                            <p>{session.notes}</p>
                          </div>
                        </div>

                        <div className="flex justify-end gap-2 mt-4">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-slate-500"
                          >
                            <FiEdit2 className="ml-2 h-4 w-4" />
                            تعديل
                          </Button>
                          <Button variant="outline" size="sm">
                            <FiFileText className="ml-2 h-4 w-4" />
                            محضر الجلسة
                          </Button>
                        </div>
                      </div>
                    ))}

                    {sessions.length === 0 && (
                      <div className="text-center py-8">
                        <FiInfo className="mx-auto h-10 w-10 text-slate-300 mb-3" />
                        <p className="text-slate-500">
                          لا توجد جلسات مسجلة لهذه القضية
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center border-t pt-4">
                  {sessions.length > 0 && (
                    <Button variant="outline">عرض جميع الجلسات</Button>
                  )}
                </CardFooter>
              </Card>
            </TabsContent>

            {/* تبويب المستندات */}
            <TabsContent value="documents">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle>مستندات القضية</CardTitle>
                  <Button size="sm">
                    <FiPlus className="ml-2 h-4 w-4" />
                    إضافة مستند
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-slate-50">
                          <th className="py-3 px-4 text-right text-sm font-medium text-slate-500 border-b">
                            اسم المستند
                          </th>
                          <th className="py-3 px-4 text-right text-sm font-medium text-slate-500 border-b">
                            النوع
                          </th>
                          <th className="py-3 px-4 text-right text-sm font-medium text-slate-500 border-b">
                            الحجم
                          </th>
                          <th className="py-3 px-4 text-right text-sm font-medium text-slate-500 border-b">
                            تاريخ الرفع
                          </th>
                          <th className="py-3 px-4 text-right text-sm font-medium text-slate-500 border-b">
                            بواسطة
                          </th>
                          <th className="py-3 px-4 text-center text-sm font-medium text-slate-500 border-b">
                            الإجراءات
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {documents.map((doc) => (
                          <tr
                            key={doc.id}
                            className="hover:bg-slate-50 transition-colors"
                          >
                            <td className="py-3 px-4 border-b text-slate-700">
                              <div className="flex items-center">
                                <FiFileText className="ml-2 text-slate-400" />
                                {doc.name}
                              </div>
                            </td>
                            <td className="py-3 px-4 border-b text-slate-700">
                              {doc.type}
                            </td>
                            <td className="py-3 px-4 border-b text-slate-700">
                              {doc.size}
                            </td>
                            <td className="py-3 px-4 border-b text-slate-700">
                              {formatDate(doc.uploadDate)}
                            </td>
                            <td className="py-3 px-4 border-b text-slate-700">
                              {doc.uploadedBy}
                            </td>
                            <td className="py-3 px-4 border-b">
                              <div className="flex justify-center gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-blue-600"
                                >
                                  تنزيل
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-red-600"
                                >
                                  حذف
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>

                    {documents.length === 0 && (
                      <div className="text-center py-8">
                        <FiInfo className="mx-auto h-10 w-10 text-slate-300 mb-3" />
                        <p className="text-slate-500">
                          لا توجد مستندات مرفقة بهذه القضية
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* تبويب الملاحظات */}
            <TabsContent value="notes">
              <Card>
                <CardHeader>
                  <CardTitle>ملاحظات القضية</CardTitle>
                  <CardDescription>
                    سجل ملاحظاتك ومتابعاتك للقضية
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <FiInfo className="mx-auto h-10 w-10 text-slate-300 mb-3" />
                    <p className="text-slate-500">
                      لا توجد ملاحظات مسجلة لهذه القضية
                    </p>
                    <Button className="mt-4">
                      <FiPlus className="ml-2 h-4 w-4" />
                      إضافة ملاحظة
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </MainLayout>
  );
}
