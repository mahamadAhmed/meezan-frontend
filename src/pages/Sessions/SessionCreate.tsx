
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import SessionForm, { SessionFormValues } from "./components/SessionForm";
import { toast } from "sonner";
import { Session, Case } from "@/types/case";

const SessionCreate = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cases, setCases] = useState<Case[]>([]);
  const navigate = useNavigate();

  // Load cases from localStorage
  useEffect(() => {
    const storedCases = localStorage.getItem("cases");
    if (storedCases) {
      setCases(JSON.parse(storedCases));
    } else {
      // Sample data if no cases exist
      const sampleCases: Case[] = [
        {
          id: 1,
          caseNumber: "C12345",
          title: "قضية عقارية",
          type: "قضية عقارية",
          court: "المحكمة المركزية",
          clientName: "أحمد محمد",
          clientId: 1,
          description: "نزاع على ملكية أرض",
          status: "نشطة", // Changed from "قيد النظر" to "نشطة" which is an allowed CaseStatus
          createdAt: "2023-01-15",
          nextSession: null,
          lawyers: []
        },
        {
          id: 2,
          caseNumber: "C67890",
          title: "قضية تجارية",
          type: "قضية تجارية",
          court: "المحكمة التجارية",
          clientName: "شركة الأمل",
          clientId: 2,
          description: "نزاع على عقد توريد",
          status: "نشطة", // Changed from "قيد النظر" to "نشطة" which is an allowed CaseStatus
          createdAt: "2023-02-20",
          nextSession: null,
          lawyers: []
        }
      ];
      setCases(sampleCases);
      localStorage.setItem("cases", JSON.stringify(sampleCases));
    }
  }, []);

  const handleCreateSession = (data: SessionFormValues) => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      try {
        // Get existing sessions
        const existingSessionsJSON = localStorage.getItem("sessions");
        const existingSessions: Session[] = existingSessionsJSON 
          ? JSON.parse(existingSessionsJSON) 
          : [];
        
        // Find case to get client name
        const relatedCase = cases.find(c => c.caseNumber === data.caseId);
        
        // Create new session with generated ID
        const newSession: Session = {
          id: existingSessions.length > 0 
            ? Math.max(...existingSessions.map(s => typeof s.id === 'number' ? s.id : 0)) + 1 
            : 1,
          title: data.title,
          date: typeof data.date === 'object' ? data.date.toISOString().split('T')[0] : data.date,
          time: data.time,
          location: data.location,
          caseNumber: data.caseId,
          clientName: relatedCase?.clientName || "",
          status: data.status,
          notes: data.notes || ""
        };
        
        // Save to localStorage
        const updatedSessions = [...existingSessions, newSession];
        localStorage.setItem("sessions", JSON.stringify(updatedSessions));
        
        toast.success("تمت إضافة الجلسة بنجاح");
        navigate("/sessions");
      } catch (error) {
        console.error("Error creating session:", error);
        toast.error("حدث خطأ أثناء إضافة الجلسة");
      } finally {
        setIsSubmitting(false);
      }
    }, 600);
  };

  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">إضافة جلسة جديدة</h1>
      </div>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>معلومات الجلسة</CardTitle>
        </CardHeader>
        <CardContent>
          <SessionForm onSubmit={handleCreateSession} isSubmitting={isSubmitting} cases={cases} />
        </CardContent>
      </Card>
    </MainLayout>
  );
};

export default SessionCreate;
