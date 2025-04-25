import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import SessionCard from "./components/SessionCard";
import { Session } from "@/types/case";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/shared/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SessionStatus } from "@/types/case";
import { SessionDetails } from "./components/SessionDetails";

const Sessions = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<SessionStatus | "all">("all");
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedSessions = localStorage.getItem("sessions");
    if (storedSessions) {
      setSessions(JSON.parse(storedSessions));
    } else {
      const mockSessions: Session[] = [
        {
          id: 1,
          title: "جلسة استماع أولية",
          date: "2023-05-15",
          time: "10:00 ص",
          clientName: "محمد علي",
          location: "المحكمة المركزية - قاعة 3أ",
          caseNumber: "124/2023",
          status: "قادمة",
          notes: "تحضير المستندات المطلوبة والوصول قبل الموعد بنصف ساعة"
        },
        {
          id: 2,
          title: "استجواب الشهود",
          date: "2023-05-18",
          time: "11:30 ص",
          clientName: "شركة الأمل التجارية",
          location: "المحكمة التجارية - قاعة 2ب",
          caseNumber: "89/2023",
          status: "قادمة",
          notes: "تجهيز قائمة الأسئلة للشهود"
        },
        {
          id: 3,
          title: "جلسة النطق بالحكم",
          date: "2023-05-10",
          time: "9:00 ص",
          clientName: "سارة أحمد",
          location: "محكمة الأحوال الشخصية - قاعة 1",
          caseNumber: "102/2023",
          status: "منتهية",
          notes: "تم الحكم لصالح العميل"
        }
      ];
      
      setSessions(mockSessions);
      localStorage.setItem("sessions", JSON.stringify(mockSessions));
    }
  }, []);

  const handleViewDetails = (sessionId: number) => {
    const session = sessions.find(s => s.id === sessionId);
    if (session) {
      setSelectedSession(session);
      setIsDetailsOpen(true);
    }
  };

  const handleAddSession = () => {
    navigate("/sessions/create");
  };

  const filteredSessions = sessions.filter(session => {
    const matchesSearch = 
      session.title.includes(searchQuery) ||
      session.clientName.includes(searchQuery) ||
      session.caseNumber?.includes(searchQuery) ||
      session.location.includes(searchQuery);
    
    const matchesStatus = statusFilter === "all" || session.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const upcomingSessions = filteredSessions.filter(session => session.status === "قادمة");
  const inProgressSessions = filteredSessions.filter(session => session.status === "قيد التنفيذ");
  const completedSessions = filteredSessions.filter(session => session.status === "منتهية");

  return (
    <MainLayout>
      <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
        <h1 className="text-2xl font-bold text-slate-800">الجلسات والمواعيد</h1>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder="بحث..."
              className="pr-10 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as SessionStatus | "all")}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="كل الحالات" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">كل الحالات</SelectItem>
              <SelectItem value="قادمة">قادمة</SelectItem>
              <SelectItem value="قيد التنفيذ">قيد التنفيذ</SelectItem>
              <SelectItem value="منتهية">منتهية</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={handleAddSession}>
            <Plus className="ml-2 h-4 w-4" /> إضافة جلسة
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="all">الكل ({filteredSessions.length})</TabsTrigger>
          <TabsTrigger value="upcoming">قادمة ({upcomingSessions.length})</TabsTrigger>
          <TabsTrigger value="inProgress">قيد التنفيذ ({inProgressSessions.length})</TabsTrigger>
          <TabsTrigger value="completed">منتهية ({completedSessions.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          {filteredSessions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredSessions.map(session => (
                <SessionCard
                  key={session.id}
                  session={session}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="pt-6 text-center">
                <p className="text-slate-500">لا توجد جلسات مطابقة لمعايير البحث</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="upcoming">
          {upcomingSessions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {upcomingSessions.map(session => (
                <SessionCard
                  key={session.id}
                  session={session}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="pt-6 text-center">
                <p className="text-slate-500">لا توجد جلسات قادمة</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="inProgress">
          {inProgressSessions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {inProgressSessions.map(session => (
                <SessionCard
                  key={session.id}
                  session={session}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="pt-6 text-center">
                <p className="text-slate-500">لا توجد جلسات قيد التنفيذ</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="completed">
          {completedSessions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {completedSessions.map(session => (
                <SessionCard
                  key={session.id}
                  session={session}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="pt-6 text-center">
                <p className="text-slate-500">لا توجد جلسات منتهية</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      <SessionDetails
        session={selectedSession}
        open={isDetailsOpen}
        onOpenChange={setIsDetailsOpen}
      />
    </MainLayout>
  );
};

export default Sessions;
