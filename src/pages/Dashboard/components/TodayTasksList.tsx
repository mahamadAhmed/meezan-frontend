
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/shared/components/ui/card";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { FiClipboard, FiClock, FiUser } from "react-icons/fi";
import { useState } from "react";

const MOCK_TASKS = [
  { 
    id: 1, 
    title: "تحضير مستندات القضية رقم C-1234", 
    priority: "عالية", 
    assignedTo: "أحمد محمد",
    dueAt: "10:00 صباحاً",
    completed: false 
  },
  { 
    id: 2, 
    title: "الاتصال بالعميل لتأكيد موعد الجلسة", 
    priority: "متوسطة", 
    assignedTo: "سارة خالد",
    dueAt: "12:30 ظهراً",
    completed: false 
  },
  { 
    id: 3, 
    title: "مراجعة العقد النهائي", 
    priority: "عالية", 
    assignedTo: "محمد علي",
    dueAt: "2:00 مساءً",
    completed: false 
  },
  { 
    id: 4, 
    title: "تحديث حالة القضية في النظام", 
    priority: "منخفضة", 
    assignedTo: "فاطمة أحمد",
    dueAt: "3:30 مساءً",
    completed: false 
  }
];

const priorityClasses = {
  "عالية": "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
  "متوسطة": "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
  "منخفضة": "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
};

const TodayTasksList = () => {
  const [tasks, setTasks] = useState(MOCK_TASKS);
  
  const toggleTaskStatus = (taskId: number) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId 
          ? { ...task, completed: !task.completed } 
          : task
      )
    );
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg flex items-center">
            <FiClipboard className="ml-2 text-primary" />
            المهام لليوم
          </CardTitle>
          <Button variant="ghost" size="sm" className="h-8">
            عرض الكل
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {tasks.length > 0 ? (
          <div className="space-y-3">
            {tasks.map((task) => (
              <div 
                key={task.id} 
                className={`p-3 border rounded-lg transition-colors ${task.completed ? 'bg-muted' : 'hover:bg-accent/50'}`}
              >
                <div className="flex items-start gap-3">
                  <Checkbox 
                    id={`task-${task.id}`} 
                    checked={task.completed}
                    onCheckedChange={() => toggleTaskStatus(task.id)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <label 
                        htmlFor={`task-${task.id}`} 
                        className={`font-medium cursor-pointer ${task.completed ? 'line-through text-muted-foreground' : ''}`}
                      >
                        {task.title}
                      </label>
                      <Badge className={priorityClasses[task.priority as keyof typeof priorityClasses]}>
                        {task.priority}
                      </Badge>
                    </div>
                    <div className="mt-2 flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <FiUser className="ml-1 h-3 w-3" />
                        {task.assignedTo}
                      </div>
                      <div className="flex items-center">
                        <FiClock className="ml-1 h-3 w-3" />
                        {task.dueAt}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">لا توجد مهام مستحقة لهذا اليوم</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TodayTasksList;
