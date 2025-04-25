
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { CustomerForm, CustomerFormValues } from "./components/CustomerForm";
import { toast } from "sonner";
import { Customer } from "@/types/customer";

const CustomerCreate = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleCreateCustomer = (data: CustomerFormValues & { attachments?: (File | string)[] }) => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      try {
        // Get existing customers
        const existingCustomersJSON = localStorage.getItem("customers");
        const existingCustomers: Customer[] = existingCustomersJSON 
          ? JSON.parse(existingCustomersJSON) 
          : [];
        
        // Create new customer with generated ID
        const newCustomer: Customer = {
          id: existingCustomers.length > 0 
            ? Math.max(...existingCustomers.map(c => typeof c.id === 'number' ? c.id : 0)) + 1 
            : 1,
          name: data.name,
          phone: data.phone,
          address: data.address,
          type: data.type as any,
          status: data.status as any,
          notes: data.notes || "",
          joinDate: data.joinDate,
          attachments: data.attachments 
            ? data.attachments.map(attachment => 
                typeof attachment === 'string' 
                  ? attachment 
                  : URL.createObjectURL(attachment))
            : []
        };
        
        // Save to localStorage
        const updatedCustomers = [...existingCustomers, newCustomer];
        localStorage.setItem("customers", JSON.stringify(updatedCustomers));
        
        toast.success("تم إضافة العميل بنجاح");
        navigate("/customers");
      } catch (error) {
        console.error("Error creating customer:", error);
        toast.error("حدث خطأ أثناء إضافة العميل");
      } finally {
        setIsSubmitting(false);
      }
    }, 600);
  };

  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">إضافة عميل جديد</h1>
      </div>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>معلومات العميل</CardTitle>
        </CardHeader>
        <CardContent>
          <CustomerForm onSubmit={handleCreateCustomer} isLoading={isSubmitting} />
        </CardContent>
      </Card>
    </MainLayout>
  );
};

export default CustomerCreate;
