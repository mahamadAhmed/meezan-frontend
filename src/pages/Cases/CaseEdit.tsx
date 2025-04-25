
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import { CaseForm } from "@/components/cases/CaseForm";
import { Case } from "@/types/case";
import { toast } from "sonner";

export default function CaseEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [caseData, setCaseData] = useState<Case | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      // In a real app, this would be a fetch call to your API
      const mockCase: Case = {
        id: parseInt(id || "0"),
        caseNumber: "TX-2023-123",
        title: "قضية تعويض",
        clientName: "أحمد محمد",
        clientId: 101,
        type: "مدني",
        court: "محكمة الرياض",
        createdAt: "2023-05-15",
        status: "نشطة",
        description: "قضية تعويض عن أضرار",
        lawyers: [{ id: 1, name: "خالد المحامي" }],
        nextSession: "2023-06-20",
        fees: {
          type: "fixed",
          amount: 5000,
          status: "pending"
        }
      };
      setCaseData(mockCase);
      setLoading(false);
    }, 1000);
  }, [id]);

  const handleSubmit = (data: any) => {
    setSubmitting(true);
    // Simulate API call to update case
    setTimeout(() => {
      console.log("Updated case data:", data);
      toast.success("تم تحديث القضية بنجاح");
      setSubmitting(false);
      navigate(`/cases/${id}`);
    }, 1500);
  };

  const handleCancel = () => {
    navigate(`/cases/${id}`);
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin w-12 h-12 border-4 border-primary rounded-full border-t-transparent"></div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">تعديل القضية</h1>
        <p className="text-slate-500 mt-1">تعديل بيانات القضية رقم {caseData?.caseNumber}</p>
      </div>

      {caseData && (
        <CaseForm
          initialData={caseData}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isSubmitting={submitting}
        />
      )}
    </MainLayout>
  );
}
