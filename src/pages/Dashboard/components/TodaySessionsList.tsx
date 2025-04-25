
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/shared/components/ui/card";
import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { FiCalendar, FiClock, FiMapPin, FiUser, FiFileText } from "react-icons/fi";

const MOCK_SESSIONS = [
  {
    id: 1,
    caseNumber: "C-12345",
    title: "شركة الإنماء ضد شركة الإعمار",
    time: "10:30 صباحاً",
    court: "المحكمة التجارية بالرياض",
    client: "شركة الإنماء",
    status: "قادمة"
  },
  {
    id: 2,
    caseNumber: "C-12348",
    title: "النزاع العقاري - عبدالله محمد",
    time: "1:15 مساءً",
    court: "محكمة الاستئناف الإدارية",
    client: "عبدالله محمد",
    status: "ملغاة"
  },
  {
    id: 3,
    caseNumber: "C-12350",
    title: "قضية العمل - شركة المستقبل",
    time: "3:30 مساءً",
    court: "المحكمة العمالية",
    client: "شركة المستقبل",
    status: "قادمة"
  }
];

const statusClasses = {
  "قادمة": "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  "منتهية": "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
  "ملغاة": "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
  "مؤجلة": "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
};

const TodaySessionsList = () => {
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg flex items-center">
            <FiCalendar className="ml-2 text-primary" />
            جلسات اليوم
          </CardTitle>
          <Button variant="ghost" size="sm" className="h-8">
            عرض الكل
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {MOCK_SESSIONS.length > 0 ? (
          <div className="space-y-4">
            {MOCK_SESSIONS.map((session) => (
              <div 
                key={session.id} 
                className="p-4 border rounded-lg hover:bg-accent/50 transition-colors cursor-pointer"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold">{session.title}</h3>
                  <Badge className={statusClasses[session.status as keyof typeof statusClasses]}>
                    {session.status}
                  </Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <FiClock className="ml-2 h-4 w-4" />
                    {session.time}
                  </div>
                  <div className="flex items-center">
                    <FiMapPin className="ml-2 h-4 w-4" />
                    {session.court}
                  </div>
                  <div className="flex items-center">
                    <FiUser className="ml-2 h-4 w-4" />
                    {session.client}
                  </div>
                  <div className="flex items-center">
                    <FiFileText className="ml-2 h-4 w-4" />
                    {session.caseNumber}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">لا توجد جلسات مجدولة لهذا اليوم</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TodaySessionsList;
