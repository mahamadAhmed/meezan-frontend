import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { ar } from "date-fns/locale";
import MainLayout from "@/layouts/MainLayout";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  FiArrowRight,
  FiCalendar,
  FiClock,
  FiFileText,
  FiMapPin,
  FiUser,
  FiEdit,
  FiX,
  FiCheck,
  FiTag,
  FiInfo,
  FiCreditCard,
  FiList,
  FiPlus,
} from "react-icons/fi";

import { CaseActionButtons } from "@/components/cases/CaseActionButtons";
import { CaseStatusDialog } from "@/components/cases/CaseStatusDialog";
import { CaseNoteDialog } from "@/components/cases/CaseNoteDialog"; 
import { CaseAttachmentDialog } from "@/components/cases/CaseAttachmentDialog";
import { CaseLawyerDialog } from "@/components/cases/CaseLawyerDialog";

import { Case, CaseStatus, FeeType, statusColors, sessionStatusColors, CaseSession, CaseDocument, CaseNote } from "@/types/case";

export default function CaseDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [caseData, setCaseData] = useState<Case | null>(null);
  const [sessions, setSessions] = useState<CaseSession[]>([]);
  const [documents, setDocuments] = useState<CaseDocument[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);
  const [noteDialogOpen, setNoteDialogOpen] = useState(false);
  const [fileDialogOpen, setFileDialogOpen] = useState(false);
  const [lawyerDialogOpen, setLawyerDialogOpen] = useState(false);

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, "d MMMM yyyy", { locale: ar });
    } catch (error) {
      return dateString;
    }
  };

  useEffect(() => {
    setTimeout(() => {
      const caseData: Case = {
        id: parseInt(id || "0"),
        caseNumber: "1452",
        title: "نزاع تجاري بين شركتين",
        clientName: "أحمد محمد",
        clientId: 101,
        type: "قضية تجارية",
        court: "محكمة الرياض التجارية",
        createdAt: "2024-03-15",
        updateDate: "2024-04-01",
        status: "نشطة",
        description: "نزاع تجاري بين شركتين حول عقد توريد",
        lawyers: [{ id: 1, name: "خالد العتيبي" }],
        nextSession: "2024-05-10",
        fees: {
          type: "fixed",
          amount: 5000,
          status: "pending"
        },
        notes: [
          { id: 1, content: "ملاحظة أولية حول القضية", date: "2024-03-15", author: "خالد العتيبي" },
          { id: 2, content: "تم إرسال الإشعارات للأطراف", date: "2024-03-20", author: "خالد العتيبي" }
        ],
      };
      setCaseData(caseData);

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
          location: "محكمة الرياض التجارية - قاع�� 5",
          status: "قادمة",
          notes: "يجب إحضار الشهود ��المستندات الإضافية",
        },
      ];
      setSessions(sessionData);

      const documentData: CaseDocument[] = [
        {
          id: 1,
          name: "عقد التوريد",
          type: "PDF",
          size: "2.5 MB",
          date: "2024-03-20",
          uploadDate: "2024-03-20",
          uploadedBy: "خالد العتيبي",
          url: "/documents/sample.pdf",
        },
        {
          id: 2,
          name: "محضر الاجتماع",
          type: "DOCX",
          size: "1.8 MB",
          date: "2024-03-22",
          uploadDate: "2024-03-22",
          uploadedBy: "سارة المطيري",
          url: "/documents/sample.docx",
        },
        {
          id: 3,
          name: "صور المستندات",
          type: "ZIP",
          size: "15.2 MB",
          date: "2024-03-25",
          uploadDate: "2024-03-25",
          uploadedBy: "خالد العتيبي",
          url: "/documents/sample.zip",
        },
      ];
      setDocuments(documentData);

      setLoading(false);
    }, 1000);
  }, [id]);

  const handleStatusChange = (newStatus: CaseStatus) => {
    setCaseData(prev => prev ? { ...prev, status: newStatus, updateDate: new Date().toISOString().substring(0, 10) } : null);
  };

  const handleAddNote = (note: string) => {
    setCaseData(prev => {
      if (!prev) return null;
      
      const newNote: CaseNote = {
        id: prev.notes?.length ? Math.max(...prev.notes.map(n => n.id)) + 1 : 1,
        content: note,
        date: new Date().toISOString().substring(0, 10),
        author: "المستخدم الحالي"
      };
      
      const updatedNotes = [...(prev.notes || []), newNote];
      return { ...prev, notes: updatedNotes, updateDate: new Date().toISOString().substring(0, 10) };
    });
  };

  const handleAttachFile = (files: FileList) => {
    const newDocuments: CaseDocument[] = Array.from(files).map((file, index) => ({
      id: documents.length + index + 1,
      name: file.name,
      type: file.name.split('.').pop()?.toUpperCase() || "UNKNOWN",
      size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
      date: new Date().toISOString().substring(0, 10),
      uploadDate: new Date().toISOString().substring(0, 10),
      uploadedBy: "المستخدم الحالي",
      url: URL.createObjectURL(file),
    }));
    
    setDocuments(prev => [...prev, ...newDocuments]);
    setCaseData(prev => prev ? { ...prev, updateDate: new Date().toISOString().substring(0, 10) } : null);
  };

  const handleAssignLawyer = (lawyerId: number, lawyerName: string) => {
    setCaseData(prev => {
      if (!prev) return null;
      return { 
        ...prev, 
        lawyers: [{ id: lawyerId, name: lawyerName }],
        updateDate: new Date().toISOString().substring(0, 10)
      };
    });
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
              {caseData?.title || `قضية رقم ${caseData?.caseNumber}`}
            </h1>
            <Badge className={`${statusColors[caseData?.status || 'نشطة']} text-white`}>
              {caseData?.status}
            </Badge>
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-slate-500">
            <span className="flex items-center">
              <FiTag className="ml-1 h-4 w-4" />
              {caseData?.type}
            </span>
            <span className="flex items-center">
              <FiCalendar className="ml-1 h-4 w-4" />
              {caseData?.createdAt && formatDate(caseData.createdAt)}
            </span>
            <span className="flex items-center">
              <FiUser className="ml-1 h-4 w-4" />
              {caseData?.clientName}
            </span>
          </div>
        </div>
        
        {caseData && (
          <CaseActionButtons 
            caseData={caseData}
            onEdit={() => navigate(`/cases/${id}/edit`)}
            onAddNote={() => setNoteDialogOpen(true)}
            onAttachFile={() => setFileDialogOpen(true)}
            onChangeStatus={() => setStatusDialogOpen(true)}
            onAssignLawyer={() => setLawyerDialogOpen(true)}
          />
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>تفاصيل القضية</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-slate-500 mb-1">
                  رقم القضية
                </h4>
                <div className="flex items-center">
                  <FiFileText className="ml-2 text-slate-400" />
                  <p className="font-medium">{caseData?.caseNumber}</p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-slate-500 mb-1">
                  العميل
                </h4>
                <div className="flex items-center">
                  <FiUser className="ml-2 text-slate-400" />
                  <p className="font-medium">{caseData?.clientName}</p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-slate-500 mb-1">
                  نوع القضية
                </h4>
                <div className="flex items-center">
                  <FiTag className="ml-2 text-slate-400" />
                  <p className="font-medium">{caseData?.type}</p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-slate-500 mb-1">
                  المحكمة
                </h4>
                <div className="flex items-center">
                  <FiMapPin className="ml-2 text-slate-400" />
                  <p className="font-medium">{caseData?.court}</p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-slate-500 mb-1">
                  تاريخ القضية
                </h4>
                <div className="flex items-center">
                  <FiCalendar className="ml-2 text-slate-400" />
                  <p className="font-medium">{caseData?.createdAt && formatDate(caseData.createdAt)}</p>
                </div>
              </div>

              {caseData?.updateDate && (
                <div>
                  <h4 className="text-sm font-medium text-slate-500 mb-1">
                    تاريخ آخر تحديث
                  </h4>
                  <div className="flex items-center">
                    <FiCalendar className="ml-2 text-slate-400" />
                    <p className="font-medium">{formatDate(caseData.updateDate)}</p>
                  </div>
                </div>
              )}

              {caseData?.nextSession && (
                <div>
                  <h4 className="text-sm font-medium text-slate-500 mb-1">
                    الجلسة القادمة
                  </h4>
                  <div className="flex items-center">
                    <FiClock className="ml-2 text-slate-400" />
                    <p className="font-medium">
                      {formatDate(caseData.nextSession)}
                    </p>
                  </div>
                </div>
              )}

              {caseData?.lawyers && caseData.lawyers.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-slate-500 mb-1">
                    المحامين المسؤولين
                  </h4>
                  <div className="space-y-2">
                    {caseData.lawyers.map(lawyer => (
                      <div key={lawyer.id} className="flex items-center">
                        <FiUser className="ml-2 text-slate-400" />
                        <p className="font-medium">{lawyer.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {caseData?.fees && (
                <div>
                  <h4 className="text-sm font-medium text-slate-500 mb-1">
                    الرسوم
                  </h4>
                  <div className="flex items-center">
                    <FiCreditCard className="ml-2 text-slate-400" />
                    <p className="font-medium">
                      {caseData.fees.type === 'fixed' 
                        ? `${caseData.fees.amount} ريال` 
                        : 'نسبة من قيمة القضية'}
                    </p>
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

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle>ملاحظات القضية</CardTitle>
              <Button 
                size="sm" 
                variant="ghost"
                onClick={() => setNoteDialogOpen(true)}
              >
                <FiPlus className="ml-2 h-4 w-4" />
                إضافة
              </Button>
            </CardHeader>
            <CardContent>
              {caseData?.notes && caseData.notes.length > 0 ? (
                <ul className="space-y-3">
                  {caseData.notes.map((note, index) => (
                    <li key={index} className="p-3 bg-slate-50 rounded-md">
                      {typeof note === 'string' ? note : note.content}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-center py-4">
                  <FiInfo className="mx-auto h-8 w-8 text-slate-300 mb-2" />
                  <p className="text-slate-500">لا توجد ملاحظات مسجلة</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Tabs defaultValue="sessions">
            <TabsList className="mb-4">
              <TabsTrigger value="sessions">الجلسات</TabsTrigger>
              <TabsTrigger value="documents">المستندات</TabsTrigger>
              <TabsTrigger value="timeline">جدول الزمني</TabsTrigger>
            </TabsList>

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
                            <FiEdit className="ml-2 h-4 w-4" />
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

            <TabsContent value="documents">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle>مستندات القضية</CardTitle>
                  <Button size="sm" onClick={() => setFileDialogOpen(true)}>
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
                                  onClick={() => {
                                    if (doc.url) {
                                      toast.info(`جاري تنزيل الملف: ${doc.name}`);
                                    }
                                  }}
                                >
                                  تنزيل
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-red-600"
                                  onClick={() => {
                                    setDocuments(prev => prev.filter(d => d.id !== doc.id));
                                    toast.success("تم حذف المستند بنجاح");
                                  }}
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

            <TabsContent value="timeline">
              <Card>
                <CardHeader>
                  <CardTitle>الجدول الزمني للقضية</CardTitle>
                  <CardDescription>
                    عرض جميع الأحداث والتحديثات المتعلقة بالقضية
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative pl-6 pb-1">
                    <div className="absolute top-0 bottom-0 right-2 w-0.5 bg-slate-200" />
                    
                    <div className="relative mb-8">
                      <div className="absolute right-0 -translate-x-[9px] -translate-y-1/4 w-5 h-5 rounded-full bg-primary border-4 border-white" />
                      <div className="pl-8 pr-6">
                        <div className="flex items-baseline mb-1">
                          <h4 className="text-sm font-semibold text-slate-800">
                            تم فتح القضية
                          </h4>
                          <time className="mr-auto text-xs text-slate-500">
                            {formatDate(caseData.createdAt)}
                          </time>
                        </div>
                        <p className="text-sm text-slate-600">
                          تم فتح القضية برقم {caseData.caseNumber} بواسطة {caseData.lawyers && caseData.lawyers.length > 0 ? caseData.lawyers[0].name : "المحامي المسؤول"}
                        </p>
                      </div>
                    </div>
                    
                    {caseData.updateDate && (
                      <div className="relative mb-8">
                        <div className="absolute right-0 -translate-x-[9px] -translate-y-1/4 w-5 h-5 rounded-full bg-amber-500 border-4 border-white" />
                        <div className="pl-8 pr-6">
                          <div className="flex items-baseline mb-1">
                            <h4 className="text-sm font-semibold text-slate-800">
                              تم تحديث القضية
                            </h4>
                            <time className="mr-auto text-xs text-slate-500">
                              {formatDate(caseData.updateDate)}
                            </time>
                          </div>
                          <p className="text-sm text-slate-600">
                            تم تحديث بيانات القضية بواسطة {caseData.lawyers && caseData.lawyers.length > 0 ? caseData.lawyers[0].name : "المحامي المسؤول"}
                          </p>
                        </div>
                      </div>
                    )}
                    
                    {sessions.map((session, index) => (
                      <div key={index} className="relative mb-8">
                        <div className={`absolute right-0 -translate-x-[9px] -translate-y-1/4 w-5 h-5 rounded-full ${
                          session.status === "قادمة" ? "bg-blue-500" : 
                          session.status === "قيد التنفيذ" ? "bg-amber-500" : 
                          "bg-emerald-500"} border-4 border-white`} />
                        <div className="pl-8 pr-6">
                          <div className="flex items-baseline mb-1">
                            <h4 className="text-sm font-semibold text-slate-800">
                              جلسة {session.status === "منتهية" ? "منتهية" : "مجدولة"}
                            </h4>
                            <time className="mr-auto text-xs text-slate-500">
                              {formatDate(session.date)}
                            </time>
                          </div>
                          <p className="text-sm text-slate-600">
                            {session.location} - {session.time}
                          </p>
                          <p className="text-xs text-slate-500 mt-1">
                            {session.notes}
                          </p>
                        </div>
                      </div>
                    ))}
                    
                    {caseData.status === "مغلقة" && (
                      <div className="relative mb-8">
                        <div className="absolute right-0 -translate-x-[9px] -translate-y-1/4 w-5 h-5 rounded-full bg-rose-500 border-4 border-white" />
                        <div className="pl-8 pr-6">
                          <div className="flex items-baseline mb-1">
                            <h4 className="text-sm font-semibold text-slate-800">
                              تم إغلاق القضية
                            </h4>
                            <time className="mr-auto text-xs text-slate-500">
                              {formatDate(caseData.closedDate || caseData.updateDate || "")}
                            </time>
                          </div>
                          <p className="text-sm text-slate-600">
                            تم إغلاق القضية بنجاح
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {caseData && (
        <>
          <CaseStatusDialog 
            open={statusDialogOpen}
            onOpenChange={setStatusDialogOpen}
            caseData={caseData}
            onStatusChange={handleStatusChange}
          />
          
          <CaseNoteDialog 
            open={noteDialogOpen}
            onOpenChange={setNoteDialogOpen}
            caseData={caseData}
            onAddNote={handleAddNote}
          />
          
          <CaseAttachmentDialog 
            open={fileDialogOpen}
            onOpenChange={setFileDialogOpen}
            caseData={caseData}
            onAttachFile={handleAttachFile}
          />
          
          <CaseLawyerDialog 
            open={lawyerDialogOpen}
            onOpenChange={setLawyerDialogOpen}
            caseData={caseData}
            onAssignLawyer={handleAssignLawyer}
          />
        </>
      )}
    </MainLayout>
  );
}
