
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { FiMoon } from "react-icons/fi";

export function OfficePerformance() {
  return (
    <Card className="border-0 shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <FiMoon className="ml-2 text-amber-500" /> 
          أداء المكتب
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[180px] flex items-center justify-center bg-slate-50 rounded-lg">
          <div className="space-y-4 w-full p-4">
            <div className="flex justify-between items-center">
              <span className="text-slate-600">معدل كسب القضايا</span>
              <span className="font-bold text-lg text-emerald-600">78%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-600">متوسط مدة القضية</span>
              <span className="font-bold text-lg text-amber-600">45 يوم</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-600">رضا العملاء</span>
              <span className="font-bold text-lg text-blue-600">92%</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default OfficePerformance;
