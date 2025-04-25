
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/shared/components/ui/card";
import { FiCalendar } from "react-icons/fi";
import { Badge } from "@/shared/components/ui/badge";

const MOCK_EVENTS = [
  {
    id: 1,
    date: "16 أبريل",
    title: "جلسة محكمة - قضية النزاع العقاري",
    type: "جلسة"
  },
  {
    id: 2,
    date: "18 أبريل",
    title: "موعد مع العميل أحمد محمد",
    type: "اجتماع"
  },
  {
    id: 3,
    date: "20 أبريل",
    title: "تقديم الاستئناف - قضية C-2345",
    type: "موعد نهائي"
  },
  {
    id: 4,
    date: "23 أبريل",
    title: "جلسة استماع - المحكمة الإدارية",
    type: "جلسة"
  },
  {
    id: 5,
    date: "25 أبريل",
    title: "مراجعة عقد الشراكة - شركة المستقبل",
    type: "مهمة"
  }
];

const eventTypeClasses = {
  "جلسة": "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
  "اجتماع": "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  "موعد نهائي": "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
  "مهمة": "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
};

const UpcomingEvents = () => {
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <FiCalendar className="ml-2 text-primary" />
          الأحداث القادمة
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {MOCK_EVENTS.map((event) => (
            <div 
              key={event.id} 
              className="flex gap-3 hover:bg-accent/50 p-2 rounded-md transition-colors cursor-pointer"
            >
              <div className="w-16 shrink-0 text-center">
                <div className="bg-muted rounded px-1 py-2">
                  <span className="block text-sm text-muted-foreground">{event.date}</span>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h4 className="font-medium leading-tight">{event.title}</h4>
                </div>
                <div className="mt-1">
                  <Badge className={eventTypeClasses[event.type as keyof typeof eventTypeClasses]}>
                    {event.type}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingEvents;
