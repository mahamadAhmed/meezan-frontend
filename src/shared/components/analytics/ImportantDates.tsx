
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { FiCalendar } from "react-icons/fi";
import { Badge } from "@/shared/components/ui/badge";

const ImportantDates = () => {
  const importantDates = [
    {
      id: 1,
      date: "10 مايو 2025",
      title: "الموعد النهائي لتقديم الاستئناف",
      type: "موعد نهائي",
      caseNumber: "C-1234"
    },
    {
      id: 2,
      date: "15 مايو 2025",
      title: "انتهاء مدة العقد",
      type: "موعد نهائي",
      caseNumber: "C-5689"
    },
    {
      id: 3,
      date: "20 مايو 2025",
      title: "جلسة النطق بالحكم",
      type: "جلسة",
      caseNumber: "C-2342"
    },
    {
      id: 4,
      date: "1 يونيو 2025",
      title: "آخر موعد لتقديم المستندات",
      type: "موعد نهائي",
      caseNumber: "C-8976"
    }
  ];

  const typeClasses = {
    "موعد نهائي": "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
    "جلسة": "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300"
  };

  return (
    <Card className="border-0 shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <FiCalendar className="ml-2 text-primary" />
          تواريخ مهمة
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {importantDates.map((item) => (
            <div 
              key={item.id} 
              className="p-3 border rounded-lg hover:bg-accent/50 cursor-pointer transition-colors"
            >
              <div className="flex justify-between items-start mb-1">
                <h4 className="font-medium text-sm">{item.title}</h4>
                <Badge className={typeClasses[item.type as keyof typeof typeClasses]}>
                  {item.type}
                </Badge>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{item.date}</span>
                <span>رقم القضية: {item.caseNumber}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ImportantDates;
