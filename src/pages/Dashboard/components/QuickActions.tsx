
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Link } from "react-router-dom";
import { FiPlus, FiUserPlus, FiFileText, FiCalendar, FiClipboard } from "react-icons/fi";

const QuickActions = () => {
  const actions = [
    {
      title: "إضافة عميل",
      description: "إضافة عميل جديد للنظام",
      icon: FiUserPlus,
      path: "/customers/create",
      color: "bg-blue-500 hover:bg-blue-600",
    },
    {
      title: "إنشاء قضية",
      description: "تسجيل قضية جديدة",
      icon: FiFileText,
      path: "/cases/create",
      color: "bg-green-500 hover:bg-green-600",
    },
    {
      title: "جدولة جلسة",
      description: "إضافة موعد جلسة",
      icon: FiCalendar,
      path: "/sessions/create",
      color: "bg-purple-500 hover:bg-purple-600",
    },
    {
      title: "إنشاء مهمة",
      description: "إضافة مهمة جديدة",
      icon: FiClipboard,
      path: "/tasks/create",
      color: "bg-amber-500 hover:bg-amber-600",
    },
  ];

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <FiPlus className="ml-2 text-primary" />
          إجراءات سريعة
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {actions.map((action, index) => (
            <Link to={action.path} key={index} className="block">
              <Button 
                variant="default" 
                className={`w-full h-full min-h-24 flex flex-col items-center justify-center gap-2 p-4 text-white ${action.color}`}
              >
                <action.icon className="h-6 w-6" />
                <div className="text-center">
                  <h3 className="font-medium">{action.title}</h3>
                  <p className="text-xs mt-1 opacity-90">{action.description}</p>
                </div>
              </Button>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
