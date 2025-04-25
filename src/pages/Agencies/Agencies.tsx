import React, { useState, useEffect } from "react";
import MainLayout from "@/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, X } from "lucide-react";
import { Card } from "@/shared/components/ui/card";
import { AgencyCard } from "./components/AgencyCard";
import { AgencyDetailsDialog } from "./components/AgencyDetailsDialog";
import { AgencyFormDialog } from "./components/AgencyFormDialog";
import { Agency, AgencyFormValues } from "./types/agency";
import { toast } from "sonner";

export const Agencies = () => {
  const [agencies, setAgencies] = useState<Agency[]>([
    {
      id: 1,
      title: "توكيل خاص",
      clientName: "أحمد محمد",
      description: "توكيل خاص لإدارة حساب بنكي.",
      attachments: ["banking_authorization.pdf"],
      createdAt: "2023-05-01",
      status: "سارية",
      agencyNumber: "AGN-001",
      agentName: "محمد عبدالله",
      issueDate: "2023-05-01",
      expiryDate: "2024-05-01",
    },
    {
      id: 2,
      title: "توكيل عام",
      clientName: "شركة النور",
      description: "توكيل عام لإدارة جميع أعمال الشركة.",
      attachments: ["general_power_of_attorney.docx"],
      createdAt: "2023-05-05",
      status: "سارية",
      agencyNumber: "AGN-002",
      agentName: "خالد العمري",
      issueDate: "2023-05-05",
      expiryDate: "2025-05-05",
    },
    {
      id: 3,
      title: "توكيل عقاري",
      clientName: "خالد ابراهيم",
      description: "توكيل عقاري لبيع وشراء العقارات.",
      attachments: ["real_estate_authorization.pdf"],
      createdAt: "2023-05-10",
      status: "منتهية",
      agencyNumber: "AGN-003",
      agentName: "عبدالرحمن محمد",
      issueDate: "2023-05-10",
      expiryDate: "2023-11-10",
    },
  ]);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAgency, setSelectedAgency] = useState<Agency | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = (id: number) => {
    setAgencies(agencies.filter(agency => agency.id !== id));
  };

  const handleEdit = (agency: Agency) => {
    setSelectedAgency(agency);
    setIsEditDialogOpen(true);
  };

  const handleView = (agency: Agency) => {
    setSelectedAgency(agency);
  };

  const handleAddAgency = (data: AgencyFormValues) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const newAgency: Agency = {
        id: agencies.length + 1,
        title: data.title,
        clientName: data.clientName,
        description: data.description,
        status: data.status,
        agencyNumber: data.agencyNumber || `AGN-${(agencies.length + 1).toString().padStart(3, '0')}`,
        agentName: data.agentName,
        issueDate: data.issueDate ? data.issueDate.toISOString().split('T')[0] : "",
        expiryDate: data.expiryDate ? data.expiryDate.toISOString().split('T')[0] : "",
        details: data.details,
        createdAt: new Date().toISOString().split('T')[0],
        attachments: data.attachments ? data.attachments.map(file => file.name) : [],
      };
      
      setAgencies([...agencies, newAgency]);
      setIsAddDialogOpen(false);
      setIsLoading(false);
      toast.success("تم إضافة الوكالة بنجاح");
    }, 1000);
  };

  const handleUpdateAgency = (data: AgencyFormValues) => {
    if (!selectedAgency) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const updatedAgencies = agencies.map(agency => {
        if (agency.id === selectedAgency.id) {
          return {
            ...agency,
            title: data.title,
            clientName: data.clientName,
            description: data.description,
            status: data.status,
            agencyNumber: data.agencyNumber || agency.agencyNumber,
            agentName: data.agentName,
            issueDate: data.issueDate ? data.issueDate.toISOString().split('T')[0] : agency.issueDate,
            expiryDate: data.expiryDate ? data.expiryDate.toISOString().split('T')[0] : agency.expiryDate,
            details: data.details,
            // Keep the original attachments and add new ones
            attachments: [
              ...agency.attachments,
              ...(data.attachments ? data.attachments.map(file => file.name) : [])
            ],
          };
        }
        return agency;
      });
      
      setAgencies(updatedAgencies);
      setIsEditDialogOpen(false);
      setSelectedAgency(null);
      setIsLoading(false);
      toast.success("تم تحديث الوكالة بنجاح");
    }, 1000);
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  const filteredAgencies = agencies.filter(agency => 
    agency.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    agency.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    agency.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (agency.agentName && agency.agentName.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (agency.agencyNumber && agency.agencyNumber.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <MainLayout>
      <div className="container mx-auto py-6">
        <Card className="bg-white shadow-sm border-slate-200">
          <div className="p-6">
            <div className="flex flex-col md:flex-row items-center justify-between mb-6 gap-4">
              <h1 className="text-2xl font-bold text-slate-800">الوكالات</h1>
              <div className="flex items-center gap-2 w-full md:w-auto">
                <div className="relative flex-1 md:w-64">
                  <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <Input
                    placeholder="بحث في الوكالات..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pr-10"
                  />
                  {searchQuery && (
                    <button 
                      onClick={clearSearch}
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
                <Button onClick={() => setIsAddDialogOpen(true)} className="shrink-0">
                  <Plus className="ml-2 h-4 w-4" />
                  إضافة وكالة
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAgencies.map((agency) => (
                <AgencyCard
                  key={agency.id}
                  agency={agency}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                  onView={handleView}
                />
              ))}
            </div>

            {filteredAgencies.length === 0 && (
              <div className="text-center py-12">
                <p className="text-slate-500">لا توجد وكالات مطابقة لمعايير البحث</p>
              </div>
            )}
          </div>
        </Card>

        {selectedAgency && (
          <AgencyDetailsDialog
            agency={selectedAgency}
            open={Boolean(selectedAgency) && !isEditDialogOpen}
            onOpenChange={(open) => !open && setSelectedAgency(null)}
          />
        )}

        <AgencyFormDialog
          open={isAddDialogOpen}
          onOpenChange={setIsAddDialogOpen}
          onSubmit={handleAddAgency}
          isLoading={isLoading}
        />

        {selectedAgency && (
          <AgencyFormDialog
            open={isEditDialogOpen}
            onOpenChange={setIsEditDialogOpen}
            onSubmit={handleUpdateAgency}
            initialData={selectedAgency}
            isLoading={isLoading}
          />
        )}
      </div>
    </MainLayout>
  );
};
