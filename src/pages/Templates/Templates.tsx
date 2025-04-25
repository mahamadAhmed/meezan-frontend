
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import MainLayout from "@/layouts/MainLayout";
import { FiDownload, FiPlus, FiEdit, FiTrash2, FiFileText } from "react-icons/fi";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { FileUpload } from "@/components/ui/file-upload";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { Textarea } from "@/shared/components/ui/textarea";
import { toast } from "sonner";

interface Template {
  id: number;
  title: string;
  description: string;
  fileName: string;
  fileSize?: string;
  fileType?: string;
  attachments: string[];
  createdAt: string;
}

const Templates = () => {
  const [templates, setTemplates] = useState<Template[]>([
    {
      id: 1,
      title: "نموذج عقد بيع",
      description: "نموذج جاهز لعقد بيع مفصل.",
      fileName: "contract-template.docx",
      fileSize: "245 KB",
      fileType: "DOCX",
      attachments: ["contract-template.docx"],
      createdAt: "2023-05-10",
    },
    {
      id: 2,
      title: "نموذج توكيل رسمي",
      description: "نموذج لتوكيل رسمي يمكن استخدامه في مختلف المعاملات.",
      fileName: "power-of-attorney.pdf",
      fileSize: "180 KB",
      fileType: "PDF",
      attachments: ["power-of-attorney.pdf"],
      createdAt: "2023-05-15",
    },
    {
      id: 3,
      title: "نموذج إقرار استلام",
      description: "نموذج لإقرار استلام مبلغ أو مستند.",
      fileName: "receipt-template.docx",
      fileSize: "120 KB",
      fileType: "DOCX",
      attachments: ["receipt-template.docx"],
      createdAt: "2023-05-20",
    },
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newTemplateTitle, setNewTemplateTitle] = useState("");
  const [newTemplateDescription, setNewTemplateDescription] = useState("");
  const [newTemplateFiles, setNewTemplateFiles] = useState<File[]>([]);

  const handleFileSelect = (fileList: FileList) => {
    setNewTemplateFiles(Array.from(fileList));
  };

  const handleAddTemplate = () => {
    if (newTemplateTitle.trim() === "") {
      toast.error("يرجى إدخال عنوان القالب");
      return;
    }

    if (newTemplateFiles.length === 0) {
      toast.error("يرجى إرفاق ملف على الأقل");
      return;
    }

    const newTemplate: Template = {
      id: Date.now(),
      title: newTemplateTitle,
      description: newTemplateDescription,
      fileName: newTemplateFiles[0].name,
      fileSize: `${Math.round(newTemplateFiles[0].size / 1024)} KB`,
      fileType: newTemplateFiles[0].name.split('.').pop()?.toUpperCase() || "",
      attachments: newTemplateFiles.map(file => file.name),
      createdAt: new Date().toISOString().split('T')[0],
    };

    setTemplates([...templates, newTemplate]);
    setNewTemplateTitle("");
    setNewTemplateDescription("");
    setNewTemplateFiles([]);
    setIsAddDialogOpen(false);
    toast.success("تم إضافة القالب بنجاح");
  };

  const handleDeleteTemplate = (id: number) => {
    setTemplates(templates.filter(template => template.id !== id));
    toast.success("تم حذف القالب بنجاح");
  };

  const getFileIcon = (fileType?: string) => {
    if (!fileType) return <FiFileText />;
    
    switch (fileType.toLowerCase()) {
      case 'pdf':
        return <FiFileText className="text-red-500" />;
      case 'docx':
      case 'doc':
        return <FiFileText className="text-blue-500" />;
      default:
        return <FiFileText className="text-gray-500" />;
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">نماذج قانونية</h1>
            <p className="text-slate-500 mt-1">إدارة ومشاركة النماذج القانونية المختلفة</p>
          </div>
          <Button onClick={() => setIsAddDialogOpen(true)} className="bg-primary hover:bg-primary/90">
            <FiPlus className="ml-2 h-4 w-4" />
            إضافة قالب جديد
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
            <Card key={template.id} className="overflow-hidden hover:shadow-md transition-shadow duration-200 border border-slate-200">
              <CardHeader className="pb-4 bg-slate-50 flex flex-row items-start justify-between">
                <div>
                  <CardTitle className="font-bold text-lg text-slate-800">
                    {template.title}
                  </CardTitle>
                  <p className="text-sm text-slate-500 mt-1">{new Date(template.createdAt).toLocaleDateString("ar-SA")}</p>
                </div>
                <div className="flex items-center gap-2 text-slate-500">
                  {getFileIcon(template.fileType)}
                  <span className="text-xs">{template.fileType}</span>
                </div>
              </CardHeader>
              <CardContent className="p-5">
                <p className="text-slate-600 text-sm mb-4">{template.description}</p>
                
                <div className="flex items-center gap-2 text-sm text-slate-600 mb-4">
                  <FiFileText className="text-indigo-500" />
                  <span>{template.fileName}</span>
                  <span className="text-xs text-slate-400 ml-auto">{template.fileSize}</span>
                </div>
                
                <div className="flex items-center justify-between gap-3 mt-4 pt-3 border-t border-slate-100">
                  <Button variant="outline" size="sm" asChild className="flex-1">
                    <Link to="#" className="flex items-center justify-center">
                      <FiDownload className="mr-2 h-3.5 w-3.5" />
                      <span>تحميل</span>
                    </Link>
                  </Button>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <FiEdit className="h-4 w-4 text-slate-600" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleDeleteTemplate(template.id)}>
                      <FiTrash2 className="h-4 w-4 text-rose-500" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {templates.length === 0 && (
          <div className="text-center py-16 bg-slate-50 rounded-lg border border-dashed border-slate-200">
            <FiFileText className="mx-auto h-12 w-12 text-slate-300 mb-4" />
            <h3 className="text-xl font-medium text-slate-700 mb-2">لا توجد نماذج</h3>
            <p className="text-slate-500 mb-6">لم تقم بإضافة أي نماذج قانونية بعد</p>
            <Button onClick={() => setIsAddDialogOpen(true)}>
              <FiPlus className="ml-2 h-4 w-4" />
              إضافة قالب جديد
            </Button>
          </div>
        )}

        {/* Add Template Dialog */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>إضافة قالب جديد</DialogTitle>
              <DialogDescription>أدخل تفاصيل القالب الجديد</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="template-title">عنوان القالب</Label>
                <Input 
                  id="template-title" 
                  value={newTemplateTitle} 
                  onChange={(e) => setNewTemplateTitle(e.target.value)} 
                  placeholder="أدخل عنوان القالب"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="template-description">وصف القالب</Label>
                <Textarea 
                  id="template-description" 
                  value={newTemplateDescription} 
                  onChange={(e) => setNewTemplateDescription(e.target.value)} 
                  placeholder="أدخل وصف مختصر للقالب"
                  className="min-h-[80px]"
                />
              </div>

              <div className="space-y-2">
                <Label>المرفقات</Label>
                <FileUpload
                  onFileSelect={handleFileSelect}
                  label="إرفاق ملف القالب"
                  accept=".pdf,.doc,.docx"
                />
                {newTemplateFiles.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {newTemplateFiles.map((file, index) => (
                      <div key={index} className="text-sm flex items-center gap-2 bg-slate-50 p-2 rounded">
                        <FiFileText className="h-4 w-4 text-indigo-500" />
                        <span>{file.name}</span>
                        <span className="text-xs text-slate-400 ml-auto">{Math.round(file.size / 1024)} KB</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddTemplate} className="bg-primary hover:bg-primary/90">
                إضافة القالب
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
};

export default Templates;
