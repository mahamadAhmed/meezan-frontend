
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/shared/components/ui/card";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { FiFileText, FiUser, FiClock, FiMapPin } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const MOCK_CASES = [
  {
    id: "C-12345",
    title: "شركة الإنماء ضد شركة الإعمار",
    status: "جارية",
    client: "شركة الإنماء",
    type: "تجاري",
    updatedAt: "منذ 2 ساعة",
    court: "المحكمة التجارية بالرياض",
  },
  {
    id: "C-12346",
    title: "نزاع عقاري - محمد أحمد",
    status: "معلقة",
    client: "محمد أحمد",
    type: "عقاري",
    updatedAt: "منذ 3 أيام",
    court: "محكمة الاستئناف الإدارية",
  },
  {
    id: "C-12347",
    title: "قضية عمالية - شركة المستقبل",
    status: "جارية",
    client: "شركة المستقبل",
    type: "عمالي",
    updatedAt: "منذ يوم",
    court: "المحكمة العمالية",
  }
];

const statusClasses = {
  "جارية": "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  "معلقة": "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
  "مغلقة": "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
  "محكومة": "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
};

const typeClasses = {
  "تجاري": "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
  "عقاري": "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  "عمالي": "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
  "جنائي": "bg-slate-100 text-slate-800 dark:bg-slate-900/30 dark:text-slate-300",
  "مدني": "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
};

const RecentCases = () => {
  const navigate = useNavigate();
  
  const handleCaseClick = (caseId: string) => {
    navigate(`/cases/${caseId}`);
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg flex items-center">
            <FiFileText className="ml-2 text-primary" />
            أحدث القضايا
          </CardTitle>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8"
            onClick={() => navigate('/cases')}
          >
            عرض الكل
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {MOCK_CASES.length > 0 ? (
          <div className="space-y-4">
            {MOCK_CASES.map((caseItem) => (
              <div 
                key={caseItem.id} 
                className="p-4 border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer"
                onClick={() => handleCaseClick(caseItem.id)}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold">{caseItem.title}</h3>
                    <div className="text-sm text-muted-foreground mt-1">
                      {caseItem.id}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Badge className={statusClasses[caseItem.status as keyof typeof statusClasses]}>
                      {caseItem.status}
                    </Badge>
                    <Badge className={typeClasses[caseItem.type as keyof typeof typeClasses]}>
                      {caseItem.type}
                    </Badge>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-muted-foreground mt-3">
                  <div className="flex items-center">
                    <FiUser className="ml-2 h-4 w-4" />
                    {caseItem.client}
                  </div>
                  <div className="flex items-center">
                    <FiClock className="ml-2 h-4 w-4" />
                    {caseItem.updatedAt}
                  </div>
                  <div className="flex items-center">
                    <FiMapPin className="ml-2 h-4 w-4" />
                    {caseItem.court}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">لا توجد قضايا حالية</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentCases;
