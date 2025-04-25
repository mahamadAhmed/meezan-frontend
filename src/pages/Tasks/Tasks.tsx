
import { useState } from "react";
import MainLayout from "@/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { FileUpload } from "@/components/ui/file-upload";
import { Calendar, Clock, FileText, Flag, User } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FiPlus, FiEdit, FiTrash2, FiCheckCircle, FiAlertTriangle } from "react-icons/fi";

interface Task {
  id: number;
  title: string;
  description: string;
  assignedTo: string;
  dueDate: string;
  priority: "low" | "medium" | "high";
  attachments: string[];
  status: "todo" | "inProgress" | "completed";
}

const Tasks = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { 
      id: 1, 
      title: "مراجعة العقود", 
      description: "مراجعة جميع العقود الجديدة والتأكد من مطابقتها للشروط القانونية.", 
      assignedTo: "أحمد محمد",
      dueDate: "2023-05-15",
      priority: "high",
      attachments: ["contract.pdf"],
      status: "todo" 
    },
    { 
      id: 2, 
      title: "إعداد مذكرة قانونية", 
      description: "إعداد مذكرة قانونية لعرضها على المحكمة في قضية موكلي.", 
      assignedTo: "سارة أحمد",
      dueDate: "2023-05-20",
      priority: "medium",
      attachments: [],
      status: "inProgress" 
    },
    { 
      id: 3, 
      title: "اجتماع مع العميل", 
      description: "ترتيب اجتماع مع العميل لمناقشة آخر التطورات في قضيته.", 
      assignedTo: "محمد العنزي",
      dueDate: "2023-05-10",
      priority: "low",
      attachments: ["meeting-notes.docx"],
      status: "completed" 
    },
  ]);
  
  const [isAddTaskDialogOpen, setIsAddTaskDialogOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [newTaskAssignedTo, setNewTaskAssignedTo] = useState("");
  const [newTaskDueDate, setNewTaskDueDate] = useState("");
  const [newTaskPriority, setNewTaskPriority] = useState<"low" | "medium" | "high">("medium");
  const [newTaskFiles, setNewTaskFiles] = useState<File[]>([]);
  
  const [editTaskId, setEditTaskId] = useState<number | null>(null);
  const [editedTaskTitle, setEditedTaskTitle] = useState("");
  const [editedTaskDescription, setEditedTaskDescription] = useState("");
  const [editedTaskAssignedTo, setEditedTaskAssignedTo] = useState("");
  const [editedTaskDueDate, setEditedTaskDueDate] = useState("");
  const [editedTaskPriority, setEditedTaskPriority] = useState<"low" | "medium" | "high">("medium");
  const [editedTaskFiles, setEditedTaskFiles] = useState<File[]>([]);

  const handleFileSelect = (fileList: FileList) => {
    setNewTaskFiles(Array.from(fileList));
  };

  const handleEditFileSelect = (fileList: FileList) => {
    setEditedTaskFiles(Array.from(fileList));
  };

  const handleAddTask = () => {
    if (newTaskTitle.trim() !== "") {
      const newTask: Task = {
        id: Date.now(),
        title: newTaskTitle,
        description: newTaskDescription,
        assignedTo: newTaskAssignedTo,
        dueDate: newTaskDueDate,
        priority: newTaskPriority,
        attachments: newTaskFiles.map(file => file.name),
        status: "todo",
      };
      setTasks([...tasks, newTask]);
      setNewTaskTitle("");
      setNewTaskDescription("");
      setNewTaskAssignedTo("");
      setNewTaskDueDate("");
      setNewTaskPriority("medium");
      setNewTaskFiles([]);
      setIsAddTaskDialogOpen(false);
      toast.success("تمت إضافة المهمة بنجاح!");
    } else {
      toast.error("عنوان المهمة مطلوب!");
    }
  };

  const handleEditTask = (task: Task) => {
    setEditTaskId(task.id);
    setEditedTaskTitle(task.title);
    setEditedTaskDescription(task.description);
    setEditedTaskAssignedTo(task.assignedTo);
    setEditedTaskDueDate(task.dueDate);
    setEditedTaskPriority(task.priority);
    setEditedTaskFiles([]);
  };

  const handleUpdateTask = () => {
    if (editedTaskTitle.trim() !== "") {
      const updatedTasks = tasks.map((task) =>
        task.id === editTaskId ? { 
          ...task, 
          title: editedTaskTitle, 
          description: editedTaskDescription,
          assignedTo: editedTaskAssignedTo,
          dueDate: editedTaskDueDate,
          priority: editedTaskPriority,
          attachments: editedTaskFiles.length > 0 
            ? editedTaskFiles.map(file => file.name) 
            : task.attachments
        } : task
      );
      setTasks(updatedTasks);
      setEditTaskId(null);
      setEditedTaskTitle("");
      setEditedTaskDescription("");
      setEditedTaskAssignedTo("");
      setEditedTaskDueDate("");
      setEditedTaskPriority("medium");
      setEditedTaskFiles([]);
      toast.success("تم تحديث المهمة بنجاح!");
    } else {
      toast.error("عنوان المهمة مطلوب!");
    }
  };

  const handleDeleteTask = (taskId: number) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
    toast.success("تم حذف المهمة بنجاح!");
  };

  const handleTaskStatusChange = (taskId: number, newStatus: Task["status"]) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);
  };

  const getPriorityColor = (priority: Task["priority"]) => {
    switch (priority) {
      case "high": return "text-red-500";
      case "medium": return "text-amber-500";
      case "low": return "text-green-500";
      default: return "text-gray-500";
    }
  };

  const getPriorityBg = (priority: Task["priority"]) => {
    switch (priority) {
      case "high": return "bg-red-50";
      case "medium": return "bg-amber-50";
      case "low": return "bg-green-50";
      default: return "bg-gray-50";
    }
  };

  const getPriorityText = (priority: Task["priority"]) => {
    switch (priority) {
      case "high": return "مرتفعة";
      case "medium": return "متوسطة";
      case "low": return "منخفضة";
      default: return "";
    }
  };

  return (
    <MainLayout>
      <div className="container mx-auto py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">المهام</h1>
            <p className="text-slate-500 mt-1">إدارة ومتابعة مهام العمل</p>
          </div>
          <Button onClick={() => setIsAddTaskDialogOpen(true)} className="bg-primary text-primary-foreground hover:bg-primary/90">
            <FiPlus className="ml-2 h-4 w-4" />
            إضافة مهمة جديدة
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* To Do */}
          <Card className="border border-slate-200 shadow-sm">
            <CardHeader className="bg-slate-50 pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <div className="h-6 w-1 bg-blue-500 rounded-full"></div>
                قائمة المهام
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 p-3">
              {tasks
                .filter((task) => task.status === "todo")
                .map((task) => (
                  <div key={task.id} className="p-3 rounded-md shadow-sm border border-slate-200 bg-white hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-sm font-semibold">{task.title}</h3>
                      <div className={`text-xs px-2 py-1 rounded-full font-medium ${getPriorityBg(task.priority)} ${getPriorityColor(task.priority)}`}>
                        {getPriorityText(task.priority)}
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 mb-2 line-clamp-2">{task.description}</p>
                    <div className="flex flex-col gap-1 text-xs text-slate-600 mb-3">
                      <div className="flex items-center gap-1.5">
                        <User className="h-3.5 w-3.5 text-indigo-500" />
                        <span>{task.assignedTo || "غير محدد"}</span>
                      </div>
                      {task.dueDate && (
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5 text-rose-500" />
                          <span>{task.dueDate}</span>
                        </div>
                      )}
                      {task.attachments.length > 0 && (
                        <div className="flex items-center gap-1.5">
                          <FileText className="h-3.5 w-3.5 text-emerald-500" />
                          <span>{task.attachments.length} مرفقات</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleTaskStatusChange(task.id, "inProgress")}
                        className="text-xs h-8 text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50"
                      >
                        <FiAlertTriangle className="h-3.5 w-3.5 ml-1.5" />
                        قيد التنفيذ
                      </Button>
                      <div className="flex gap-1">
                        <Button size="icon" variant="ghost" onClick={() => handleEditTask(task)} className="h-7 w-7 text-slate-600 hover:bg-slate-100"><FiEdit className="h-3.5 w-3.5" /></Button>
                        <Button size="icon" variant="ghost" onClick={() => handleDeleteTask(task.id)} className="h-7 w-7 text-rose-500 hover:bg-rose-50"><FiTrash2 className="h-3.5 w-3.5" /></Button>
                      </div>
                    </div>
                  </div>
                ))}
              {tasks.filter((task) => task.status === "todo").length === 0 && (
                <div className="py-8 text-center">
                  <p className="text-sm text-slate-500">لا توجد مهام في قائمة المهام</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* In Progress */}
          <Card className="border border-slate-200 shadow-sm">
            <CardHeader className="bg-amber-50 pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <div className="h-6 w-1 bg-amber-500 rounded-full"></div>
                قيد التنفيذ
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 p-3">
              {tasks
                .filter((task) => task.status === "inProgress")
                .map((task) => (
                  <div key={task.id} className="p-3 rounded-md shadow-sm border border-slate-200 bg-white hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-sm font-semibold">{task.title}</h3>
                      <div className={`text-xs px-2 py-1 rounded-full font-medium ${getPriorityBg(task.priority)} ${getPriorityColor(task.priority)}`}>
                        {getPriorityText(task.priority)}
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 mb-2 line-clamp-2">{task.description}</p>
                    <div className="flex flex-col gap-1 text-xs text-slate-600 mb-3">
                      <div className="flex items-center gap-1.5">
                        <User className="h-3.5 w-3.5 text-indigo-500" />
                        <span>{task.assignedTo || "غير محدد"}</span>
                      </div>
                      {task.dueDate && (
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5 text-rose-500" />
                          <span>{task.dueDate}</span>
                        </div>
                      )}
                      {task.attachments.length > 0 && (
                        <div className="flex items-center gap-1.5">
                          <FileText className="h-3.5 w-3.5 text-emerald-500" />
                          <span>{task.attachments.length} مرفقات</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleTaskStatusChange(task.id, "completed")}
                        className="text-xs h-8 text-green-600 hover:text-green-700 hover:bg-green-50"
                      >
                        <FiCheckCircle className="h-3.5 w-3.5 ml-1.5" />
                        اكتملت
                      </Button>
                      <div className="flex gap-1">
                        <Button size="icon" variant="ghost" onClick={() => handleEditTask(task)} className="h-7 w-7 text-slate-600 hover:bg-slate-100"><FiEdit className="h-3.5 w-3.5" /></Button>
                        <Button size="icon" variant="ghost" onClick={() => handleDeleteTask(task.id)} className="h-7 w-7 text-rose-500 hover:bg-rose-50"><FiTrash2 className="h-3.5 w-3.5" /></Button>
                      </div>
                    </div>
                  </div>
                ))}
              {tasks.filter((task) => task.status === "inProgress").length === 0 && (
                <div className="py-8 text-center">
                  <p className="text-sm text-slate-500">لا توجد مهام قيد التنفيذ</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Completed */}
          <Card className="border border-slate-200 shadow-sm">
            <CardHeader className="bg-green-50 pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <div className="h-6 w-1 bg-green-500 rounded-full"></div>
                مكتملة
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 p-3">
              {tasks
                .filter((task) => task.status === "completed")
                .map((task) => (
                  <div key={task.id} className="p-3 rounded-md shadow-sm border border-slate-200 bg-white hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-sm font-semibold">{task.title}</h3>
                      <div className={`text-xs px-2 py-1 rounded-full font-medium ${getPriorityBg(task.priority)} ${getPriorityColor(task.priority)}`}>
                        {getPriorityText(task.priority)}
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 mb-2 line-clamp-2">{task.description}</p>
                    <div className="flex flex-col gap-1 text-xs text-slate-600 mb-3">
                      <div className="flex items-center gap-1.5">
                        <User className="h-3.5 w-3.5 text-indigo-500" />
                        <span>{task.assignedTo || "غير محدد"}</span>
                      </div>
                      {task.dueDate && (
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5 text-rose-500" />
                          <span>{task.dueDate}</span>
                        </div>
                      )}
                      {task.attachments.length > 0 && (
                        <div className="flex items-center gap-1.5">
                          <FileText className="h-3.5 w-3.5 text-emerald-500" />
                          <span>{task.attachments.length} مرفقات</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center justify-end pt-2 border-t border-slate-100">
                      <Button size="icon" variant="ghost" onClick={() => handleDeleteTask(task.id)} className="h-7 w-7 text-rose-500 hover:bg-rose-50"><FiTrash2 className="h-3.5 w-3.5" /></Button>
                    </div>
                  </div>
                ))}
              {tasks.filter((task) => task.status === "completed").length === 0 && (
                <div className="py-8 text-center">
                  <p className="text-sm text-slate-500">لا توجد مهام مكتملة</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Add Task Dialog */}
        <Dialog open={isAddTaskDialogOpen} onOpenChange={setIsAddTaskDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>إضافة مهمة جديدة</DialogTitle>
              <DialogDescription>أدخل تفاصيل المهمة الجديدة</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">عنوان المهمة</Label>
                <Input 
                  id="title" 
                  value={newTaskTitle} 
                  onChange={(e) => setNewTaskTitle(e.target.value)} 
                  placeholder="أدخل عنوان المهمة" 
                  className="w-full"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">تفاصيل المهمة</Label>
                <Textarea 
                  id="description" 
                  value={newTaskDescription} 
                  onChange={(e) => setNewTaskDescription(e.target.value)} 
                  placeholder="أدخل وصف تفصيلي للمهمة" 
                  className="w-full min-h-[80px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="assignedTo">المهمة لـ</Label>
                <Input 
                  id="assignedTo" 
                  value={newTaskAssignedTo} 
                  onChange={(e) => setNewTaskAssignedTo(e.target.value)} 
                  placeholder="اسم الشخص المسؤول عن المهمة" 
                  className="w-full"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dueDate">موعد الاستحقاق</Label>
                  <Input 
                    id="dueDate" 
                    type="date" 
                    value={newTaskDueDate} 
                    onChange={(e) => setNewTaskDueDate(e.target.value)} 
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="priority">درجة الأهمية</Label>
                  <Select 
                    value={newTaskPriority} 
                    onValueChange={(value: any) => setNewTaskPriority(value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="اختر درجة الأهمية" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">منخفضة</SelectItem>
                      <SelectItem value="medium">متوسطة</SelectItem>
                      <SelectItem value="high">مرتفعة</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>المرفقات</Label>
                <FileUpload
                  onFileSelect={handleFileSelect}
                  label="إرفاق ملفات"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                />
                {newTaskFiles.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {newTaskFiles.map((file, index) => (
                      <div key={index} className="text-sm flex items-center gap-2 bg-slate-50 p-2 rounded">
                        <FileText className="h-4 w-4 text-indigo-500" />
                        <span className="text-xs">{file.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleAddTask} className="bg-primary text-primary-foreground hover:bg-primary/90">إضافة المهمة</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Task Dialog */}
        <Dialog open={editTaskId !== null} onOpenChange={() => setEditTaskId(null)}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>تعديل المهمة</DialogTitle>
              <DialogDescription>عدل تفاصيل المهمة</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edited-title">عنوان المهمة</Label>
                <Input 
                  id="edited-title" 
                  value={editedTaskTitle} 
                  onChange={(e) => setEditedTaskTitle(e.target.value)} 
                  placeholder="أدخل عنوان المهمة" 
                  className="w-full"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edited-description">تفاصيل المهمة</Label>
                <Textarea 
                  id="edited-description" 
                  value={editedTaskDescription} 
                  onChange={(e) => setEditedTaskDescription(e.target.value)} 
                  placeholder="أدخل وصف تفصيلي للمهمة" 
                  className="w-full min-h-[80px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edited-assignedTo">المهمة لـ</Label>
                <Input 
                  id="edited-assignedTo" 
                  value={editedTaskAssignedTo} 
                  onChange={(e) => setEditedTaskAssignedTo(e.target.value)} 
                  placeholder="اسم الشخص المسؤول عن المهمة" 
                  className="w-full"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edited-dueDate">موعد الاستحقاق</Label>
                  <Input 
                    id="edited-dueDate" 
                    type="date" 
                    value={editedTaskDueDate} 
                    onChange={(e) => setEditedTaskDueDate(e.target.value)} 
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edited-priority">درجة الأهمية</Label>
                  <Select 
                    value={editedTaskPriority} 
                    onValueChange={(value: any) => setEditedTaskPriority(value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="اختر درجة الأهمية" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">منخفضة</SelectItem>
                      <SelectItem value="medium">متوسطة</SelectItem>
                      <SelectItem value="high">مرتفعة</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>المرفقات</Label>
                <FileUpload
                  onFileSelect={handleEditFileSelect}
                  label="إرفاق ملفات"
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                />
                {editedTaskFiles.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {editedTaskFiles.map((file, index) => (
                      <div key={index} className="text-sm flex items-center gap-2 bg-slate-50 p-2 rounded">
                        <FileText className="h-4 w-4 text-indigo-500" />
                        <span className="text-xs">{file.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleUpdateTask} className="bg-primary text-primary-foreground hover:bg-primary/90">تحديث المهمة</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
};

export default Tasks;
