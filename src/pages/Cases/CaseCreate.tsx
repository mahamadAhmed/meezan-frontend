import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { FiArrowRight } from "react-icons/fi";
import { CaseForm } from "@/components/cases/CaseForm";
import { toast } from "sonner";
import { Case, CaseFee } from "@/types/case";

const CaseCreate = () => {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (data: any) => {
    setSubmitting(true);
    try {
      // Make sure fees object has status property
      if (data.fees) {
        // Ensure the fees object has the status property
        data.fees.status = "pending";
      }
      
      // Get existing cases from localStorage
      const existingCasesJSON = localStorage.getItem("cases");
      const existingCases: Case[] = existingCasesJSON ? JSON.parse(existingCasesJSON) : [];
      
      // Generate a new unique ID
      const maxId = existingCases.length > 0 
        ? Math.max(...existingCases.map(c => c.id)) 
        : 0;
      const newId = maxId + 1;
      
      // Create the new case object with the generated ID
      const newCase: Case = {
        ...data,
        id: newId,
      };
      
      // Update cases in localStorage
      const updatedCases = [...existingCases, newCase];
      localStorage.setItem("cases", JSON.stringify(updatedCases));
      
      // Add to financial transactions if there's a fee
      if (data.fees && (data.fees.amount || data.fees.percentage)) {
        // Get existing financial records
        const existingFinancialJSON = localStorage.getItem("financialRecords");
        const existingFinancial = existingFinancialJSON ? JSON.parse(existingFinancialJSON) : [];
        
        // Create new financial record
        const newFinancialRecord = {
          id: Date.now(), // Generate unique ID based on timestamp
          customerId: 1, // Default customer ID, would come from the form in a real app
          amount: data.fees.type === "fixed" ? data.fees.amount : 0,
          date: new Date().toISOString().split('T')[0],
          type: "فاتورة",
          description: `رسوم قضية: ${data.title}`,
          status: "معلقة", // Arabic for "pending"
          caseTitle: data.title,
          feeType: data.fees.type,
          percentage: data.fees.type === "percentage" ? data.fees.percentage : undefined,
          caseValue: data.fees.type === "percentage" ? data.fees.caseValue : undefined
        };
        
        // Save updated financial records
        const updatedFinancial = [...existingFinancial, newFinancialRecord];
        localStorage.setItem("financialRecords", JSON.stringify(updatedFinancial));
      }
      
      // Simulate API request delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success("تم إنشاء القضية بنجاح");
      navigate("/cases");
    } catch (error) {
      toast.error("حدث خطأ أثناء إنشاء القضية");
      console.error("Error creating case:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate("/cases");
  };

  return (
    <MainLayout>
      <div className="flex items-center gap-2 mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/cases")}
          className="text-slate-500 hover:text-primary"
        >
          <FiArrowRight className="w-5 h-5" />
        </Button>
        <h1 className="text-2xl font-bold text-slate-800">
          إضافة قضية جديدة
        </h1>
      </div>

      <CaseForm
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        isSubmitting={submitting}
      />
    </MainLayout>
  );
};

export default CaseCreate;
