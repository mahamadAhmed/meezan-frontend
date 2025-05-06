
import { useState, useEffect } from "react";
import MainLayout from "@/layouts/MainLayout";
import StatCard from "@/pages/Dashboard/components/StatCard";
import TodaySessionsList from "@/pages/Dashboard/components/TodaySessionsList";
import TodayTasksList from "@/pages/Dashboard/components/TodayTasksList";
import QuickActions from "@/pages/Dashboard/components/QuickActions";
import UpcomingEvents from "@/pages/Dashboard/components/UpcomingEvents";
import RecentCases from "@/shared/components/cases/RecentCases";
import ChatBot from "@/features/chat/components/ChatBot";
import { formatGregorianDate, formatHijriDate } from "@/shared/utils/dateUtils";
import { dashboardStats } from "@/shared/utils/constants";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { FiFileText } from "react-icons/fi";
import { MessageSquare } from "lucide-react";

// Define case stats data
const caseStats = [
  { id: 1, label: "القضايا الجارية", value: "42", icon: FiFileText, color: "bg-green-500 text-green-50" },
  { id: 2, label: "القضايا المكتملة", value: "28", icon: FiFileText, color: "bg-blue-500 text-blue-50" },
  { id: 3, label: "قضايا معلقة", value: "7", icon: FiFileText, color: "bg-amber-500 text-amber-50" },
  { id: 4, label: "قضايا جديدة", value: "15", icon: FiFileText, color: "bg-purple-500 text-purple-50" }
];

const Dashboard = () => {
  const [showChatBot, setShowChatBot] = useState(false);
  const gregorianDate = formatGregorianDate(new Date());
  const hijriDate = formatHijriDate();

  return (
    <MainLayout>
      {/* Date Section */}
      <div className="mb-8 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-6 rounded-xl shadow-sm">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
          <div className="text-xl md:text-2xl font-bold text-slate-800 dark:text-slate-200">
            {gregorianDate}
          </div>

        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {dashboardStats.map((stat, index) => (
          <StatCard
            key={index}
            label={stat.label}
            value={stat.value}
            color={stat.color as any}
            icon={stat.icon}
            route={stat.route}
          />
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <QuickActions />
      </div>

      {/* Case Statistics */}
      <div className="mb-8">
        <Card className="border border-border/40 shadow-md overflow-hidden">
          <CardHeader className="pb-2 bg-muted/50">
            <CardTitle className="text-lg flex items-center gap-2">
              <FiFileText className="ml-2 text-primary" />
              إحصائيات القضايا
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {caseStats.map((stat) => (
                <div key={stat.id} className="p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                  <div className="flex items-center">
                    <div className={`mr-4 p-3 rounded-full ${stat.color.split(' ')[0]}`}>
                      <stat.icon className={`h-5 w-5 ${stat.color.split(' ').slice(1).join(' ')}`} />
                    </div>
                    <div className="mr-3">
                      <p className="text-sm font-medium text-muted-foreground mb-1">{stat.label}</p>
                      <p className="text-xl font-bold">{stat.value}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Today's Sessions and Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <TodaySessionsList />
        </div>
        <div>
          <TodayTasksList />
        </div>
      </div>

      {/* Upcoming Events & Recent Cases */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <UpcomingEvents />
        </div>
        <div className="lg:col-span-2">
          <RecentCases />
        </div>
      </div>

      {/* ChatBot Toggle & Display */}
      {!showChatBot && (
        <button
          onClick={() => setShowChatBot(true)}
          className="fixed bottom-6 left-6 rounded-full w-14 h-14 shadow-lg bg-primary hover:bg-primary/90 flex items-center justify-center text-white"
        >
          <MessageSquare className="h-6 w-6" />
        </button>
      )}

      {showChatBot && (
        <ChatBot fullWidth={true} onClose={() => setShowChatBot(false)} />
      )}

    </MainLayout>
  );
};

export default Dashboard;
