
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { FiBarChart2 } from "react-icons/fi";

const data = [
  { name: "يناير", قضايا: 12 },
  { name: "فبراير", قضايا: 15 },
  { name: "مارس", قضايا: 8 },
  { name: "أبريل", قضايا: 20 },
  { name: "مايو", قضايا: 14 },
  { name: "يونيو", قضايا: 10 },
];

const CaseStatistics = () => {
  return (
    <Card className="border-0 shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center">
          <FiBarChart2 className="ml-2 text-primary" />
          إحصائيات القضايا
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-60">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                contentStyle={{
                  backgroundColor: "var(--background)",
                  border: "1px solid var(--border)",
                  borderRadius: "0.5rem",
                  direction: "rtl",
                }}
                itemStyle={{ direction: "rtl", textAlign: "right" }}
                labelStyle={{ direction: "rtl", textAlign: "right" }}
              />
              <Bar dataKey="قضايا" fill="var(--primary)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default CaseStatistics;
