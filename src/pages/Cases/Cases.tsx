
import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import MainLayout from "@/layouts/MainLayout";
import CaseTable from "@/components/cases/CaseTable";
import CaseFilter from "@/components/cases/CaseFilter";

const Cases = () => {
  const [filter, setFilter] = useState({
    status: "all",
    lawyer: "all",
    dateFrom: "",
    dateTo: "",
    search: "",
  });

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-card p-6 rounded-lg shadow-sm border">
          <div>
            <h1 className="text-2xl font-bold text-foreground">قائمة القضايا</h1>
            <p className="text-muted-foreground mt-1">إدارة وتتبع القضايا القانونية</p>
          </div>
          <Link to="/cases/create">
            <Button className="flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
              <FiPlus className="w-4 h-4" />
              <span>إضافة قضية</span>
            </Button>
          </Link>
        </div>

        <div className="bg-card p-6 rounded-lg shadow-sm border">
          <CaseFilter filter={filter} setFilter={setFilter} />
          <div className="mt-6">
            <CaseTable filter={filter} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Cases;
